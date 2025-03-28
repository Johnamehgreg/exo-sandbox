import { toast } from "@/components/ui/toast";
import { trackError } from "@/lib/error-tracking";
import apis from "@/services/api-services";
import { useState } from "react";

export const useDianaConfiguration = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [configurationData, setConfigurationData] = useState<any>(null);
  const getConfiguration = ({
    cb,
    errorCb,
    organizationId,
  }: {
    cb?: (res: any) => void;
    errorCb?: (message: string) => void;
    organizationId: string;
  }) => {
    const url = `?organizationId=${organizationId}`;
    setIsFetching(true);
    apis.diana.configuration
      .getConfiguration(url)
      .then((res) => {
        setIsLoading(false);
        setIsFetching(false);
        cb?.(res);
        setConfigurationData(res.data);
        setIsError(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setIsFetching(false);
        trackError(e, { message: `Failed to fetch configuration` });
        errorCb?.(e.response.data.message);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };
  const resetConfiguration = ({
    cb,
    errorCb,
    organizationId,
  }: {
    cb?: (res: any) => void;
    errorCb?: (message: string) => void;
    organizationId: string;
  }) => {
    const url = `?organizationId=${organizationId}`;
    setIsUpdating(true);
    apis.diana.configuration
      .resetConfiguration(url)
      .then((res) => {
        cb?.(res);
        toast({
          message: "Configuration reset successfully",
          variant: "success",
        });
      })
      .catch((e) => {
        toast({
          message: "Something went wrong",
          variant: "error",
        });
        trackError(e, { message: `Failed to fetch configuration` });
        errorCb?.(e.response.data.message);
      })
      .finally(() => setIsUpdating(false));
  };
  const updateConfiguration = ({
    cb,
    errorCb,
    data,
  }: {
    cb?: (res: any) => void;
    errorCb?: (message: string) => void;
    data: any;
  }) => {
    setIsUpdating(true);
    apis.diana.configuration
      .updateConfiguration(data)
      .then((res) => {
        cb?.(res);
        toast({
          message: "Changes saved successfully",
          variant: "success",
        });
      })
      .catch((e) => {
        toast({
          message: "Something went wrong",
          variant: "error",
        });
        trackError(e, { message: `Failed to fetch configuration` });
        errorCb?.(e.response.data.message);
      })
      .finally(() => setIsUpdating(false));
  };

  return {
    getConfiguration,
    isLoading,
    isFetching,
    isUpdating,
    isError,
    configurationData,
    resetConfiguration,
    updateConfiguration,
  };
};
