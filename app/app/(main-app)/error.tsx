'use client'; // Error boundaries must be Client Components

import { ErrorPageLayout } from '@/components/layout/error-page-layout';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPageLayout
      message="It looks like something broke on our end. We're already on it, but if this keeps happening, feel free to reach out to our support team—they’re here to help!"
      title="Well! This is embarrassing"
      resetError={reset}
      error={null}
    ></ErrorPageLayout>
  );
}
