import { SVGProps } from 'react';

export const IconArrowDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.41636 6.73947L7.65136 4.50447L8.24061 5.09372L4.9997 8.33464L1.75879 5.09372L2.34805 4.50447L4.58303 6.73947V1.66797H5.41636V6.73947Z"
        fill={props.fill || '#CF4E4E'}
      />
    </svg>
  );
};
// #F3F4F6