/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import apis from "../../services/api-services";

import { useQueryClient } from "@tanstack/react-query";
import { CreateRuleResponseModel, RulesModel, TestRuleModel, TestRuleResponseModel } from "@/types/general";
import { toast } from "@/components/ui/toast";

export const useRules = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  // const { refetch } = useGetUserProfile();
  const onCreateRule = ({
    values,
    cb,
    errorCb,
  }: {
    values?: RulesModel;
    cb?: (res?: CreateRuleResponseModel) => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.rules
      .createRule(values!)
      .then((res) => {
        setIsLoading(false);
        // refetch();
        queryClient.invalidateQueries({
          queryKey: ["get-state-rules"],
        });
        cb?.(res.data);
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const onTestRule = ({
    values,
    cb,
    errorCb,
  }: {
    values?: TestRuleModel;
    cb?: (res?: TestRuleResponseModel) => void;
    errorCb?: (message: string | string[]) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.rules
      .testRule(values!)
      .then((res) => {
        setIsLoading(false);
        cb?.(res.data);
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const onActionUpdateRule = ({
    cb,
    action,
    errorCb,
  }: {
    action: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci.rules
      .updateRule(action)
      .then((res) => {
        setIsLoading(false);
        // refetch();
        cb?.();
        toast({
          message: res.data.message || "Rule action successfully",
          variant: "success",
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e.response.data.message);
        toast({
          message: "Something went wrong",
          variant: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onCreateRule,
    onTestRule,
    onActionUpdateRule,
    isLoading,
  };
};
