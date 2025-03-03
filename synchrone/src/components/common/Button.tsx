import { ReactNode } from "react";

interface ButtonProps {
  variant: 'text' | 'outlined' | 'contained' | 'custom';
  type: 'submit' | 'button' | 'reset';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const buttonVariants = {
  text: 'text-neutral-100 hover:text-neutral-200',
  outlined: 'border border-neutral-100 text-neutral-100 hover:text-neutral-200',
  contained: 'bg-blue-600 text-white hover:bg-blue-700',
  custom: ''
}

export const Button = (props: ButtonProps) => {
  const { variant, type, children, className, disabled, onClick } = props;
  const buttonClass = buttonVariants[variant];

  return (
    <button
      type={type}
      className={'py-2 px-4 rounded-2xl cursor-pointer transition-colors duration-150 font-medium ' + buttonClass + (className ? ` ${className}` : '')}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};