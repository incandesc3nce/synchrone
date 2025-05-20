import { ReactNode } from 'react';
import { Button } from './Button';
import { Loader } from './Loader';

export const SubmitButton = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) => {
  return isLoading ? (
    <Button
      variant="outlined"
      type="button"
      disabled
      className="flex justify-center items-center">
      <Loader size='h-2 py-2' />
    </Button>
  ) : (
    <Button variant="contained" type="submit">
      {children}
    </Button>
  );
};
