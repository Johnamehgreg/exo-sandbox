import { authOptions } from '@/app/server/auth';
import { AskDianaModal } from '@/components/diana/ask-diana-modal';
import ModuleWrapper from '@/components/layout/module-wrapper';
import DianaSecondarySidebar from '@/components/nav/diana-secondary-sidebar';
import { Box, Flex } from '@mantine/core';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';

const DianaLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  return (
    <Flex>
      <Box className='hidden md:block'>
        <DianaSecondarySidebar session={session} />
      </Box>
      <ModuleWrapper>{children}</ModuleWrapper>
      <AskDianaModal />
    </Flex>
  );
};

export default DianaLayout;
