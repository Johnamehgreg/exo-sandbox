/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUiStore } from '@/app/store/ui.store';
import { routes } from '@/lib/routes';
import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  Text,
} from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';
import React, { useEffect, useState } from 'react';
import { ErrorPageLayout } from '../layout/error-page-layout';

interface ErrorResponse {
  data?: {
    detail?: string;
    message?: string;
  };
}

interface ErrorDetails {
  status?: number;
  response?: ErrorResponse;
}

interface Props {
  loaderComponent?: React.ReactNode | null;
  onRefetch?: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  isFetching?: boolean;
  status?: 'error' | 'success' | 'pending';
  hideIsFetching?: boolean;
  error?: ErrorDetails | any;
  refetchingComponent?: React.ReactNode | null;
}

export const AppLoaderLayout: React.FC<Props> = ({
  children,
  loaderComponent,
  isLoading,
  refetchingComponent,
  isFetching,
  hideIsFetching,
  status,
  onRefetch,
  error,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');

  const router = useRouter();
  const { setDashboardType } = useUiStore();

  const errorStatus = error?.status;
  const errorMessage =
    error?.response?.data?.detail || error?.response?.data?.message;

  useEffect(() => {
    if (isLoading === false && (status === 'error' || status === 'success')) {
      setLoaded(true);
    }
  }, [isLoading, status]);
  useEffect(() => {
    if (status === 'error' && !isLoading && error) {
      setIsError(true);
      setStatusCode(errorStatus ?? null);
      setMessage(errorMessage ?? '');
    } else if (status === 'success' && !isLoading) {
      setIsError(false);
      setStatusCode(null);
      setMessage('');
    }
  }, [status, error, errorMessage, errorStatus, isLoading]);

  if (!loaded) {
    return loaderComponent ? (
      <>{loaderComponent}</>
    ) : (
      <Paper p="sm" className="h-[calc(100vh_-_100px)]">
        <Center style={{ height: '100%' }}>
          <Loader />
        </Center>
      </Paper>
    );
  }

  if (isError) {
    const renderErrorMessage = (
      title: string,
      defaultMessage: string,
      hideRetry?: boolean
    ) => (
      <ErrorPageLayout
        title={title}
        message={
          message || (
            <Text component="p" className="whitespace-pre-line text-center">
              {defaultMessage}{' '}
              <Anchor href="mailto:support@exoai.tech" target="_blank">
                support@exoai.tech
              </Anchor>
            </Text>
          )
        }
      >
        <Group className="gap-3">
          {!hideRetry && (
            <Button loading={isFetching} onClick={onRefetch}>
              {isFetching ? 'Fetching...' : 'Retry'}
            </Button>
          )}

          <Button
            onClick={() => {
              setDashboardType('dashboard');
              router.push(routes.app.dashoard);
            }}
          >
            Home
          </Button>
        </Group>
      </ErrorPageLayout>
    );

    if (statusCode === 500) {
      return renderErrorMessage(
        'Internal Server Error 500',
        "We're experiencing an internal server problem. \nPlease try again later or contact"
      );
    }

    if (statusCode === 404) {
      return renderErrorMessage(
        'Page not found 404',
        'The page you are looking for is not available! \nPlease try again later or contact'
      );
    }

    return renderErrorMessage(
      'Well! This is embarrassing',
      "It looks like something broke on our end. We're already on it, but if this keeps happening, feel free to reach out to our support team; they’re here to help!"
    );
  }

  return (
    <Box className="relative">
      {refetchingComponent ? (
        <>
          {isFetching && !hideIsFetching && loaded && (
            <>{refetchingComponent}</>
          )}
        </>
      ) : (
        <>
          {isFetching && !hideIsFetching && loaded && (
            <Center className="sticky left-[50%] top-[150px] z-[200] w-full translate-x-[-50%]">
              {/* <Loader /> */}
            </Center>
          )}
        </>
      )}

      {children}
    </Box>
  );
};
