import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import InputPasswordValidation from './InputPasswordValidation';

const PasswordResetDialog = ({ heading, password, setPassword, resetPassword }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{heading}</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md rounded-4xl p-6 bg-white">
        <AlertDialogCancel
          className="
      absolute right-3 top-3
      rounded-full p-2 
      hover:bg-gray-100 
      text-gray-500 
      focus:outline-none
      bg-none
      border-0
    "
        >
          ✕
        </AlertDialogCancel>
        <AlertDialogHeader className="text-center space-y-2">
          {/* <AlertDialogTitle className="text-xl font-semibold">
            Reset this User’s Password?
          </AlertDialogTitle> */}
        </AlertDialogHeader>

        <div className="mt-4 space-y-4">
          <InputPasswordValidation
            setOpen={setOpen}
            password={password}
            setPassword={setPassword}
            resetPassword={resetPassword}
          />
        </div>

        {/* <AlertDialogFooter className="mt-6">
          <AlertDialogAction
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg py-3"
            onClick={resetPassword}
          >
            Reset Password
          </AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordResetDialog;
