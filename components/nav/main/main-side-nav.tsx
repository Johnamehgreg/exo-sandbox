'use client';

import { ContactSales } from '@/components/dashboard/contact-sales';
import { routes } from '@/lib/routes';
import { hasAccess } from '@/lib/utils';
import { IconDianaLogo } from '@/public/assets/svg/icon-diana-logo';
import { IconDashboardNav } from '@/public/assets/svg/nav/Icon/icon-dashboard';
import { IconDianaNav } from '@/public/assets/svg/nav/Icon/icon-diana copy';
import { IconEuclidNav } from '@/public/assets/svg/nav/Icon/icon-euclid';
import { IconFibonacciNav } from '@/public/assets/svg/nav/Icon/icon-fibonacci';
import sideNavGradient from '@/public/image/side-nav-gradient.svg';
import { Box, Flex } from '@mantine/core';
import { Session } from 'next-auth';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { ReactNode } from 'react';
import MainNavItem from '../main-nav-item';
const AccessAgentChecker = dynamic(() => import('@/components/other/access-agent-checker'), { ssr: false });

interface Props {
  secondarySideNavbar?: ReactNode;
  session: Session | null;
}

const MainSideNav = ({ session, secondarySideNavbar }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (route: string) => router.push(route);

  return (
    <Flex className="overflow-hidden">
      <Box className="relative h-screen w-[72px] bg-p1 py-4 transition-all">
        <Image
          alt=""
          src={sideNavGradient}
          className="absolute top-[-100px] h-[300px]"
          priority
        />
        <Image
          alt=""
          src={sideNavGradient}
          className="absolute top-[35%] h-[300px]"
          priority
        />
        <Image
          alt=""
          src={sideNavGradient}
          className="absolute bottom-[-100px] h-[300px]"
          priority
        />
        <Flex className="items-center justify-center" mb={'lg'}>
          <IconDianaLogo fill="#fff" className="block transition-all" />
        </Flex>
        <Box className="h-[calc(100vh-260px)] overflow-y-auto overflow-x-hidden px-[24px] pt-4">
          <Flex className="flex-col items-center justify-center gap-5">
            <MainNavItem
              label="Dashboard"
              isActive={pathname == routes.app.dashoard}
              onClick={() => handleNavigation(routes.app.dashoard)}
              Icon={IconDashboardNav}
            />
            {/* fibonacci nav item */}
            <AccessAgentChecker hasAccess={!!hasAccess('fibonacci', session)}>
              <MainNavItem
                label="Fibonacci"
                isActive={pathname.includes('fibonacci')}
                onClick={() => handleNavigation(routes.fibonacci.overview)}
                Icon={IconFibonacciNav}
              />
            </AccessAgentChecker>

            {/* diana nav item */}
            <AccessAgentChecker hasAccess={!!hasAccess('diana', session)}>
              <MainNavItem
                label="Diana"
                isActive={pathname.includes('diana')}
                // TODO handle when no project list and other edge cases
                onClick={() => {
                  handleNavigation(routes.diana.dianaOverview)
                }
                }
                Icon={IconDianaNav}
              />
            </AccessAgentChecker>

            {/* Euclid nav item */}
            <AccessAgentChecker hasAccess={process.env.NEXT_PUBLIC_ENABLE_EUCLID_VIEW === 'true'}>
              <MainNavItem
                label="Euclid"
                isActive={pathname.includes('euclid')}
                onClick={() =>
                  handleNavigation(
                    routes.euclid.overview
                  )
                }
                Icon={IconEuclidNav}
              />
            </AccessAgentChecker>
          </Flex>
        </Box>
        <ContactSales />
      </Box>
      {secondarySideNavbar ? secondarySideNavbar : null}
    </Flex>
  );
};

export default MainSideNav;
