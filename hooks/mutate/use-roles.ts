import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import { SettingsFRoleModel } from '@/types/general';
import { useState } from 'react';
import { useGetSettingRole } from '../query/fibonacci-s-role';

export const useRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useGetSettingRole();

  const onCreateRole = ({
    values,
    cb,
    errorCb,
  }: {
    values?: SettingsFRoleModel;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.role
      .createRole(values!)
      .then(() => {
        setIsLoading(false);
        cb?.();
        refetch();
        toast({
          message: 'Role created successfully, ',
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
  const onUpdateRole = ({
    values,
    cb,
    id,
    errorCb,
  }: {
    values?: SettingsFRoleModel;
    id: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.role
      .updateRole(values!, id)
      .then(() => {
        setIsLoading(false);
        refetch();
        cb?.();
        toast({
          message: 'Role updated successfully, ',
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
  const onDeleteRole = ({
    cb,
    id,
    roleId,
    errorCb,
  }: {
    id: string;
    roleId: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    const params = `${id}/${roleId}`;
    apis.fibonacci.role
      .deleteRole(params)
      .then(() => {
        setIsLoading(false);
        refetch();
        cb?.();
        toast({
          message: 'Role deleted successfully, ',
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
    isLoading,
    onCreateRole,
    onUpdateRole,
    onDeleteRole,
  };
};
