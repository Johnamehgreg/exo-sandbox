import { useState } from "react";
import apis from "../../services/api-services";
import { useGetUserProfile } from "../query/user";

import { toast } from "@/components/ui/toast";
import { trackError } from "@/lib/error-tracking";
import { BatchProjectModelTest, TeamMemberModel } from "@/types/general";

export const useBatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useGetUserProfile();
  const onCreateBatch = ({
    values,
    cb,
    errorCb,
  }: {
    values?: {
      batch_name: string;
      organization_id: string;
      projects: BatchProjectModelTest[];
    };
    cb?: (res: any) => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.diana.batch
      .createBatchAnalysis(values!)
      .then((res) => {
        refetch();
        setIsLoading(false);
        cb?.(res);
        toast({
          message: "Batch created successfully, ",
          variant: "success",
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        trackError(e, { message: `Team member creation API error` });
        toast({
          message: e.response.data.message,
          variant: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };
  const onUpdateBatch = ({
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
        refetch();
        toast({
          message: "Team member updated successfully, ",
          variant: "success",
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        trackError(e, { message: `Team member update API error` });
        toast({
          message: e.response.data.message,
          variant: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };
  const onDeleteBatchProject = ({
    cb,
    batchId,
    projectId,
    errorCb,
  }: {
    batchId: string;
    projectId: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.diana.batch
      .deleteBatchProject({ batchId: batchId, projectId: projectId })
      .then(() => {
        setIsLoading(false);
        refetch();
        cb?.();
        toast({
          message: "Project deleted successfully, ",
          variant: "success",
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast({
          message: "Something went wrong",
          variant: "error",
        });
        errorCb?.(e.response.data.message);
        trackError(e, { message: `Project deletion API error` });
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onCreateBatch,
    onUpdateBatch,
    onDeleteBatchProject,
    isLoading,
  };
};
