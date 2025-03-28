import { useMantineTheme } from '@mantine/core';
import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export const IconPlus = (props: IconProps) => {
  const theme = useMantineTheme();
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_230_3647)">
        <path
          d="M9.16675 9.1665V4.1665H10.8334V9.1665H15.8334V10.8332H10.8334V15.8332H9.16675V10.8332H4.16675V9.1665H9.16675Z"
          fill={props.color || theme.colors[theme.primaryColor][6]}
        />
      </g>
      <defs>
        <clipPath id="clip0_230_3647">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
