import ModuleWrapper from '@/components/layout/module-wrapper';
import FibonacciSecondarySidebar from '@/components/nav/fibonacci-secondary-sidebar';
import { Box, Flex } from '@mantine/core';
import { PropsWithChildren } from 'react';

const FibonacciLayout = async ({ children }: PropsWithChildren) => {
  return (
    <Flex>
      <Box className='hidden md:block'>
        <FibonacciSecondarySidebar />
      </Box>
      <ModuleWrapper>
        {children}
      </ModuleWrapper>
    </Flex>
  );
};

export default FibonacciLayout;
