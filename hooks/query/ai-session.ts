import { GetAiSessionResponse } from "@/lib/helper";
import apis from "@/services/api-services";
import { useQuery } from "@tanstack/react-query";

export const useGetAiSession = () => {
  const {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    isFetched,
    isFetching,
    status,
    isError,
    data,
  } = useQuery<GetAiSessionResponse>({
    queryKey: ["get-ai-session"],
    queryFn: async () => {
      const response = await apis.fibonacci.getAiSession();
      return response.data;
    },
  });

  const session = data?.session;

  return {
    isPending,
    refetch,
    isLoading,
    error,
    isSuccess,
    isFetched,
    isFetching,
    status,
    isError,
    data,
    session,
  };
};
