import { colors } from '@/lib/app-config';
import { cn } from '@/lib/utils';
import { ActionIcon, Tooltip } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { FC } from 'react';

type Props = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  Icon: FC<{ fill: string }>;
};

const MainNavItem = ({ label, isActive, onClick, Icon }: Props) => {
  return (
    <Tooltip
      position="left"
      arrowSize={8}
      label={upperFirst(label)}
      withArrow
      classNames={{
        tooltip: `py-1 px-2 rounded-md  text-[#F5F5F5] shadow-md transition-all `,
      }}
      transitionProps={{
        transition: 'fade-right',
        duration: 300,
      }}
    >
      <ActionIcon
        onClick={() => onClick?.()}
        className={cn('h-[36px] w-[36px] bg-transparent', {
          'bg-[rgba(119,255,158,0.30)] hover:bg-[rgba(119,255,158,0.30)]':
            isActive,
        })}
      >
        <Icon fill={isActive ? colors.palegreen : '#fff'} />
      </ActionIcon>
    </Tooltip>
  );
};

export default MainNavItem;
