import { FC, useState } from 'react';
import { Button } from '../common';
import { ModalWindow } from '../common/ModalWindow';

interface CreateProjectButtonProps {
  handleCreateProject: (e: React.FormEvent) => Promise<void>;
  setProjectName: (name: string) => void;
}

export const CreateProjectButton: FC<CreateProjectButtonProps> = ({
  handleCreateProject,
  setProjectName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>
        <Button variant="contained" type="button" onClick={() => setIsModalOpen(true)}>
          Создать проект
        </Button>
      </div>
      {isModalOpen && (
        <ModalWindow
          setIsModalOpen={setIsModalOpen}
          buttonText="Создать"
          submitHandler={handleCreateProject}
          formContent={
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium text-neutral-50">
                Название проекта
              </label>
              <input
                className="block w-full bg-neutral-700 py-1 px-2 rounded-lg outline-0 border-2 border-transparent focus:border-blue-600"
                name="name"
                type="text"
                autoFocus
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          }
        />
      )}
    </>
  );
};
