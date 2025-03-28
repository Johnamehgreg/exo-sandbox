import { colors } from '@/lib/app-config';
import { SVGProps } from 'react';

export const IconApproved = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill={colors.p1} />
      <g clipPath="url(#clip0_388_7587)">
        <path
          d="M14.0002 19.172L23.1922 9.979L24.6072 11.393L14.0002 22L7.63623 15.636L9.05023 14.222L14.0002 19.172Z"
          fill={colors.palegreen}
        />
      </g>
      <defs>
        <clipPath id="clip0_388_7587">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(4 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
