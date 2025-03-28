import { TeamMemberModel } from '@/types/general';
import { useState } from 'react';
import { useGetSettingTeam } from '../query/fibonacci-s-team';
import apis from '@/services/api-services';
import { toast } from '@/components/ui/toast';

export const useFibonacciTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useGetSettingTeam();
  const onCreateTeam = ({
    values,
    cb,
    errorCb,
  }: {
    values?: TeamMemberModel;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.team
      .createTeamMember(values!)
      .then(() => {
        refetch();
        setIsLoading(false);
        cb?.();
        toast({
          message: 'Team member created successfully',
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
  const onUpdateTeam = ({
    values,
    cb,
    id,
    errorCb,
  }: {
    values?: TeamMemberModel;
    id: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.team
      .updateTeamMember(values!, id)
      .then(() => {
        setIsLoading(false);
        cb?.();
        refetch();
        toast({
          message: 'Team member updated successfully',
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
  const onDeleteTeam = ({
    cb,
    id,
    errorCb,
  }: {
    id: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.team
      .deleteTeamMember(id)
      .then(() => {
        setIsLoading(false);
        refetch();
        cb?.();
        toast({
          message: 'Team member deleted successfully, ',
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
    onCreateTeam,
    onUpdateTeam,
    onDeleteTeam,
    isLoading,
  };
};
