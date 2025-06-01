import { useCallback, useEffect, useState } from 'react';
import { useSocket } from './useSocket';
import { ClientFetch } from '@/utils/ClientFetch';

type SavedState = 'success' | 'failure' | null;

export const useContentSave = () => {
  const {
    io: { content },
    workspace: { id },
  } = useSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState<SavedState>(null);

  const timeoutSave = useCallback((state: SavedState, delay = 2000) => {
    setIsSaved(state);
    setTimeout(() => setIsSaved(null), delay);
  }, []);

  const saveContent = useCallback(
    async (content: string) => {
      setIsLoading(true);
      try {
        const res = await ClientFetch('/api/editor', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            workspaceId: id,
            content,
          }),
        });

        timeoutSave('success');
        return res.success;
      } catch (error) {
        console.error('Error saving content:', error);
        timeoutSave('failure');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [id, timeoutSave]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 's') {
        event.preventDefault();
        if (content) {
          saveContent(content);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [content, saveContent]);

  return {
    isLoading,
    isSaved,
    saveContent,
  };
};
