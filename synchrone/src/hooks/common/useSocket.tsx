import { WSMessage } from '@/types/common';
import {
  WorkspaceEditor,
  WorkspaceWithFiles,
} from '@/types/core/workspace/WorkspaceResponse';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketState = 'connecting' | 'connected' | 'disconnected';

export const useSocketConnection = (workspaceId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<SocketState>('connecting');

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

    socketRef.current.emit('workspace:join', workspaceId);

    return () => {
      console.log('Disconnecting from socket server...');
      socketRef.current?.disconnect();
    };
  }, []);

  const send = (event: string, data: WSMessage) => {
    socketRef.current?.emit(event, data);
  };

  return {
    socket: socketRef.current,
    value,
    setValue,
    send,
    status,
  };
};

const SocketContext = createContext<{
  io: ReturnType<typeof useSocketConnection>;
  workspace: WorkspaceWithFiles;
} | null>(null);

export const SocketProvider = ({
  workspaceResponse,
  children,
}: {
  workspaceResponse: WorkspaceEditor;
  children: React.ReactNode;
}) => {
  const io = useSocketConnection(workspaceResponse.workspace.id);
  console.log(workspaceResponse.workspace);
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
