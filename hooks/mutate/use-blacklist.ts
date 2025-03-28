import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { BlacklistValueModel } from '@/types/general';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useBlacklist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getUrl = (type: string) => {
    switch (type) {
      case 'users':
        return '/blacklist/blacklisted-user';
      case 'devices':
        return '/blacklist/blacklisted-device';
      case 'accounts':
        return '/blacklist/blacklisted-account';
      default:
        return '/blacklist/blacklisted-user';
    }
  };

  const onDeleteBlacklist = ({
    cb,
    id,
    type,
    errorCb,
  }: {
    id: string;
    type: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    const url = `${getUrl(type)}/${id}`;
    apis.blacklist
      .deleteBlacklist(url)
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({
          queryKey: ['get-state-list-blacklist'],
        });
        cb?.();
        toast({
          message: 'Blacklist deleted successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const onBlacklist = ({
    values,
    cb,
    errorCb,
  }: {
    values?: BlacklistValueModel;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.blacklist
      .createBlacklist(values!)
      .then(() => {
        setIsLoading(false);
        cb?.();
        queryClient.invalidateQueries({
          queryKey: ['get-state-list-blacklist'],
        });
        toast({
          message: 'Blacklisted successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onDeleteBlacklist,
    onBlacklist,
    isLoading,
  };
};
