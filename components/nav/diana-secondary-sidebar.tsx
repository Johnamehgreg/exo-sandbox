'use client';
import { Box, Transition } from '@mantine/core';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BatchNav } from '../diana/batch-nav';
import { DianaSideNav } from '../layout/diana-side-nav';
import { useUiStore } from '@/app/store/ui.store';

const DianaSecondarySidebar = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const [showBatchNav, setShowBatchNav] = useState(true);
  const { isNavCollapse } = useUiStore();
  return (
    <Transition
      mounted={pathname.includes('diana')}
      transition="slide-right"
      duration={100}
    >
      {(styles) => (
        <Box
          style={styles}
          data-is-collapse={isNavCollapse}

          className={`${isNavCollapse ? "w-[72px]" : "w-[250px]"} dashboard-gray-bg relative h-screen w-[300px] px-[12px] py-4 collapse-changes`}
        >
          <Box className="relative">
            <Box className="z-1 absolute left-[27px] h-[calc(100%_-_40px)] w-[1px] bg-gray-200" />
            <>
              <Transition
                mounted={showBatchNav}
                transition="fade-right"
                duration={400}
                enterDelay={400}
              >
                {(styles) => (
                  <Box style={styles}>
                    <BatchNav
                      onSingleProjectClick={() => {
                        setShowBatchNav(!showBatchNav);
                      }}
                      session={session}
                    />
                  </Box>
                )}
              </Transition>
              <Transition
                mounted={!showBatchNav}
                transition="fade-left"
                duration={400}
                enterDelay={400}
              >
                {(styles) => (
                  <Box style={styles}>
                    <DianaSideNav
                      session={session}
                      onBackClick={() => setShowBatchNav(!showBatchNav)}
                    />
                  </Box>
                )}
              </Transition>
            </>
          </Box>
        </Box>
      )}
    </Transition>
  );
};

export default DianaSecondarySidebar;
