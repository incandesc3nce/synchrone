import { EyeOff, Eye } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface HidePasswordInjectionProps {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

export const HidePasswordInjection = (props: HidePasswordInjectionProps) => {
  const { showPassword, setShowPassword } = props;

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="absolute flex items-center py-3 pl-3 border-2 border-transparent border-r-0 rounded-2xl rounded-r-none gap-1 right-3 bottom-0">
      <button type="button" onClick={handleClick} className="cursor-pointer">
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};
