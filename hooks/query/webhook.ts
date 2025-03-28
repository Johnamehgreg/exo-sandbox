import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { WebhookModel } from '@/types/general';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGetWebhook = () => {
  const {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    isFetched,
    isRefetching,
    isError,
    data,
    status,
    isFetching,
  } = useQuery({
    queryKey: ['get-webhook'],
    queryFn: () => apis.webhooks.getWebhook(),
  });

  const webhook = data?.data as WebhookModel;

  return {
    webhook,
    isPending,
    refetch,
    isError,
    error,
    isLoading,
    isSuccess,
    isRefetching,
    isFetched,
    isFetching,
    status,
  };
};

export const useGenerateNewWebhookKey = (
  isEnabled: boolean,
  cb?: VoidFunction
) => {
  const queryClient = useQueryClient();

  const {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    isFetched,
    isRefetching,
    isError,
    data,
    status,
    isFetching,
  } = useQuery({
    queryKey: ['generate-new-webhook'],
    queryFn: () => apis.webhooks.generateNewWebhookKey(),
    enabled: isEnabled,
  });
  useEffect(() => {
    if (isError) {
      toast({
        message: 'An error was occurred',
        variant: 'error',
      });
    }
    if (isSuccess && isFetched && !isError) {
      queryClient.invalidateQueries({
        queryKey: ['get-webhook'],
      });
      cb?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isFetched, data, isError]);

  return {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    isFetched,
    isRefetching,
    isError,
    data,
    status,
    isFetching,
  };
};
