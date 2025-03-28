'use client';
import { routes } from '@/lib/routes';
import { IconAvatar } from '@/public/assets/svg/nav/Icon/icon-avatar';
import { IconContact } from '@/public/assets/svg/nav/Icon/icon-contact';
import { IconGearSetting } from '@/public/assets/svg/nav/Icon/icon-gear-setting';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';
import { TooltipNavIcon } from './tooltip-nav-icon';

export const ContactSales = () => {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const handleNavigation = (route: string) => router.push(route);
  const clearAnimationRegister = () => localStorage.clear();

  const theme = useMantineTheme();

  const handleLogout = () => {
    // TODO: clear query cache
    clearAnimationRegister();
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Box className="flex h-[180px] flex-col items-center justify-end gap-2">
      <TooltipNavIcon label="Contact us">
        <ActionIcon
          onClick={() => {
            window.location.href = 'mailto:support@exoai.tech';
          }}
          className="!h-[36px] !w-[36px] bg-transparent hover:bg-transparent"
        >
          <IconContact fill="#fff" />
        </ActionIcon>
      </TooltipNavIcon>

      <TooltipNavIcon label="Settings">
        <ActionIcon
          onClick={() => handleNavigation(routes.app.settings)}
          className="!h-[36px] !w-[36px] bg-transparent hover:bg-transparent"
        >
          <IconGearSetting fill="#fff" />
        </ActionIcon>
      </TooltipNavIcon>
      <Menu
        withArrow
        trigger="hover"
        position="right"
        transitionProps={{ transition: 'fade-right', duration: 300 }}
      >
        <Menu.Target>
          <ActionIcon bg={'transparent'} className="!h-[36px] !w-[36px]">
            <TooltipNavIcon
              label={`${upperFirst(user?.firstName || '')} ${upperFirst(
                user?.lastName || ''
              )}`}
            >
              <IconAvatar fill="#fff" />
            </TooltipNavIcon>
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown className="flex flex-col gap-1 p-3">
          <Flex className="h-full w-full items-center justify-center">
            <Box className="flex h-[40px] w-[40px] items-center justify-center">
              <Avatar bg={theme.colors[theme.primaryColor][6]} size={32}>
                <Text className="text-[14px] font-semibold text-[#fff]">
                  {upperFirst(user?.firstName?.slice(0, 1) || '')}

                  {upperFirst(user?.lastName?.slice(0, 1) || '')}
                </Text>
              </Avatar>
            </Box>
            <Text className="side-nav-text">
              {upperFirst(user?.firstName || '')}{' '}
              {upperFirst(user?.lastName || '')}
            </Text>
          </Flex>
          <Button
            variant="primary"
            onMouseEnter={(e) => e.stopPropagation()}
            onClick={handleLogout}
            size="xs"
          >
            Log Out
          </Button>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};
