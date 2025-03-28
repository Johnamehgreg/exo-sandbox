import { SVGProps } from 'react';

export const IconTCheck = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_427_5135)">
        <path
          d="M6.6665 10.1146L12.7945 3.98596L13.7378 4.92863L6.6665 12L2.42383 7.7573L3.3665 6.81463L6.6665 10.1146Z"
          fill={props.fill || '#1B9256'}
        />
      </g>
      <defs>
        <clipPath id="clip0_427_5135">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
