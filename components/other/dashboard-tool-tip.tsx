'use client';

import { IconToolkit } from '@/public/assets/svg/icon-toolpit';
import { Tooltip, UnstyledButton, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

interface Props {
  label?: ReactNode;
}

const DashboardTooltip = ({ label }: Props) => {
  const theme = useMantineTheme();

  return (
    <Tooltip
      withArrow
      classNames={{
        tooltip: `py-1 px-2 rounded-md  text-[#F5F5F5] shadow-md transition-all `,
      }}
      color={theme.colors[theme.primaryColor][6]}
      label={label}
    >
      <UnstyledButton>
        <IconToolkit />
      </UnstyledButton>
    </Tooltip>
  );
};

export default DashboardTooltip;
