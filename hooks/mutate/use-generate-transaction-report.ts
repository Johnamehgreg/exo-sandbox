import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { GenerateReportModel } from '@/types/general';
import { useMutation } from '@tanstack/react-query';

export const useGenerateTransactionReport = (cb: VoidFunction) => {
  return useMutation({
    mutationFn: async (data: GenerateReportModel) => {
      const res = await apis.reports.generateReport(data);
      return res;
    },
    onSuccess: (data) => {
      cb?.();
      toast({
        variant: 'success',
        message:
          data?.data?.message ||
          "Your Report is being processed. We will send you a mail once it's complete.",
      });
    },
    onError: () => {
      cb?.();
      toast({
        variant: 'error',
        message: 'Something went wrong',
      });
    },
  });
};
