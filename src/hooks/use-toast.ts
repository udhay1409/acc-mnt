
// Import from Sonner
import { toast as sonnerToast, type ToastT } from 'sonner';

// Define our toast interface
export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

// Our hook creates a wrapper around Sonner's toast
export const useToast = () => {
  const toast = ({ title, description, variant = 'default', ...props }: ToastProps) => {
    return sonnerToast(title, {
      description,
      // Map our variants to Sonner options
      ...props,
    });
  };

  return { toast };
};

// Export a standalone toast function for convenience
export const toast = ({ title, description, variant = 'default', ...props }: ToastProps) => {
  return sonnerToast(title, {
    description,
    // Map our variants to Sonner options
    ...props,
  });
};
