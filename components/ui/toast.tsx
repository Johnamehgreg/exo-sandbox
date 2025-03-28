'use client';

import { toast as _toast } from 'sonner';

export const toast = ({
  variant = 'success',
  message,
}: {
  variant: 'success' | 'error' | 'info';
  message: string;
  isLoading?: boolean;
}) => {
  switch (variant) {
    case 'success':
      _toast.success(message, {
        style: {
          backgroundColor: '#0C3932',
          color: '#fff',
        },
      });
      break;
    case 'error':
      _toast.error(message || 'Something went wrong', {
        style: {
          backgroundColor: '#db1515',
          color: '#fff',
        },
      });
      break;
    case 'info':
      _toast.message(message, {
        style: {
          backgroundColor: '#0e5a8a',
          color: '#fff',
        },
      });
      break;
  }
};
