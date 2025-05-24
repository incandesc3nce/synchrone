'use client';
import { Button, Typography } from '@/components/common';
import { Loader } from '@/components/common/Loader';
import { ModalWindow } from '@/components/common/ModalWindow';
import { ClientFetch } from '@/utils/ClientFetch';
import { Edit, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { CreateProjectButton } from './CreateProjectButton';
import {
  WorkspaceResponse,
  WorkspaceWithUsers,
} from '@/types/core/workspace/WorkspaceResponse';
import { toastSuccess } from '@/lib/toast';
import { WorkspaceUser } from './WorkspaceUser';
import { InviteUserButton } from './InviteUserButton';

export const Workspace = ({ promise }: { promise: Promise<WorkspaceResponse> }) => {
  const [data, setData] = useState<WorkspaceWithUsers[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    promise.then((res) => {
      if (res.projects) {
        setData(res.projects);
      }
    });
  }, [promise]);

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);

    const response = await ClientFetch<WorkspaceResponse>('/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: projectName }),
    });

    const project = response.project;
    if (!project) return;

    setData((prevData) => (prevData ? [...prevData, project] : [project]));

    toastSuccess('Проект успешно создан!');
  };

  const handleDeleteProject = async (id: string) => {
    setData(data?.filter((item) => item.id !== id) || data);

    await ClientFetch('/api/workspaces', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    toastSuccess('Проект успешно удалён!');
  };

  const handleEditProject = async (e: FormEvent, id: string) => {
    e.preventDefault();

    setIsModalOpen(false);

    const res = await ClientFetch<WorkspaceResponse>('/api/workspaces', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name: projectName }),
    });

    const project = res.project;

    if (!project) return;

    setData(data ? data.map((item) => (item.id === id ? project : item)) : [project]);

    toastSuccess('Проект успешно переименован!');
  };

  const handleDeleteUser = async (userId: string, workspaceId: string) => {
    setData((prevData) =>
      prevData
        ? prevData.map((item) => {
            if (item.id === workspaceId) {
              return {
                ...item,
                users: item.users.filter((user) => user.id !== userId),
              };
            }
            return item;
          })
        : null
    );

    await ClientFetch('/api/workspaces/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, workspaceId }),
    });

    toastSuccess('Пользователь успешно удалён из проекта!');
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
                  <div className="flex items-start flex-col">
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
                    <details>
                      <summary>Участники ({item.users.length})</summary>
                      <div className="flex flex-col gap-2">
                        {item.users.map((user) => (
                          <WorkspaceUser
                            user={user}
                            workspaceId={item.id}
                            handleDeleteUser={handleDeleteUser}
                            key={`${item.id}_${user.id}`}
                          />
                        ))}
                      </div>
                    </details>
                  </div>
                  <div className="absolute top-1 right-1 flex items-center gap-2">
                    <InviteUserButton workspaceId={item.id} />
                    <Button
                      variant="custom"
                      type="button"
                      className="text-red-500 font-semibold cursor-pointer"
                      onClick={() => handleDeleteProject(item.id)}>
                      <X  className='size-5'/>
                    </Button>
                  </div>
                </div>
                <Button variant="contained">
                  <a href={`/editor/${item.id}`} className="size-full">
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
