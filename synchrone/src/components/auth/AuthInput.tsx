'use client';

import { AuthInputProps } from "@/interfaces/auth";

export const AuthInput = (props: AuthInputProps) => {
  const {
    name,
    type,
    placeholder,
    Icon,
    minLength,
    maxLength,
    label,
    ref,
    injection,
  } = props;

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
      )}
      <div className="flex items-center relative w-full">
        <div className="absolute flex items-center h-13 py-3 pl-3 w-full">
          <Icon size={24} />
        </div>
        <input
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          ref={ref}
          className="relative w-full p-3 px-10 bg-transparent border-2 border-neutral-700 rounded-2xl outline-none focus:border-blue-600 placeholder:text-neutral-400 transition-colors duration-150"
        />
      </div>
      {injection}
    </div>
  );
};
