import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseMutationOptions {
  cb?: VoidFunction;
}

export type CustomerListModificationAction = 'add' | 'remove';

interface UpdateWatchlistVariables {
  action: CustomerListModificationAction;
  customerId: string;
}

const WATCHLIST_MESSAGES = {
  success: 'Customer successfully added to Watch List.',
  error: 'Unable to add customer to Watch List. Please try again.',
} as const;

const BLACKLIST_MESSAGES = {
  success: 'Customer successfully added to Black List.',
  error: 'Unable to remove customer from Black List. Please try again.',
} as const;

export const useCustomerWatchlistMutation = (
  options: UseMutationOptions = {}
) => {
  const { cb } = options;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ customerId, action }: UpdateWatchlistVariables) =>
      apis.fibonacci.customers.addCustomerToWatchlist(customerId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-customers-list'] });
      queryClient.invalidateQueries({ queryKey: ['get-customer-details'] });
      toast({
        message: WATCHLIST_MESSAGES.success,
        variant: 'success',
      });
      cb?.();
    },
    onError: () => {
      cb?.();
      toast({
        message: WATCHLIST_MESSAGES.error,
        variant: 'error',
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useCustomerBlackListMutation = (
  options: UseMutationOptions = {}
) => {
  const { cb } = options;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ customerId, action }: UpdateWatchlistVariables) =>
      apis.fibonacci.customers.addCustomerToBlacklist(customerId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-customers-list'] });
      queryClient.invalidateQueries({ queryKey: ['get-customer-details'] });
      toast({
        message: BLACKLIST_MESSAGES.success,
        variant: 'success',
      });
      cb?.();
    },
    onError: () => {
      cb?.();
      toast({
        message: BLACKLIST_MESSAGES.error,
        variant: 'error',
      });
    },
  });

  return {
    mutate,
    isPending,
  };
};
