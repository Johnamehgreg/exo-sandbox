import { useQuery } from '@tanstack/react-query';

// const baseUrl = "https://publicfrontend.blob.core.windows.net/frontend";

const fetchAnimation = async (url: string) => {
  const response = await fetch(`${url}`);
  if (!response.ok) {
    throw new Error('Failed to load animation data');
  }
  return response.json();
};

export const useFetchAnimation = (url: string) => {
  return useQuery({
    queryKey: ['animation', url],
    queryFn: () => fetchAnimation(url),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false,
  });
};
