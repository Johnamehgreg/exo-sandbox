'use client';
import { cn } from '@/lib/utils';
import { Box, Transition } from '@mantine/core';
import { useEffect, useState } from 'react';

interface Props {
  children?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  isLoading?: boolean;
}
export const PageLWrapper: React.FC<Props> = ({
  children,
  isLoading,
  bottomComponent,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      <Transition
        mounted={animate}
        transition="fade-left"
        duration={500}
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
            <main className="flex h-max w-full justify-center">
              <Box mx={0} className="mx-0 w-full">
                <section
                  className={cn('mb-6 mt-3 h-max flex-grow', {
                    'min-h-screen': isLoading,
                  })}
                >
                  <Box
                    className={cn({
                      'h-[100vh]': isLoading,
                    })}
                  >
                    {children}
                  </Box>
                  {!isLoading && (
                    <Box className="sticky bottom-0">{bottomComponent}</Box>
                  )}
                </section>
              </Box>
            </main>
          </Box>
        )}
      </Transition>
    </>
  );
};
