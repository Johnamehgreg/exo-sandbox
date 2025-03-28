import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { Session } from 'next-auth';
import { useState } from 'react';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { refetch } = useGetUserProfile()

  const onChangeProfile = (values?: Session['user'], cb?: () => void) => {
    setIsLoading(true);
    apis.auth.user
      .updateProfile(values!)
      .then(() => {
        setIsLoading(false);
        // refetch()
        cb?.();
        toast({
          message: 'Profile Updated Successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onChangeProfile,
    isLoading,
  };
};
