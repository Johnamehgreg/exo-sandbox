import { SVGProps } from 'react';

export const IconArrowLeft = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5235 9.16664H16.6668V10.8333H6.5235L10.9935 15.3033L9.81516 16.4816L3.3335 9.99998L9.81516 3.51831L10.9935 4.69664L6.5235 9.16664Z"
        fill={props.fill || '#0CAE5C'}
      />
    </svg>
  );
};
