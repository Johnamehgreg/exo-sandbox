'use client';

import { colors } from '@/lib/app-config';
import { IconFibonacciNav } from '@/public/assets/svg/nav/Icon/icon-fibonacci';
import { Box, Flex, Text, Transition } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { fibonacciLinks } from '../layout/extras';
import { CustomTab } from '../other/custom-tab';

const FibonacciSecondarySidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Transition
      mounted={pathname.includes('fibonacci')}
      transition="slide-right"
      duration={100}
    >
      {(styles) => (
        <Box
          style={styles}
          className="dashboard-gray-bg relative h-screen w-[250px] px-[12px] py-4"
        >
          <Box className="relative">
            <Box className="z-1 absolute left-[27px] h-[calc(100%_-_40px)] w-[1px] bg-gray-200" />
            <Box className="side-diana-card-btn bg-re mb-[2rem] px-[12px]">
              <Box className="pr-2">
                <IconFibonacciNav />
              </Box>
              <Flex className="w-full flex-col gap-[2px]">
                <Text
                  className="text-[14px] font-[650] leading-[14px] text-[#1F2937]"
                  lineClamp={1}
                >
                  Fibonacci
                </Text>
              </Flex>
            </Box>
            <CustomTab
              value={pathname}
              activeIconColor={colors.vibrantgreen}
              indicatorClassName="side-nav-link-btn"
              activeClassNameText="text-vibrantgreen"
              inactiveClassNameText="text-gray-600 font-[350] text-[14px]"
              iconWrapperClassName=" h-[25px] z-20 sticky dashboard-gray-bg w-[25px]"
              onChange={(value: string | ((val: string) => string)) => {
                if (typeof value === 'string') {
                  router.push(value);
                }
              }}
              sectionList={fibonacciLinks}
            />
          </Box>
        </Box>
      )}
    </Transition>
  );
};

export default FibonacciSecondarySidebar;
