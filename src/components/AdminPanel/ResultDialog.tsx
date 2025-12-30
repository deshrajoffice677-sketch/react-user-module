import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckIcon, XIcon } from 'lucide-react';

interface ResultDialogProps {
  type: 'success' | 'error';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  message: string;
}

export function ResultDialog({ type, isOpen, setIsOpen, title, message }: ResultDialogProps) {
  const iconBg = type === 'success' ? 'bg-green-300' : 'bg-red-100';

  const iconColor = type === 'success' ? 'text-green-600' : 'text-red-600';

  const Icon = type === 'success' ? CheckIcon : XIcon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
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
          <Icon className={`size-10 ${iconColor}`} />
        </div>

        <DialogTitle className="text-xl font-semibold text-slate-900">{title}</DialogTitle>

        <DialogDescription className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          {message}
        </DialogDescription>

        <button
          onClick={() => setIsOpen(false)}
          className="
            w-full 
            py-2.5 
            border 
            rounded-xl 
            text-slate-800 
            hover:bg-slate-100 
            transition
          "
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
