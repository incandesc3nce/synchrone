'use client';

import { ReactNode, useRef, useState } from 'react';
import { Typography } from '../Typography';

export const Accordion = ({
  title,
  children,
}: {
  title: ReactNode | string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between items-center w-full p-4 rounded-t-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 ease-in-out ${
          isOpen ? 'rounded-b-none' : 'rounded-b-lg'
        }`}>
        <Typography variant="h3">
          <span className="text-lg font-medium">{title}</span>
        </Typography>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      <div
        ref={contentRef}
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
        }}
        className="bg-neutral-800 rounded-b-lg">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
