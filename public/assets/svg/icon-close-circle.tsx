import { SVGProps } from 'react';

export const IconCloseCircle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_335_12915)">
        <path
          d="M7.99992 15.1673C4.31792 15.1673 1.33325 12.1827 1.33325 8.50065C1.33325 4.81865 4.31792 1.83398 7.99992 1.83398C11.6819 1.83398 14.6666 4.81865 14.6666 8.50065C14.6666 12.1827 11.6819 15.1673 7.99992 15.1673ZM7.99992 7.55798L6.11459 5.67198L5.17125 6.61532L7.05725 8.50065L5.17125 10.386L6.11459 11.3293L7.99992 9.44332L9.88525 11.3293L10.8286 10.386L8.94258 8.50065L10.8286 6.61532L9.88525 5.67198L7.99992 7.55798Z"
          fill={props.fill || '#C73E1D'}
        />
      </g>
      <defs>
        <clipPath id="clip0_335_12915">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
