'use client';

import useAutoLogout from '@/hooks/logic/useAutoLogout';
import { IconWarnInfo } from '@/public/assets/svg/icon-warn-info';
import { Text, useMantineTheme } from '@mantine/core';
import { ActionModal } from '../modal/action-modal';

const AutoLogout = () => {
  const theme = useMantineTheme();
  const { logout, formattedCountdown, onReset, showAuthModal } =
    useAutoLogout();
  return (
    <ActionModal
      Icon={() => <IconWarnInfo />}
      disableCloseOutside={true}
      cancelBtnText={'Log out'}
      buttonText={'Stay logged in'}
      buttonBgColor={theme.colors[theme.primaryColor][6]}
      isVisible={showAuthModal}
      onSubmit={() => {
        onReset();
      }}
      onClose={() => {
        logout();
      }}
      message={
        <Text component="p" className="!text-[12px]">
          For your security, you&apos;ll be logged out soon due to inactivity.
          You have{' '}
          <Text
            component="span"
            className={'!text-[12px]'}
            c={theme.colors[theme.primaryColor][6]}
          >
            {formattedCountdown} minute(s)
          </Text>{' '}
          remaining before automatic logout.To stay logged in, please click
        </Text>
      }
      title="Are you still there?"
    />
  );
};

export default AutoLogout;
