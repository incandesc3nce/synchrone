'use client';

import { RefObject } from 'react';

interface RunJSButtonProps {
  codeRef: RefObject<string>;
}

/**
 * @deprecated Was used in initial version of Synchrone.
 * This component is no longer used in the current version of Synchrone.
 */
export const RunJSButton = ({ codeRef }: RunJSButtonProps) => {
  const runJS = () => {
    eval(codeRef.current);
  };

  return (
    <button className="bg-neutral-800 p-2 rounded-lg cursor-pointer" onClick={runJS}>
      run JavaScript
    </button>
  );
};
