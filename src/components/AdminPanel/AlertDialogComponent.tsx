import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, LockIcon, Ban } from 'lucide-react';

const AlertDialogComponent = ({
  isSuspended,
  heading,
  message,
  messageDescription,
  Delete,
  DeleteButtonText,
  CancelButtonText,
  type,
  className = "",
  cancel
}: any) => {
  const AlertIcon =
    type === 'delete' ? AlertCircle : type === 'remove' ? Ban : LockIcon;

  const iconColor =
    type === 'delete' ? 'text-red-600' : 'text-gray-700';

  const iconBg =
    type === 'delete' ? 'bg-red-100' : 'bg-gray-200';

  const actionBg =
    type === 'delete'
      ? 'bg-slate-900 hover:bg-slate-800'
      : 'bg-gray-900 hover:bg-gray-800';


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} disabled={isSuspended === "Suspended" ? true : false} variant={type === 'delete' ? 'red' : 'outline'}>{heading}</Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="
    max-w-md 
    rounded-2xl 
    bg-white 
    p-8 
    shadow-xl 
    text-center 
    flex 
    flex-col 
    items-center 
    space-y-6
  "
      >
        <div className={`flex items-center justify-center size-20 rounded-full ${iconBg}`}>
          <AlertIcon className={`size-10 ${iconColor}`} />
        </div>

        <AlertDialogTitle className="text-xl font-semibold text-slate-900">
          {message}
        </AlertDialogTitle>

        <AlertDialogDescription className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          {messageDescription}
        </AlertDialogDescription>

        <div className="flex w-full justify-center gap-4 pt-2">
          <AlertDialogCancel className="flex-1 py-2 rounded-lg border text-slate-700 hover:bg-slate-100" onClick={cancel}>
            {CancelButtonText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={Delete}
            className={`flex-1 py-2 rounded-lg text-white ${actionBg} `}
          >
            {DeleteButtonText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
