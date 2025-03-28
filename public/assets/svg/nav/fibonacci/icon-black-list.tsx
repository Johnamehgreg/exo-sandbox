import { SVGProps } from 'react';

export const IconBlackList = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        opacity="0.2"
        d="M15.75 9C15.75 10.335 15.3541 11.6401 14.6124 12.7501C13.8707 13.8601 12.8165 14.7253 11.5831 15.2362C10.3497 15.7471 8.99252 15.8808 7.68314 15.6203C6.37377 15.3598 5.17104 14.717 4.22703 13.773C3.28303 12.829 2.64015 11.6262 2.3797 10.3169C2.11925 9.00749 2.25292 7.65029 2.76382 6.41689C3.27471 5.18349 4.13987 4.12928 5.2499 3.38758C6.35994 2.64588 7.66498 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z"
        fill={props.fill || '#6B7280'}
      />
      <path
        d="M9 1.6875C7.55373 1.6875 6.13993 2.11637 4.9374 2.91988C3.73486 3.72339 2.7976 4.86544 2.24413 6.20163C1.69067 7.53781 1.54586 9.00811 1.82801 10.4266C2.11017 11.8451 2.80661 13.148 3.82928 14.1707C4.85196 15.1934 6.15492 15.8898 7.57341 16.172C8.99189 16.4541 10.4622 16.3093 11.7984 15.7559C13.1346 15.2024 14.2766 14.2651 15.0801 13.0626C15.8836 11.8601 16.3125 10.4463 16.3125 9C16.3105 7.06123 15.5394 5.20246 14.1685 3.83154C12.7975 2.46063 10.9388 1.68955 9 1.6875ZM15.1875 9C15.1889 10.4467 14.6809 11.8477 13.7524 12.9572L5.04282 4.24688C5.94633 3.49522 7.04524 3.01644 8.21094 2.86655C9.37664 2.71667 10.5609 2.90189 11.6252 3.40054C12.6895 3.89919 13.5897 4.69064 14.2206 5.68227C14.8514 6.6739 15.1868 7.8247 15.1875 9ZM2.8125 9C2.81106 7.5533 3.31914 6.15229 4.24758 5.04281L12.9572 13.7531C12.0537 14.5048 10.9548 14.9836 9.78907 15.1334C8.62337 15.2833 7.43909 15.0981 6.37481 14.5995C5.31054 14.1008 4.4103 13.3094 3.77943 12.3177C3.14857 11.3261 2.81317 10.1753 2.8125 9Z"
        fill={props.fill || '#6B7280'}
      />
    </svg>
  );
};
