import { LucideIcon } from 'lucide-react';
import { HTMLInputTypeAttribute, ReactNode, RefObject } from 'react';

export interface AuthInputProps {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  Icon: LucideIcon;
  minLength?: number;
  maxLength?: number;
  label?: string;
  ref?: RefObject<HTMLInputElement | null>;
  injection?: ReactNode;
}
