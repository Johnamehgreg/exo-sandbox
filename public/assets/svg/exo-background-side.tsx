import { SVGProps } from 'react';

export const ExoBackgroundSide = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="172"
      height="83"
      viewBox="0 0 172 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.3" filter="url(#filter0_f_1018_24658)">
        <circle cx="-1" cy="37.5" r="48.5" fill="#86EFAC" />
      </g>
      <defs>
        <filter
          id="filter0_f_1018_24658"
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
            result="effect1_foregroundBlur_1018_24658"
          />
        </filter>
      </defs>
    </svg>
  );
};
