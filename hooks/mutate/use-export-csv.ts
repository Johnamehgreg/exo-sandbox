import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { ExportCsvModel } from '@/types/general';
import { useMutation } from '@tanstack/react-query';

export const useExportCsv = () => {
  return useMutation({
    mutationFn: async (data: ExportCsvModel) => {
      const res = await apis.fibonacci.exportCsv(data);
      return res?.data;
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        message:
          "Your CSV file is being generated. We will send you a mail once it's complete.",
      });
    },
    onError: () => {
      toast({
        variant: 'error',
        message: 'Something went wrong',
      });
    },
  });
};
