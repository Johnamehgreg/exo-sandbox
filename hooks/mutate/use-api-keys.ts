import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { APIError } from '@/types/general';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useApKeys = (cb: VoidFunction) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => apis.apiKeys.revokeApiKey(id),
    onSuccess: () => {
      cb();
      toast({
        message: 'API Key revoked successfully',
        variant: 'success',
      });
    },
    onError: (error: APIError) => {
      toast({
        message: error?.response?.data?.message as string,
        variant: 'error',
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useGenerateApiKey = (cb: (data: string) => void) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => apis.apiKeys.generateApiKey(),
    onSuccess: (data) => {
      cb?.(data?.data);
      queryClient.invalidateQueries({ queryKey: ['get-api-keys'] });
      toast({
        message: 'API Key generated successfully',
        variant: 'success',
      });
    },
    onError: (error: APIError) => {
      toast({
        message: error?.response?.data?.message as string,
        variant: 'error',
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};
