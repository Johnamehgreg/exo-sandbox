import { SVGProps } from 'react';

export const IconFile = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.16602 1.33398H4.49935C4.14573 1.33398 3.80659 1.47446 3.55654 1.72451C3.30649 1.97456 3.16602 2.3137 3.16602 2.66732V13.334C3.16602 13.6876 3.30649 14.0267 3.55654 14.2768C3.80659 14.5268 4.14573 14.6673 4.49935 14.6673H12.4993C12.853 14.6673 13.1921 14.5268 13.4422 14.2768C13.6922 14.0267 13.8327 13.6876 13.8327 13.334V6.00065L9.16602 1.33398Z"
        stroke={props.fill || '#475569'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16602 1.33398V6.00065H13.8327"
        stroke={props.fill || '#475569'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
