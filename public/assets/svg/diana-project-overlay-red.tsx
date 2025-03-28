import { SVGProps } from 'react';

export const DianaProjectOverlayRed = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="172"
      height="83"
      viewBox="0 0 172 83"
      fill="none"
      {...props}
    >
      <g opacity="0.3" filter="url(#filter0_f_1018_24868)">
        <circle cx="-1" cy="37.5" r="48.5" fill={props.fill || '#FB7185'} />
      </g>
      <defs>
        <filter
          id="filter0_f_1018_24868"
          x="-173.5"
          y="-135"
          width="345"
          height="345"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="62"
            result="effect1_foregroundBlur_1018_24868"
          />
        </filter>
      </defs>
    </svg>
  );
};
