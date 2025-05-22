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
      <div className='my-2'>
        <Loader size='h-2' />
      </div>
    </Button>
  ) : (
    <Button variant="contained" type="submit">
      {children}
    </Button>
  );
};
