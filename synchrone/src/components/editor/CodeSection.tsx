'use client';

import { useRef } from 'react';
import { CodeEditor } from './CodeEditor';
import { RunJSButton } from './RunJSButton';

export function CodeSection() {
  const codeRef = useRef<string>('');

  return (
    <section className="size-full flex flex-col gap-4 items-center">
      <RunJSButton codeRef={codeRef} />
      <div className="min-w-full w-auto h-full flex font-[family-name:var(--font-fira-code)] text-white">
        <div className="flex justify-center size-full flex-1">
          <CodeEditor codeRef={codeRef} />
        </div>
      </div>
    </section>
  );
}
