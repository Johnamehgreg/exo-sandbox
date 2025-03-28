/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/toast';
import apis from '@/services/api-services';
import {
  DianaMessageMode,
  FibonacciMessageModel,
  ScenariosMessageMode,
} from '@/types/general';
import { useState } from 'react';

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onCreateAskDianaChat = ({
    values,
    cb,
    errorCb,
  }: {
    values: DianaMessageMode;
    cb?: (res?: any) => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.diana.chat
      .createAskDianaChat({
        value: values,
      })
      .then((res) => {
        setIsLoading(false);
        cb?.(res?.data);
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e?.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };
  const onCreateScenariosChat = ({
    values,
    cb,
    errorCb,
  }: {
    values: ScenariosMessageMode;
    cb?: (res?: any) => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.diana.chat
      .createScenariosChat({
        value: values,
      })
      .then((res) => {
        setIsLoading(false);
        cb?.(res?.data);
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e?.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };
  const onCreateFibonacciInsightChat = ({
    values,
    cb,
    errorCb,
  }: {
    values: FibonacciMessageModel;
    cb?: (res?: any) => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.fibonacci
      .createInsightChat(values)
      .then((res) => {
        setIsLoading(false);
        cb?.(res?.data);
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e?.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const onCreateChatProject = ({
    cb,
    errorCb,
  }: {
    cb?: (res?: any) => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.diana.project.createDianaProject()
      .then((res) => {
        setIsLoading(false);
        cb?.(res?.data);
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e?.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };
  const onCreateAnalyzeProject = ({
    values,
    url,
    cb,
    errorCb,
  }: {
    values?: any;
    url: string;
    cb?: (res?: any) => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.diana.project
      .createDianaAnalyzedProject({ values: values, url: url })
      .then((res) => {
        cb?.(res?.data);
      })
      .catch((e) => {
        errorCb?.(e?.response?.data?.message);
      })
      .finally(() => setIsLoading(false));
  };

  const onDeleteProject = ({
    cb,
    product_id,
    errorCb,
  }: {
    product_id: string;
    cb?: () => void;
    errorCb?: (message: string) => void;
  }) => {
    setIsLoading(true);
    apis.diana.project
      .deleteProject(product_id)
      .then(() => {
        setIsLoading(false);
        cb?.();
        toast({
          message: 'Project deleted successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCb?.(e?.response?.data?.message);
        toast({
          message: e?.response?.data?.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };
  return {
    onCreateChatProject,
    onCreateAskDianaChat,
    onCreateAnalyzeProject,
    onCreateFibonacciInsightChat,
    onDeleteProject,
    isLoading,
    onCreateScenariosChat,
  };
};
