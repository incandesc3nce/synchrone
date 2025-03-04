'use client';
import { Button, Typography } from '@/components/common';
import { Loader } from '@/components/common/Loader';
import { Edit } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

export const Workspace = ({ promise }) => {
  const [data, setData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModel2Open] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    promise.then((res) => setData(res));
  }, [promise]);

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);

    const response = await fetch('/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: projectName }),
    }).then((res) => res.json());

    setData([...data, response]);
  };

  const handleDeleteProject = async (id: string) => {
    const response = await fetch('/api/workspaces', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json());

    setData(data.filter((item) => item.id !== id));
  };

  const handleEditProject = async (e: FormEvent, id: string) => {
    e.preventDefault();

    setIsModel2Open(false);
    
    const res = await fetch('/api/workspaces', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name: projectName }),
    }).then((res) => res.json());

    setData(data.map((item) => (item.id === id ? res : item)));
  }

  return (
    <>
      <div>
        <Button
          variant="contained"
          type="button"
          onClick={() => setIsModalOpen(true)}>
          Создать проект
        </Button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-neutral-800 p-4 rounded-lg space-y-0 w-[30vw]"
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
              onSubmit={handleCreateProject}>
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
                  autoFocus
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <Button variant="contained" type="submit">
                Создать
              </Button>
            </form>
          </div>
        </div>
      )}
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
                        setIsModel2Open(true)
                        setProjectName(item.name)
                      }}
                      >
                      <Edit size={20} />
                    </Button>
                    {isModal2Open && (
                      <div
                      className="fixed inset-0 bg-black/50 flex justify-center items-center"
                      onClick={() => setIsModel2Open(false)}>
                      <div
                        className="bg-neutral-800 p-4 rounded-lg space-y-0 w-[30vw]"
                        onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="text"
                          type="button"
                          className="block ml-auto mr-0"
                          onClick={() => setIsModel2Open(false)}>
                          X
                        </Button>
                        <form
                          className="flex flex-col gap-8"
                          onSubmit={(e) => handleEditProject(e, item.id)}>
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
                          <Button variant="contained" type="submit">
                            Переименовать
                          </Button>
                        </form>
                      </div>
                    </div>
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
                <Button variant="contained" type="button">
                  Перейти
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

'use client';
import { Button, Typography } from '@/components/common';
import { Loader } from '@/components/common/Loader';
import { Edit } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

export const Workspace = ({ promise }) => {
  const [data, setData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModel2Open] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    promise.then((res) => setData(res));
  }, [promise]);

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);

    const response = await fetch('/api/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: projectName }),
    }).then((res) => res.json());

    setData([...data, response]);
  };

  const handleDeleteProject = async (id: string) => {
    const response = await fetch('/api/workspaces', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json());

    setData(data.filter((item) => item.id !== id));
  };

  const handleEditProject = async (e: FormEvent, id: string) => {
    e.preventDefault();

    setIsModel2Open(false);
    
    const res = await fetch('/api/workspaces', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name: projectName }),
    }).then((res) => res.json());

    setData(data.map((item) => (item.id === id ? res : item)));
  }

  return (
    <>
      <div>
        <Button
          variant="contained"
          type="button"
          onClick={() => setIsModalOpen(true)}>
          Создать проект
        </Button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-neutral-800 p-4 rounded-lg space-y-0 w-[30vw]"
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
              onSubmit={handleCreateProject}>
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
                  autoFocus
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <Button variant="contained" type="submit">
                Создать
              </Button>
            </form>
          </div>
        </div>
      )}
      <main className="flex gap-4 size-full min-h-[75vh]">
        <div className="flex gap-4 flex-wrap h-100">
          {data ? (
            data.map((item) => (
              <div
                key={item.id}
                className="relative -z-1 flex flex-col justify-between p-4 bg-neutral-800 rounded-lg max-h-42 w-80">
                <div>
                  <div className="flex items-center">
                    <Typography variant="h4">{item.name}</Typography>
                    <Button
                      variant="text"
                      type="button"
                      className="font-semibold p-2!"
                      onClick={() => {
                        setIsModel2Open(true)
                        setProjectName(item.name)
                      }}
                      >
                      <Edit size={20} />
                    </Button>
                    {isModal2Open && (
                      <div
                      className="fixed inset-0 bg-black/50 flex justify-center items-center"
                      onClick={() => setIsModel2Open(false)}>
                      <div
                        className="bg-neutral-800 p-4 rounded-lg space-y-0 w-[30vw]"
                        onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="text"
                          type="button"
                          className="block ml-auto mr-0"
                          onClick={() => setIsModel2Open(false)}>
                          X
                        </Button>
                        <form
                          className="flex flex-col gap-8"
                          onSubmit={(e) => handleEditProject(e, item.id)}>
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
                          <Button variant="contained" type="submit">
                            Переименовать
                          </Button>
                        </form>
                      </div>
                    </div>
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
                <Button variant="contained" type="button">
                  Перейти
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
