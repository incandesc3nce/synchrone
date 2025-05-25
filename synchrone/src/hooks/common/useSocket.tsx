import { TokenPayload, TokenPayloadWithColor } from '@/types/auth/TokenPayload';
import {
  WorkspaceEditor,
  WorkspaceWithUsers,
} from '@/types/core/workspace/WorkspaceResponse';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ProgrammingLanguage } from '@/types/core/workspace/ProgrammingLanguage';
import { ClientFetch } from '@/utils/ClientFetch';
import { debounce } from '@/utils/debounce';
import { WSMessage } from '@/types/common';

export type SocketState = 'connecting' | 'connected' | 'disconnected';

export const useSocketConnection = (
  workspace: WorkspaceWithUsers,
  user: TokenPayload
) => {
  const socketRef = useRef<Socket | null>(null);
  const [content, setContent] = useState<string>(workspace.content);
  const [language, setLanguage] = useState<ProgrammingLanguage>(
    workspace.language as ProgrammingLanguage
  );
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

    socketRef.current.on(
      'workspace:contentEdited',
      (data: { workspaceId: string; content: string }) => {
        if (data.workspaceId !== workspace.id) return;
        console.log('Received message:', data);
        setContent(data.content);

        debounce(() =>
          ClientFetch('/api/editor', {
            method: 'PATCH',
            body: JSON.stringify({
              workspaceId: workspace.id,
              content: data.content,
              language: undefined,
            }),
          })
        );
      }
    );

    const userEvent = (
      data: { workspaceId: string; users: TokenPayloadWithColor[] },
      event: 'join' | 'leave'
    ) => {
      console.log(`Workspace ${event === 'join' ? 'joined' : 'left'}:`, data);
      if (data.workspaceId === workspace.id) {
        setCurrentUsers(data.users);
      }
    };

    socketRef.current.on('workspace:joined', (data) => userEvent(data, 'join'));

    socketRef.current.on('workspace:left', (data) => userEvent(data, 'leave'));

    socketRef.current.emit('workspace:join', { workspaceId: workspace.id, user });

    socketRef.current.on('workspace:languageChanged', (data) => {
      console.log('Language changed:', data);
      if (data.workspaceId === workspace.id) {
        setLanguage(data.language as ProgrammingLanguage);
      }
    });

    const handleBeforeUnload = () => {
      console.log('Window is closing, disconnecting from socket server...');
      socketRef.current?.emit(
        'workspace:leave',
        {
          workspaceId: workspace.id,
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
          workspaceId: workspace.id,
          user,
        },
        () => {
          socketRef.current?.removeAllListeners();
          socketRef.current?.disconnect();
        }
      );
    };
  }, [user, workspace]);

  const send = (event: string, data: WSMessage) => {
    socketRef.current?.emit(event, data);
  };

  const handleChangeLanguage = (newLanguage: ProgrammingLanguage) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('workspace:changeLanguage', {
        workspaceId: workspace.id,
        language: newLanguage,
      });
    }

    debounce(() =>
      ClientFetch('/api/editor', {
        method: 'PATCH',
        body: JSON.stringify({
          workspaceId: workspace.id,
          language: newLanguage,
          content: undefined,
        }),
      })
    );
  };

  const handleContentChange = (value: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('workspace:edit', {
        message: value,
        type: 'code',
      });
    }
  };

  return {
    socket: socketRef.current,
    content,
    setContent,
    send,
    status,
    currentUsers,
    setCurrentUsers,
    language,
    setLanguage,
    handleChangeLanguage,
    handleContentChange,
  };
};

const SocketContext = createContext<{
  io: ReturnType<typeof useSocketConnection>;
  workspace: WorkspaceWithUsers;
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
  const io = useSocketConnection(workspaceResponse.workspace, user);

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
