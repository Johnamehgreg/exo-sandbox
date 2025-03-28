import { SVGProps } from 'react';

export const ExoAnalysisCardOverlay = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="237"
      height="97"
      viewBox="0 0 237 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.4" filter="url(#filter0_f_1018_24712)">
        <circle cx="130.482" cy="201.982" r="161.982" fill={props.fill} />
      </g>
      <defs>
        <filter
          id="filter0_f_1018_24712"
          x="-71.5"
          y="0"
          width="403.965"
          height="403.965"
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
            result="effect1_foregroundBlur_1018_24712"
          />
        </filter>
      </defs>
    </svg>
  );
};
