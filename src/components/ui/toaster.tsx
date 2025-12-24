import { useToast } from './use-toast.ts';

type Toast = {
  id: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{toast.title}</p>
              {toast.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{toast.description}</p>
              )}
            </div>
            {toast.action && <div className="flex flex-col gap-1">{toast.action}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
