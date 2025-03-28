import { toast } from '@/components/ui/toast';
import { queryClient } from '@/lib/utils';
import apis from '@/services/api-services';
import { NotificationModel } from '@/types/general';
import { useState } from 'react';

export const useNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { refetch } = useGetUserProfile()
  const onUpdateTeam = ({
    values,
    cb,
    errorCb,
  }: {
    values?: NotificationModel;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.notification
      .updateNotification(values!)
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
        cb?.();
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
    onUpdateTeam,
    isLoading,
  };
};
