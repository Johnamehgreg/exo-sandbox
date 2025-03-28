import { SVGProps } from 'react';

export const DianaProjectOverlay = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="108"
      height="99"
      viewBox="0 0 108 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.4" filter="url(#filter0_f_1018_24748)">
        <circle cx="19" cy="88.5" r="48.5" fill="#FECDD3" />
      </g>
      <defs>
        <filter
          id="filter0_f_1018_24748"
          x="-69.5"
          y="0"
          width="177"
          height="177"
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
            stdDeviation="20"
            result="effect1_foregroundBlur_1018_24748"
          />
        </filter>
      </defs>
    </svg>
  );
};
