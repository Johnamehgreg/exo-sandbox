import { SVGProps } from 'react';

interface IconArrowRightProps extends SVGProps<SVGSVGElement> {
  fill?: string;
}

export const IconArrowRight = (props: IconArrowRightProps) => {
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
        fill={props.fill}
        d="M13.4766 9.16689L9.00658 4.69689L10.1849 3.51855L16.6666 10.0002L10.1849 16.4819L9.00658 15.3036L13.4766 10.8336H3.33325V9.16689H13.4766Z"
        className={props.fill || '#94A3B8'}
      />
    </svg>
  );
};
