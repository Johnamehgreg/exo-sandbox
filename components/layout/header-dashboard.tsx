'use client';

import { Box, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Session } from 'next-auth';
import { usePathname } from "next/navigation";
import DianaSecondarySidebar from '../nav/diana-secondary-sidebar';
import FibonacciSecondarySidebar from '../nav/fibonacci-secondary-sidebar';
import MainSideNav from '../nav/main/main-side-nav';


interface Props {
  session: Session | null;
}

export const HeaderDashboard = ({ session }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();
  const isDiana = pathname.includes("diana");

  return (
    <>
      <Drawer
        className='p-0'
        withCloseButton={false}
        p={0}
        overlayProps={{ backgroundOpacity: 0.1, blur: 4 }}
        shadow="lg"
        radius="md"
        size="auto"
        opened={opened}
        onClose={close}
        classNames={{
          body: ' !p-0 h-screen w-fit'
        }}
      >
        <MainSideNav secondarySideNavbar={isDiana ? <DianaSecondarySidebar session={session as Session} /> : <FibonacciSecondarySidebar />} session={session} />
      </Drawer>

      <Box className="dashboard-horizontal-padding absolute bg-white/30 left-0 top-3 z-[100] block p-2 backdrop-blur-sm md:hidden">
        <Burger opened={opened} onClick={open} aria-label="Toggle navigation" />
      </Box>
    </>
  );
};
