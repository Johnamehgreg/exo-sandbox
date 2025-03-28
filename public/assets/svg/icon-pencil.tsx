import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

export const IconPencil = (props: IconProps) => {
  return (
    <svg {...props} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="PencilSimple">
        <path id="Vector" d="M14.3838 4.90844L11.5913 2.11532C11.4752 1.99919 11.3374 1.90707 11.1857 1.84422C11.034 1.78137 10.8714 1.74902 10.7072 1.74902C10.543 1.74902 10.3804 1.78137 10.2287 1.84422C10.077 1.90707 9.93921 1.99919 9.82313 2.11532L2.11626 9.82282C1.99976 9.93855 1.90739 10.0763 1.84452 10.228C1.78165 10.3797 1.74953 10.5424 1.75001 10.7066V13.4997C1.75001 13.8312 1.8817 14.1492 2.11612 14.3836C2.35054 14.618 2.66848 14.7497 3.00001 14.7497H5.79313C5.95734 14.7501 6.12001 14.718 6.27171 14.6551C6.42341 14.5923 6.56112 14.4999 6.67688 14.3834L14.3838 6.67594C14.6181 6.44153 14.7497 6.12365 14.7497 5.79219C14.7497 5.46074 14.6181 5.14285 14.3838 4.90844ZM5.68751 13.2497H3.25001V10.8122L8.50001 5.56219L10.9375 7.99969L5.68751 13.2497ZM12 6.93719L9.56251 4.49969L10.7088 3.35344L13.1463 5.79094L12 6.93719Z" fill="#77FF9E" />
      </g>
    </svg>
  );
};
