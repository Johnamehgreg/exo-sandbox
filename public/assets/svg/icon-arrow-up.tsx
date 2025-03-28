import { SVGProps } from 'react';

export const IconArrowUp = (props: SVGProps<SVGSVGElement>) => {
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
        d="M5.41636 3.26315V8.33464H4.58303V3.26315L2.34805 5.49814L1.75879 4.90889L4.9997 1.66797L8.24061 4.90889L7.65136 5.49814L5.41636 3.26315Z"
        fill={props.fill || '#008700'}
      />
    </svg>
  );
};
