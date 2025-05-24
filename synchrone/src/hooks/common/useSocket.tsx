import { WSMessage } from '@/types/common';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketState = 'connecting' | 'connected' | 'disconnected';

export const useSocketConnection = () => {
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

    return () => {
      console.log('Disconnecting from socket server...');
      socketRef.current?.disconnect();
    };
  }, []);

  const send = (data: WSMessage) => {
    socketRef.current?.emit('message', data);
  };

  return {
    socket: socketRef.current,
    value,
    setValue,
    send,
    status,
  };
};

const SocketContext = createContext<ReturnType<typeof useSocketConnection> | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocketConnection();

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};
