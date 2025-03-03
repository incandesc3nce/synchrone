'use client';

import { RefObject } from 'react';

interface RunJSButtonProps {
  codeRef: RefObject<string>;
}

export const RunJSButton = ({ codeRef }: RunJSButtonProps) => {
  const runJS = () => {
    eval(codeRef.current);
  };

  return (
    <button
      className="bg-neutral-800 p-2 rounded-lg cursor-pointer"
      onClick={runJS}>
      run JavaScript
    </button>
  );
};
