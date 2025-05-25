'use client';

import CodeMirror, { oneDarkTheme } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/common';

export const CodeEditor = () => {
  const { io } = useSocket();
  const [doc, setDoc] = useState(io.content);

  const lang = io.language;

  useEffect(() => {
    setDoc(io.content);
  }, [io.content]);

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
            io.handleContentChange(value);
          }}
          height="100%"
          theme={'dark'}
          extensions={[basicSetup({ foldGutter: false }), langs[lang](), oneDarkTheme]}
        />
      )}
    </>
  );
};
