import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { useMutation } from '@tanstack/react-query';

export const useRunCheck = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await apis.screening.runCheck();
      return res;
    },
    onSuccess: () => {
      toast({
        message: 'Run Check Successfully',
        variant: 'success',
      });
    },
    onError: () => {
      toast({
        message: 'Something went wrong',
        variant: 'error',
      });
    },
  });
};
