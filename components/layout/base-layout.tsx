import { authOptions } from '@/app/server/auth';
import { Box, Flex } from '@mantine/core';
import { getServerSession } from 'next-auth';
import { PropsWithChildren, ReactNode } from 'react';
import MainSideNav from '../nav/main/main-side-nav';
import AutoLogout from '../other/auto-logout';
import { HeaderDashboard } from './header-dashboard';

interface Props {
  secondarySideNavbar?: ReactNode;
}

const BaseLayout = async ({
  children,
  secondarySideNavbar,
}: PropsWithChildren<Props>) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Flex className="h-screen overflow-hidden">
        <Box className="hidden md:block h-full  flex-shrink-0">
          <MainSideNav {...{ session, secondarySideNavbar }} />
        </Box>
        <Box className="flex-1 h-full overflow-auto bg-gray-50">
          <HeaderDashboard {...{ session }} />
          <Box>{children}</Box>
        </Box>
      </Flex>
      <AutoLogout />
    </>
  );
};

export default BaseLayout;
