import apis from '@/services/api-services';
import { APIError, WebhookPostData } from '@/types/general';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '../ui/toast';

export const useAddWebhook = (cb?: VoidFunction) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: WebhookPostData) => apis.webhooks.addWebhook(data),
    onError: (error: APIError) => {
      toast({
        message: error?.response?.data?.message as string,
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-webhook'],
      });
      toast({
        message: 'Webhook updated successfully',
        variant: 'success',
      });
      cb?.();
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useDisableWebhook = (cb?: VoidFunction) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDisabledWebhook, isPending: isPendingDisableWebhook } =
    useMutation({
      mutationFn: () => apis.webhooks.disableWebhook(),
      onError: (error: APIError) => {
        toast({
          message: error?.response?.data?.message as string,
          variant: 'error',
        });
        cb?.();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get-webhook'],
        });
        toast({
          message: 'Webhook disabled successfully',
          variant: 'success',
        });
        cb?.();
      },
    });

  return {
    mutateDisabledWebhook,
    isPendingDisableWebhook,
  };
};
