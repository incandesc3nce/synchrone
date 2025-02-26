'use client';

import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useWebsockets } from '@/hooks/common';

export function CodeArea() {
  const ws = useWebsockets();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const caretPositionRef = useRef<number>(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = textAreaRef.current!;
      const value = textAreaRef.current!.value;
      textAreaRef.current!.value =
        value.substring(0, selectionStart) +
        '\t' +
        value.substring(selectionEnd);
      textAreaRef.current!.selectionStart = textAreaRef.current!.selectionEnd =
        selectionStart + 1;
    }
  };

  const handleSave = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 's' && e.ctrlKey) {
      e.preventDefault();
      console.log('Save');
    }
  }, []);

  useEffect(() => {
    const textArea = textAreaRef.current!;
    if (textArea) {
      textArea.focus();
      textArea.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      textArea.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.selectionStart = caretPositionRef.current;
      textAreaRef.current.selectionEnd = caretPositionRef.current;
    }
  }, [ws.value]);

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { selectionStart } = e.target;
    if (
      ws.connection?.readyState &&
      ws.connection.readyState === WebSocket.OPEN
    ) {
      ws.send({ message: e.target.value, type: 'code' });
      caretPositionRef.current = selectionStart;
    }
  };

  const runCode = () => {
    eval(ws.value);
  };

  return (
    <div className="size-full flex flex-col gap-4 items-center">
      {ws.connection?.readyState === WebSocket.CONNECTING ? (
        <p>Connecting...</p>
      ) : (
        <>
          <div className="size-full flex font-[family-name:var(--font-fira-code)] text-white">
            <ul className="bg-neutral-900 py-1 px-2">
              {ws.value.split('\n').map((line, index) => (
                <li key={index} className="text-white">
                  {index + 1}
                </li>
              ))}
            </ul>
            <textarea
              className="bg-neutral-800 size-full p-1 resize-none outline-none"
              placeholder="Write your code here"
              value={ws.value}
              ref={textAreaRef}
              onChange={handleCodeChange}
              onKeyDown={handleSave}
            />
          </div>
          <button className="bg-neutral-800 p-2 rounded-lg" onClick={runCode}>
            run javascript in browser
          </button>
        </>
      )}
    </div>
  );
}
