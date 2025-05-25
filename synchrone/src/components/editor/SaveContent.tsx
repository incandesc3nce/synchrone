import { useContentSave } from '@/hooks/common/useContentSave';
import { Typography } from '../common';

export const SaveContent = () => {
  const { isLoading, isSaved } = useContentSave();

  const label = isLoading ? 'Сохранение...' :
    isSaved === 'success' ? 'Сохранено!' :
    isSaved === 'failure' ? 'Ошибка сохранения!' : '';

  return (
    <Typography variant="p" className="text-gray-400">
      {label}
    </Typography>
  );
};
