import { FC } from 'react';
import { Button } from './Button';

interface ModalWindowProps {
  setIsModalOpen: (isOpen: boolean) => void;
  buttonText: string;
  submitHandler: (e: React.FormEvent) => void;
  formContent?: React.ReactNode;
}

export const ModalWindow: FC<ModalWindowProps> = ({
  setIsModalOpen,
  buttonText,
  submitHandler,
  formContent,
}) => {
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
        <form className="flex flex-col gap-8" onSubmit={submitHandler}>
          {formContent}
          <Button variant="contained" type="submit">
            {buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};
