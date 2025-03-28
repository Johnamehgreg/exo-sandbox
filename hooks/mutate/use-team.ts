import { toast } from '@/components/ui/toast';
import { queryClient } from '@/lib/utils';
import { TeamMemberModel } from '@/types/general';
import { useState } from 'react';
import apis from '../../services/api-services';

export const useTeam = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    apis.team
      .createTeamMember(values!)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['get-user-profile'],
        });
        setIsLoading(false);
        cb?.();
        toast({
          message: 'Team member created successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        // TODO handle error tracking with roll bar
        // trackError(e, { message: `Team member creation API error` });
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
    apis.team
      .updateTeamMember(values!, id)
      .then(() => {
        setIsLoading(false);
        cb?.();
        queryClient.invalidateQueries({
          queryKey: ['get-user-profile'],
        });
        toast({
          message: 'Team member updated successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        // TODO handle error tracking with roll bar
        // trackError(e, { message: `Team member update API error` });
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
    apis.team
      .deleteTeamMember(id)
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({
          queryKey: ['get-user-profile'],
        });
        cb?.();
        toast({
          message: 'Team member deleted successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        // TODO handle error tracking with roll bar
        // trackError(e, { message: `Team member deletion API error` });
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
