import { toast } from '@/components/ui/toast';
import { queryClient } from '@/lib/utils';
import apis from '@/services/api-services';
import { OrganizationModel } from '@/types/general';
import { useState } from 'react';

export const useOrganization = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onUpdateOrganization = ({
    values,
    cb,
  }: {
    values?: OrganizationModel;
    cb?: () => void;
  }) => {
    setIsLoading(true);
    apis.organization
      .updateOrganization(values!)
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
        cb?.();
        toast({
          message: 'Organization updated successfully, ',
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
    onUpdateOrganization,
    isLoading,
  };
};
