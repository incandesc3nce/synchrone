'use client';

import { RefObject } from 'react';
import { Button } from '../common';

interface RunJSButtonProps {
  codeRef: RefObject<string>;
}

export const RunJSButton = ({ codeRef }: RunJSButtonProps) => {
  const runJS = () => {
    eval(codeRef.current);
  };

  return (
    <Button type="button" variant="contained" onClick={runJS}>
      Скачать
    </Button>
  );
};
