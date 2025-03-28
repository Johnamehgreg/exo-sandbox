import { SVGProps } from 'react';

export const IconCritical = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
    >
      <path
        opacity="0.2"
        d="M17.7188 4.4375V12.9688C17.7188 13.1428 17.6496 13.3097 17.5265 13.4328C17.4035 13.5559 17.2365 13.625 17.0625 13.625H13.7812V17.5625C13.7812 17.7365 13.7121 17.9035 13.589 18.0265C13.466 18.1496 13.299 18.2188 13.125 18.2188H3.9375C3.76345 18.2188 3.59653 18.1496 3.47346 18.0265C3.35039 17.9035 3.28125 17.7365 3.28125 17.5625V9.03125C3.28125 8.8572 3.35039 8.69028 3.47346 8.56721C3.59653 8.44414 3.76345 8.375 3.9375 8.375H7.21875V4.4375C7.21875 4.26345 7.28789 4.09653 7.41096 3.97346C7.53403 3.85039 7.70095 3.78125 7.875 3.78125H17.0625C17.2365 3.78125 17.4035 3.85039 17.5265 3.97346C17.6496 4.09653 17.7188 4.26345 17.7188 4.4375Z"
        fill={props.fill || '#0C3932'}
      />
      <path
        d="M18.375 4.4375V12.9688C18.375 13.3168 18.2367 13.6507 17.9906 13.8968C17.7444 14.143 17.4106 14.2812 17.0625 14.2812H8.14652L8.99555 15.1295C9.05652 15.1904 9.10489 15.2628 9.13788 15.3425C9.17088 15.4221 9.18786 15.5075 9.18786 15.5938C9.18786 15.68 9.17088 15.7654 9.13788 15.845C9.10489 15.9247 9.05652 15.9971 8.99555 16.058C8.93457 16.119 8.86219 16.1674 8.78253 16.2004C8.70286 16.2334 8.61748 16.2504 8.53125 16.2504C8.44502 16.2504 8.35964 16.2334 8.27997 16.2004C8.20031 16.1674 8.12793 16.119 8.06695 16.058L6.0982 14.0893C6.03719 14.0283 5.98878 13.956 5.95576 13.8763C5.92273 13.7966 5.90573 13.7112 5.90573 13.625C5.90573 13.5388 5.92273 13.4534 5.95576 13.3737C5.98878 13.294 6.03719 13.2217 6.0982 13.1607L8.06695 11.192C8.19009 11.0688 8.3571 10.9996 8.53125 10.9996C8.7054 10.9996 8.87241 11.0688 8.99555 11.192C9.11869 11.3151 9.18786 11.4821 9.18786 11.6562C9.18786 11.8304 9.11869 11.9974 8.99555 12.1205L8.14652 12.9688H17.0625V4.4375H7.875V5.09375C7.875 5.2678 7.80586 5.43472 7.68279 5.55779C7.55972 5.68086 7.3928 5.75 7.21875 5.75C7.0447 5.75 6.87778 5.68086 6.75471 5.55779C6.63164 5.43472 6.5625 5.2678 6.5625 5.09375V4.4375C6.5625 4.0894 6.70078 3.75556 6.94692 3.50942C7.19306 3.26328 7.5269 3.125 7.875 3.125H17.0625C17.4106 3.125 17.7444 3.26328 17.9906 3.50942C18.2367 3.75556 18.375 4.0894 18.375 4.4375ZM13.7812 16.25C13.6072 16.25 13.4403 16.3191 13.3172 16.4422C13.1941 16.5653 13.125 16.7322 13.125 16.9062V17.5625H3.9375V9.03125H12.8535L12.0045 9.87945C11.8813 10.0026 11.8121 10.1696 11.8121 10.3438C11.8121 10.5179 11.8813 10.6849 12.0045 10.808C12.1276 10.9312 12.2946 11.0004 12.4688 11.0004C12.6429 11.0004 12.8099 10.9312 12.933 10.808L14.9018 8.8393C14.9628 8.77835 15.0112 8.70597 15.0442 8.6263C15.0773 8.54664 15.0943 8.46124 15.0943 8.375C15.0943 8.28876 15.0773 8.20336 15.0442 8.1237C15.0112 8.04403 14.9628 7.97165 14.9018 7.9107L12.933 5.94195C12.8099 5.81881 12.6429 5.74964 12.4688 5.74964C12.2946 5.74964 12.1276 5.81881 12.0045 5.94195C11.8813 6.06509 11.8121 6.23211 11.8121 6.40625C11.8121 6.58039 11.8813 6.74741 12.0045 6.87055L12.8535 7.71875H3.9375C3.5894 7.71875 3.25556 7.85703 3.00942 8.10317C2.76328 8.34931 2.625 8.68315 2.625 9.03125V17.5625C2.625 17.9106 2.76328 18.2444 3.00942 18.4906C3.25556 18.7367 3.5894 18.875 3.9375 18.875H13.125C13.4731 18.875 13.8069 18.7367 14.0531 18.4906C14.2992 18.2444 14.4375 17.9106 14.4375 17.5625V16.9062C14.4375 16.7322 14.3684 16.5653 14.2453 16.4422C14.1222 16.3191 13.9553 16.25 13.7812 16.25Z"
        fill={props.fill || '#0C3932'}
      />
    </svg>
  );
};
