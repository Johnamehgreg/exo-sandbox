'use client'; // Ensure this is a Client Component

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParams = Object.fromEntries(searchParams.entries());

  const setQueryParams = (
    newQueryParams: Record<string, string>,
    hashQuery?: string
  ) => {
    const updatedQueryParams = {
      ...queryParams,
      ...newQueryParams,
    };

    const newSearchParams = new URLSearchParams(updatedQueryParams);

    router.replace(`?${newSearchParams.toString()}`);

    if (hashQuery) {
      window.history.replaceState(null, '', `#${hashQuery}`);
    }
  };

  const getWindowQueryParams = (): Record<string, string> => {
    const params = new URLSearchParams(window.location.search);

    const paramsObject: Record<string, string> = {};
    params.forEach((value, key) => {
      paramsObject[key] = value;
    });

    return paramsObject;
  };

  return {
    queryParams,
    setQueryParams,
    searchParams,
    getWindowQueryParams,
  };
};
