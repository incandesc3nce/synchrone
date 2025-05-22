import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const toast = ({
  type,
  title,
  description,
  actionLabel = 'OK',
  classNames,
  style,
  onClick,
}: {
  type: ToastType;
  title: string;
  description: string;
  actionLabel?: string;
  classNames?: {
    description?: string;
    icon?: string;
  };
  style?: React.CSSProperties;
  onClick?: () => void;
}): void => {
  sonnerToast[type](title, {
    description,
    action: {
      label: actionLabel,
      onClick: () => {
        if (onClick) {
          onClick();
        }
      },
    },
    position: 'bottom-center',
    classNames: {
      description: '!text-neutral-200',
      ...classNames,
    },
    style: {
      backgroundColor: '#171717',
      color: '#fafafa',
      border: '1px solid',
      ...style,
    },
  });
};

export const toastSuccess = (message: string): void => {
  toast({
    type: 'success',
    title: 'Успех',
    description: message,
    classNames: {
      icon: '!text-green-500',
    },
    style: {
      borderColor: 'oklch(72.3% 0.219 149.579)',
    },
  });
};

export const toastError = (message: string): void => {
  toast({
    type: 'error',
    title: 'Ошибка',
    description: message,
    classNames: {
      icon: '!text-red-500',
    },
    style: {
      borderColor: 'oklch(63.7% 0.237 25.331)',
    },
  });
};
