'use client';

import CodeMirror, { oneDarkTheme } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { indentUnit } from '@codemirror/language';
import { RefObject, useEffect, useState } from 'react';
import { useWebsockets } from '@/hooks/common';

interface CodeEditorProps {
  codeRef: RefObject<string>;
}

export const CodeEditor = ({ codeRef }: CodeEditorProps) => {
  const ws = useWebsockets();
  const [doc, setDoc] = useState(ws.value);

  const handleCodeChange = (value: string) => {
    if (
      ws.connection?.readyState &&
      ws.connection.readyState === WebSocket.OPEN
    ) {
      ws.send({ message: value, type: 'code' });
    }
  };

  useEffect(() => {
    setDoc(ws.value);
    codeRef.current = ws.value;
  }, [ws.value, codeRef]);

  return (
    <>
      {ws.readyState !== WebSocket.OPEN ? (
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
            basicSetup(),
            langs.javascript(),
            indentUnit.of('\t'),
            oneDarkTheme,
          ]}
        />
      )}
    </>
  );
};
