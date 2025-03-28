const ProcessingSVG = ({ ongoing }: { ongoing: string }) => {
  return (
    <svg
      width="192"
      height="96"
      viewBox="0 0 192 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="48" cy="48" r="47.5" stroke="#E5E7EB" />
      <g className=" hidden md:block" filter="url(#filter0_d)">
        <path
          d="M81 31H184C187.314 31 190 33.6863 190 37V57C190 60.3137 187.314 63 184 63H81V31Z"
          fill="white"
        />
        <path
          d="M81.5 31.5H184C187.038 31.5 189.5 33.9624 189.5 37V57C189.5 60.0376 187.038 62.5 184 62.5H81.5V31.5Z"
          stroke="#D1D5DB"
        />
        <text
          x="90"
          y="54"
          fill="#0C3932"
          className="text-[#0c3932] bg-red-300 text-[18px] font-semibold font-tkw tracking-tight"
        >
          Complete
        </text>
      </g>
      <g filter="url(#filter1_d)">
        <rect x="13" y="11.1797" width="72" height="72" rx="36" fill="white" />
        <rect
          x="12.5"
          y="10.6797"
          width="73"
          height="73"
          rx="36.5"
          stroke="url(#paint0_linear)"
        />
        <text
          x="33"
          y="55"
          fill="#0C3932"
          className="text-[#0c3932] text-[18px] font-semibold font-['TWK Lausanne'] tracking-tight"
        >
          {ongoing}
        </text>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="79"
          y="30"
          width="113"
          height="36"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d"
          x="10"
          y="9.17969"
          width="78"
          height="78"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="49"
          y1="11.1797"
          x2="49"
          y2="83.1797"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1BEC55" />
          <stop offset="1" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ProcessingSVG;
