// useMutate
import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { GetTransactionInsightModel } from '@/types/general';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useTransactionInsight = (
  insightData: GetTransactionInsightModel
) => {
  const [insight, setInsight] = useState();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: GetTransactionInsightModel) =>
      apis.fibonacci.getTransactionInsight(data),
    onError: () => {
      toast({
        message:
          'An unexpected error occurred while fetching transaction insights.',
        variant: 'error',
      });
    },
    onSuccess: (data) => {
      setInsight(data?.data?.insight);
    },
  });

  useEffect(() => {
    if (insightData !== undefined) {
      mutate(insightData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insightData]);

  return {
    isPending,
    insight,
  };
};
