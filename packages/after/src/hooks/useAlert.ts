import { toast } from 'sonner';

export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface AlertOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useAlert = () => {
  const showAlert = (
    variant: AlertVariant,
    message: string,
    options?: Omit<AlertOptions, 'description'>
  ) => {
    const toastOptions = {
      description: message,
      duration: options?.duration,
      action: options?.action,
    };

    switch (variant) {
      case 'success':
        toast.success(options?.title || '성공', toastOptions);
        break;
      case 'error':
        toast.error(options?.title || '오류', toastOptions);
        break;
      case 'warning':
        toast.warning(options?.title || '경고', toastOptions);
        break;
      case 'info':
        toast.info(options?.title || '알림', toastOptions);
        break;
      default:
        toast(options?.title || '알림', toastOptions);
        break;
    }
  };

  return {
    showAlert,
    success: (message: string, options?: Omit<AlertOptions, 'description'>) =>
      showAlert('success', message, options),
    error: (message: string, options?: Omit<AlertOptions, 'description'>) =>
      showAlert('error', message, options),
    warning: (message: string, options?: Omit<AlertOptions, 'description'>) =>
      showAlert('warning', message, options),
    info: (message: string, options?: Omit<AlertOptions, 'description'>) =>
      showAlert('info', message, options),
  };
};
