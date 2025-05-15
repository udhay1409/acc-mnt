
"use client";

import { toast } from "sonner"; 
import { useToast } from "@/hooks/use-toast";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  // Get the toast state from our hooks
  const { toast: hookToast } = useToast();

  // Since we're not using multiple toasts from the hook,
  // just render the Sonner Toaster component
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  );
}
