'use client';

import { theme } from '@/lib/theme';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import styles from './styles.module.css';
import { getQueryClient } from './tanstack-query-provider';

function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <TanstackQueryProvider>
        <MantineProvider
          theme={{
            ...theme,
            activeClassName: styles.active,
          }}
        >
          {children}
        </MantineProvider>
      </TanstackQueryProvider>
    </SessionProvider>
  );
};

export default Providers;
