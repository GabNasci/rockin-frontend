import { toast as sonnerToast, type ToasterProps } from "sonner";

// Define os defaults
const defaultOptions: ToasterProps = {
  richColors: true,
};

export const toast = {
  success: (message: string, options?: ToasterProps) =>
    sonnerToast.success(message, { ...defaultOptions, ...options }),

  error: (message: string, options?: ToasterProps) =>
    sonnerToast.error(message, { ...defaultOptions, ...options }),

  warning: (message: string, options?: ToasterProps) =>
    sonnerToast.warning(message, { ...defaultOptions, ...options }),

  info: (message: string, options?: ToasterProps) =>
    sonnerToast.info(message, { ...defaultOptions, ...options }),

  message: (message: string, options?: ToasterProps) =>
    sonnerToast(message, { ...defaultOptions, ...options }),
};
