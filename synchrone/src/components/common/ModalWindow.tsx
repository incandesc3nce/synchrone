'use client';

import { FC, useState } from 'react';
import { Button } from './Button';
import { SubmitButton } from './SubmitButton';

interface ModalWindowProps {
  setIsModalOpen: (isOpen: boolean) => void;
  buttonText: string;
  submitHandler: (e: React.FormEvent) => Promise<void>;
  formContent?: React.ReactNode;
}

export const ModalWindow: FC<ModalWindowProps> = ({
  setIsModalOpen,
  buttonText,
  submitHandler,
  formContent,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className="fixed inset-0 bg-black/50 transition-colors flex justify-center items-center"
      onClick={() => setIsModalOpen(false)}>
      <div
        className="bg-neutral-800 p-4 rounded-lg space-y-0 w-[30vw] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}>
        <Button
          variant="text"
          type="button"
          className="block ml-auto mr-0"
          onClick={() => setIsModalOpen(false)}>
          X
        </Button>
        <form
          className="flex flex-col gap-8"
          onSubmit={async (e) => {
            setIsLoading(true);
            await submitHandler(e).finally(() => {
              setIsLoading(false);
              setIsModalOpen(false);
            });
          }}>
          {formContent}
          <SubmitButton isLoading={isLoading}>{buttonText}</SubmitButton>
        </form>
      </div>
    </div>
  );
};
