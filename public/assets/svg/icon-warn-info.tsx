import { SVGProps } from 'react';

export const IconWarnInfo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill="#FEF5E7" />
      <g clipPath="url(#clip0_178_8826)">
        <path
          d="M16 26C10.477 26 6 21.523 6 16C6 10.477 10.477 6 16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26ZM15 19V21H17V19H15ZM15 11V17H17V11H15Z"
          fill="#F18F01"
        />
      </g>
      <defs>
        <clipPath id="clip0_178_8826">
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
