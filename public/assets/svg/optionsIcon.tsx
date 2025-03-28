import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export const OptionsIcon = (props: IconProps) => {
  return (
    <svg
      {...props}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.53125 7C8.53125 7.30285 8.44144 7.59891 8.27319 7.85072C8.10493 8.10253 7.86578 8.29879 7.58598 8.41469C7.30619 8.53059 6.9983 8.56091 6.70127 8.50183C6.40424 8.44274 6.13139 8.29691 5.91724 8.08276C5.70309 7.86861 5.55726 7.59577 5.49817 7.29873C5.43909 7.0017 5.46941 6.69382 5.58531 6.41402C5.70121 6.13422 5.89747 5.89507 6.14928 5.72681C6.4011 5.55856 6.69715 5.46875 7 5.46875C7.40611 5.46875 7.79559 5.63008 8.08276 5.91724C8.36992 6.20441 8.53125 6.59389 8.53125 7ZM7 4.15625C7.30285 4.15625 7.59891 4.06644 7.85072 3.89819C8.10253 3.72993 8.29879 3.49078 8.41469 3.21098C8.53059 2.93119 8.56091 2.6233 8.50183 2.32627C8.44275 2.02924 8.29691 1.75639 8.08276 1.54224C7.86861 1.32809 7.59577 1.18226 7.29873 1.12317C7.0017 1.06409 6.69382 1.09441 6.41402 1.21031C6.13422 1.32621 5.89507 1.52247 5.72681 1.77428C5.55856 2.0261 5.46875 2.32215 5.46875 2.625C5.46875 3.03111 5.63008 3.42059 5.91724 3.70776C6.20441 3.99492 6.59389 4.15625 7 4.15625ZM7 9.84375C6.69715 9.84375 6.4011 9.93356 6.14928 10.1018C5.89747 10.2701 5.70121 10.5092 5.58531 10.789C5.46941 11.0688 5.43909 11.3767 5.49817 11.6737C5.55726 11.9708 5.70309 12.2436 5.91724 12.4578C6.13139 12.6719 6.40424 12.8177 6.70127 12.8768C6.9983 12.9359 7.30619 12.9056 7.58598 12.7897C7.86578 12.6738 8.10493 12.4775 8.27319 12.2257C8.44144 11.9739 8.53125 11.6779 8.53125 11.375C8.53125 10.9689 8.36992 10.5794 8.08276 10.2922C7.79559 10.0051 7.40611 9.84375 7 9.84375Z"
        fill="#4B5563"
      />
    </svg>
  );
};
