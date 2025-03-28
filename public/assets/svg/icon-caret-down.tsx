import { SVGProps } from 'react';

export const IconCaretDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M11.6849 5.55953L7.30988 9.93453C7.26924 9.97521 7.22099 10.0075 7.16788 10.0295C7.11477 10.0515 7.05784 10.0628 7.00034 10.0628C6.94285 10.0628 6.88592 10.0515 6.83281 10.0295C6.7797 10.0075 6.73144 9.97521 6.69081 9.93453L2.31581 5.55953C2.25456 5.49834 2.21284 5.42036 2.19593 5.33545C2.17902 5.25053 2.18768 5.16251 2.22082 5.08253C2.25396 5.00254 2.31009 4.93419 2.3821 4.88612C2.45411 4.83805 2.53877 4.81243 2.62534 4.8125L11.3753 4.8125C11.4619 4.81243 11.5466 4.83805 11.6186 4.88612C11.6906 4.93419 11.7467 5.00254 11.7799 5.08253C11.813 5.16251 11.8217 5.25053 11.8048 5.33545C11.7879 5.42036 11.7461 5.49834 11.6849 5.55953Z"
        fill={props.fill || '#77FF9E'}
      />
    </svg>
  );
};
