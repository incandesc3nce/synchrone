import { useContentSave } from '@/hooks/common/useContentSave';
import { Typography } from '../common';

export const SaveContent = () => {
  const { isLoading, isSaved } = useContentSave();

  const getLabel = () => {
    if (isLoading) return 'Сохранение...';
    if (isSaved === 'success') return 'Сохранено!';
    if (isSaved === 'failure') return 'Ошибка сохранения!';
    return '';
  };

  return (
    <Typography variant="p" className="text-gray-400">
      {getLabel()}
    </Typography>
  );
};
