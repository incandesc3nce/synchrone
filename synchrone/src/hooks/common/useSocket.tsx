import { TokenPayload, TokenPayloadWithColor } from '@/types/auth/TokenPayload';
import { WSMessage } from '@/types/common';
import {
  WorkspaceEditor,
  WorkspaceWithFiles,
} from '@/types/core/workspace/WorkspaceResponse';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketState = 'connecting' | 'connected' | 'disconnected';

export const useSocketConnection = (workspaceId: string, user: TokenPayload) => {
  const socketRef = useRef<Socket | null>(null);
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<SocketState>('connecting');
  const [currentUsers, setCurrentUsers] = useState<TokenPayloadWithColor[]>([]);

  useEffect(() => {
    console.log('Connecting to socket server...');

    socketRef.current = io(process.env.NEXT_PUBLIC_WSS_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to socket server!');
      setStatus('connected');
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from socket server!');
      setStatus('disconnected');
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setStatus('disconnected');
    });

    socketRef.current.on('message', (data: WSMessage) => {
      console.log('Received message:', data);
      setValue(data.message);
    });

    const userEvent = (
      data: { workspaceId: string; users: TokenPayloadWithColor[] },
      event: 'join' | 'leave'
    ) => {
      console.log(`Workspace ${event === 'join' ? 'joined' : 'left'}:`, data);
      if (data.workspaceId === workspaceId) {
        setCurrentUsers(data.users);
      }
    };

    socketRef.current.on('workspace:joined', (data) => userEvent(data, 'join'));

    socketRef.current.on('workspace:left', (data) => userEvent(data, 'leave'));

    socketRef.current.emit('workspace:join', { workspaceId, user });

    const handleBeforeUnload = () => {
      console.log('Window is closing, disconnecting from socket server...');
      socketRef.current?.emit(
        'workspace:leave',
        {
          workspaceId,
          user,
        },
        () => {
          socketRef.current?.removeAllListeners();
          socketRef.current?.disconnect();
        }
      );
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      console.log('Disconnecting from socket server...');
      socketRef.current?.emit(
        'workspace:leave',
        {
          workspaceId,
          user,
        },
        () => {
          socketRef.current?.removeAllListeners();
          socketRef.current?.disconnect();
        }
      );
    };
  }, [user, workspaceId]);

  const send = (event: string, data: WSMessage) => {
    socketRef.current?.emit(event, data);
  };

  return {
    socket: socketRef.current,
    value,
    setValue,
    send,
    status,
    currentUsers,
    setCurrentUsers,
  };
};

const SocketContext = createContext<{
  io: ReturnType<typeof useSocketConnection>;
  workspace: WorkspaceWithFiles;
} | null>(null);

export const SocketProvider = ({
  workspaceResponse,
  user,
  children,
}: {
  workspaceResponse: WorkspaceEditor;
  user: TokenPayload;
  children: React.ReactNode;
}) => {
  const io = useSocketConnection(workspaceResponse.workspace.id, user);

  return (
    <SocketContext.Provider value={{ io, workspace: workspaceResponse.workspace }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};
