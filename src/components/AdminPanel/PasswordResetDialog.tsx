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

interface PasswordResetDialogProps {
  heading: string;
  password: string;
  setPassword: (password: string) => void;
  resetPassword: () => void;
}

const PasswordResetDialog = ({ heading, password, setPassword, resetPassword }: PasswordResetDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{heading}</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md rounded-2xl p-6 bg-white">
        <AlertDialogCancel
          className="
      absolute right-4 top-4
      rounded-md p-2
      hover:bg-gray-100
      text-gray-500
      border-0
    "
        >
          ✕
        </AlertDialogCancel>
        <AlertDialogHeader className="text-center space-y-2"></AlertDialogHeader>

        <div className="mt-4 space-y-4">
          <InputPasswordValidation
            setOpen={setOpen}
            password={password}
            setPassword={setPassword}
            resetPassword={resetPassword}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordResetDialog;
