'use client';
import { Button, Typography } from '@/components/common';
import { Loader } from '@/components/common/Loader';
import { ModalWindow } from '@/components/common/ModalWindow';
import { ClientFetch } from '@/utils/ClientFetch';
import { Edit } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import type { Workspace as WorkspaceObject } from '../../../prisma/generated';
import { CreateProjectButton } from './CreateProjectButton';

export const Workspace = ({ promise }: { promise: Promise<WorkspaceObject[]> }) => {
  const [data, setData] = useState<WorkspaceObject[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    promise.then((res) => {
      setData(res);
    });
  }, [promise]);

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);

    const response = await ClientFetch<WorkspaceObject>('/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: projectName }),
    });

    setData((prevData) => (prevData ? [...prevData, response] : [response]));
  };

  const handleDeleteProject = async (id: string) => {
    await ClientFetch('/api/workspaces', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    setData(data?.filter((item) => item.id !== id) || data);
  };

  const handleEditProject = async (e: FormEvent, id: string) => {
    e.preventDefault();

    setIsModalOpen(false);

    const res = await ClientFetch<WorkspaceObject>('/api/workspaces', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name: projectName }),
    });

    setData(data ? data.map((item) => (item.id === id ? res : item)) : [res]);
  };

  return (
    <>
      <CreateProjectButton
        handleCreateProject={handleCreateProject}
        setProjectName={setProjectName}
      />
      <main className="flex gap-4 size-full min-h-[75vh]">
        <div className="flex gap-4">
          {data ? (
            data.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col justify-between p-4 bg-neutral-800 rounded-lg max-h-42 w-80">
                <div>
                  <div className="flex items-center">
                    <Typography variant="h4">{item.name}</Typography>
                    <Button
                      variant="text"
                      type="button"
                      className="font-semibold p-2!"
                      onClick={() => {
                        setIsModalOpen(true);
                        setProjectName(item.name);
                      }}>
                      <Edit size={20} />
                    </Button>
                    {isModalOpen && (
                      <ModalWindow
                        setIsModalOpen={setIsModalOpen}
                        buttonText="Переименовать"
                        submitHandler={(e) => handleEditProject(e, item.id)}
                        formContent={
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="block font-medium text-neutral-50">
                              Название проекта
                            </label>
                            <input
                              className="block w-full bg-neutral-700 py-1 px-2 rounded-lg outline-0 border-2 border-transparent focus:border-blue-600"
                              name="name"
                              type="text"
                              value={projectName}
                              autoFocus
                              onChange={(e) => setProjectName(e.target.value)}
                            />
                          </div>
                        }
                      />
                    )}
                  </div>
                  <Button
                    variant="text"
                    type="button"
                    className="text-red-500 font-semibold absolute top-0 right-0"
                    onClick={() => handleDeleteProject(item.id)}>
                    X
                  </Button>
                </div>
                <Button variant="contained">
                  <a href="/editor" className="size-full">
                    Перейти
                  </a>
                </Button>
              </div>
            ))
          ) : (
            <div className="fixed inset-0 flex justify-center items-center">
              <Loader size="h-6" />
            </div>
          )}
        </div>
      </main>
    </>
  );
};
