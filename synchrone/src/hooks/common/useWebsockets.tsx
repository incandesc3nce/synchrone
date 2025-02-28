import { WSMessage } from '../../interfaces/WSMessage';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

const connect = (
  wsRef: React.RefObject<WebSocket | null>,
  setValue: Dispatch<SetStateAction<string>>
) => {
  console.log('Connecting to server...');

  if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
    wsRef.current = new WebSocket('ws://127.0.0.1:8080');

    wsRef.current.onopen = () => {
      console.log('Connected to server');
    };

    wsRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('Received:', data);
      setValue(data.message);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from server');
    };
  }

  return () => {
    console.log('Closing connection...');
    wsRef.current?.close();
    wsRef.current = null;
  };
};

export const useWebsockets = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const current = wsRef.current;
    const disconnect = connect(wsRef, setValue);

    return () => {
      if (current?.readyState === WebSocket.OPEN) {
        disconnect();
      }
    };
  }, []);

  const send = (data: WSMessage) => {
    wsRef.current?.send(JSON.stringify(data));
  };

  return {
    connection: wsRef.current,
    value,
    setValue,
    send,
  };
};
