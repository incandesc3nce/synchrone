'use client';

import CodeMirror, { oneDarkTheme } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { RefObject, useEffect, useState } from 'react';
import { useSocket } from '@/hooks/common';

interface CodeEditorProps {
  codeRef: RefObject<string>;
}

export const CodeEditor = ({ codeRef }: CodeEditorProps) => {
  const io = useSocket();
  const [doc, setDoc] = useState(io.value);

  const handleCodeChange = (value: string) => {
    if (io.socket?.connected) {
      io.send({ message: value, type: 'code' });
    }
  };

  useEffect(() => {
    setDoc(io.value);
    codeRef.current = io.value;
  }, [io.value, codeRef]);

  return (
    <>
      {io.status !== 'connected' ? (
        <div>Connecting...</div>
      ) : (
        <CodeMirror
          className="max-h-full size-full text-base"
          value={doc}
          onChange={(value) => {
            setDoc(value);
            codeRef.current = value;
            handleCodeChange(value);
          }}
          height="100%"
          theme={'dark'}
          extensions={[
            basicSetup({ foldGutter: false }),
            langs.javascript(),
            oneDarkTheme,
          ]}
        />
      )}
    </>
  );
};
