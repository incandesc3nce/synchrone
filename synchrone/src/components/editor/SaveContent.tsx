import { useContentSave } from '@/hooks/common/useContentSave';
import { Button, Typography } from '../common';
import { useSocket } from '@/hooks/common';

export const SaveContent = () => {
  const { isLoading, isSaved, saveContent } = useContentSave();

  const { io } = useSocket();

  const label = isLoading
    ? 'Сохранение...'
    : isSaved === 'success'
    ? 'Сохранено!'
    : isSaved === 'failure'
    ? 'Ошибка сохранения!'
    : 'Cохранить';

  return (
    <Button
      variant="outlined"
      className="w-full !border-blue-500 disabled:cursor-not-allowed"
      onClick={() => saveContent(io.content || '')}
      disabled={isLoading}>
      <Typography variant="span" className="text-gray-200">
        {label}
      </Typography>
    </Button>
  );
};
