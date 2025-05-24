'use client';

import { CodeEditor } from './CodeEditor';

export function CodeSection() {
  return (
    <section className="size-full flex flex-col gap-4 items-center ml-64">
      <div className="min-w-full w-auto h-full flex font-code text-white">
        <div className="flex justify-center size-full flex-1">
          <CodeEditor />
        </div>
      </div>
    </section>
  );
}
