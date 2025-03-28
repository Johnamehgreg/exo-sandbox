import { SVGProps } from "react";

export const IconCheckBox = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_335_13181)">
        <path
          d="M7.99992 15.1673C4.31792 15.1673 1.33325 12.1827 1.33325 8.50065C1.33325 4.81865 4.31792 1.83398 7.99992 1.83398C11.6819 1.83398 14.6666 4.81865 14.6666 8.50065C14.6666 12.1827 11.6819 15.1673 7.99992 15.1673ZM7.33525 11.1673L12.0486 6.45332L11.1059 5.51065L7.33525 9.28198L5.44925 7.39598L4.50659 8.33865L7.33525 11.1673Z"
          fill={props.fill || "#1B9256"}
        />
      </g>
      <defs>
        <clipPath id="clip0_335_13181">
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
