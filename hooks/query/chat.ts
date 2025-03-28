'use client';
import { hasAccess } from '@/lib/utils';
import apis from '@/services/api-services';
import { DianaChatModel, DianaProjectModel } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useAskDianaChatRecommendation = ({
  projectId,
  enabled,
}: {
  projectId: string;
  enabled?: boolean;
}) => {
  const [shouldFetch, setShouldFetch] = useState(enabled);
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
  } = useQuery({
    queryKey: ['get-ask-diana-chat-recommendation-conversation', projectId],
    queryFn: () => apis.diana.chat.getAskDianaChatRecommendation(projectId),
    enabled: shouldFetch,
  });
  const [chatRecommendation, setChatRecommendation] = useState<string[]>([]);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const fetchRules = data?.data;
      setChatRecommendation(fetchRules);
      setShouldFetch(true);
    }
  }, [data, chatRecommendation, isFetched, isSuccess]);
  return {
    isPending,
    chatRecommendation,
    refetch,
    setChatRecommendation,
    isError,
    error,
    isFetching,
    status,
    isLoading,
    isSuccess,
  };
};

export const useProject = ({ userId }: { userId: string }) => {
  const session = useSession();
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
  } = useQuery({
    queryKey: ["get-diana-project"],
    queryFn: () => apis.diana.project.getDianaProject(userId),
    enabled: !!hasAccess('diana', session.data)
  });
  const [projects, setProject] = useState<DianaProjectModel[]>([]);
  useEffect(() => {
    if (isSuccess && isFetched) {
      const fetchProjects: DianaProjectModel[] = data?.data;
      setProject(fetchProjects);
    }
  }, [data, setProject, projects, isFetched, isSuccess]);
  return {
    isPending,
    projects,
    refetch,
    setProject,
    isError,
    error,
    isFetching,
    status,
    isLoading,
    isSuccess,
  };
};

export const useAskDianaConversationChat = ({
  projectId,
  isExplore,
  section,
  insightText,
  disableFetch,
}: {
  projectId: string;
  section: string;
  insightText?: string;
  disableFetch?: boolean;
  isExplore?: boolean;
}) => {
  const [shouldFetch, setShouldFetch] = useState(true);
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
  } = useQuery({
    queryKey: ['get-ask-diana-conversation', projectId, insightText, section],
    queryFn: () =>
      apis.diana.chat.getAskDianaChatHistory(projectId, section, isExplore),
    enabled:
      shouldFetch && (projectId ? true : false) && !disableFetch && !isExplore,
  });
  const [chatConversation, setChatConversation] = useState<DianaChatModel[]>(
    []
  );
  useEffect(() => {
    if (isSuccess && isFetched) {
      const fetchRules = data?.data;
      setChatConversation(fetchRules);
      setShouldFetch(false);
    }
  }, [data, setChatConversation, chatConversation, isFetched, isSuccess]);
  return {
    isPending,
    chatConversation,
    refetch,
    setChatConversation,
    isError,
    error,
    isFetching,
    shouldFetch,
    status,
    isLoading,
    isSuccess,
  };
};
