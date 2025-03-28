import { SVGProps } from 'react';

export const IconDocument = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_94_1000)">
        <path
          d="M3.00002 9.5H9.00002C9.26524 9.5 9.5196 9.39464 9.70713 9.20711C9.89467 9.01957 10 8.76522 10 8.5V2.5H20.002C20.553 2.5 21 2.955 21 3.492V21.508C20.9998 21.7712 20.895 22.0235 20.7088 22.2095C20.5226 22.3955 20.2702 22.5 20.007 22.5H3.99302C3.8617 22.4991 3.73185 22.4723 3.61087 22.4212C3.48989 22.3701 3.38017 22.2957 3.28796 22.2022C3.19575 22.1087 3.12286 21.9979 3.07346 21.8762C3.02406 21.7545 2.9991 21.6243 3.00002 21.493V9.5ZM3.00002 7.5L8.00002 2.503V7.5H3.00002Z"
          fill={props.fill || '#211F44'}
        />
      </g>
      <defs>
        <clipPath id="clip0_94_1000">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
