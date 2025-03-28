'use client'
import { ErrorPageLayout } from "@/components/layout/auth/error-page-layout";
import { routes } from "@/lib/routes";
import { ErrorDetails } from "@/types/general";
import { Anchor, Button, Group, Text } from "@mantine/core";
import { useRouter } from "nextjs-toploader/app";

// Error boundaries must be Client Components





export default function Error({
  error,
  reset,
  isFetching,
}: {
  error: ErrorDetails;
  reset: () => void,
  isFetching: boolean,
}) {
  const statusCode = error?.status;
  const router = useRouter()
  const renderErrorMessage = (
    title: string,
    defaultMessage: string,
    hideRetry?: boolean
  ) => (
    <ErrorPageLayout
      title={title}
      message={
        <Text component="p" className="whitespace-pre-line text-center">
          {defaultMessage}{' '}
          <Anchor href="mailto:support@exoai.tech" target="_blank">
            support@exoai.tech
          </Anchor>
        </Text>
      }
    >
      <Group className="gap-3">
        {!hideRetry && (
          <Button loading={isFetching} onClick={reset}>
            {isFetching ? 'Fetching...' : 'Retry'}
          </Button>
        )}

        <Button
          onClick={() => {
            router.push(routes.app.dashoard)
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