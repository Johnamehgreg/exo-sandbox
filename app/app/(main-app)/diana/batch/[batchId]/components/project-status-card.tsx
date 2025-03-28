import { IconCheckBox } from "@/public/assets/svg/icon-checkbox";
import { IconFailedRed } from "@/public/assets/svg/icon-failed-red";
import { Box, Loader } from "@mantine/core";
import React from "react";

const getStatus = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <div className="h-[26px] px-2.5 bg-green-50 rounded border border-gray-300 justify-center items-center gap-1 inline-flex">
          <IconCheckBox className="size-[14px]" />
          <div className="text-green-600 text-sm font-['TWK Lausanne']">
            Completed
          </div>
        </div>
      );
    case "processing":
      return (
        <div className="h-[26px] px-2.5 bg-[#e5f9ff] rounded border border-gray-300 justify-center items-center gap-1 inline-flex">
          <Box className="bg-[#079abf] size-[14px] flex items-center justify-center rounded-full">
            <Loader color="#fff" size={10} />
          </Box>
          <div className="text-[#079abf] text-sm font-['TWK Lausanne']">
            Processing
          </div>

        </div>
      );
    case "failed":
      return (
        <div className="h-[26px] px-2.5 bg-rose-50 rounded border border-gray-300 justify-center items-center gap-1 inline-flex">
          <IconFailedRed />
          <div className="text-rose-600 text-sm font-['TWK Lausanne']">
            Failed
          </div>
        </div>
      );
    default:
      return (
        <div className="h-[26px] px-2.5 bg-[#e5f9ff] rounded border border-gray-300 justify-center items-center gap-1 inline-flex">
          <Box className="bg-[#079abf] size-[14px] flex items-center justify-center rounded-full">
            <Loader color="#fff" size={10} />
          </Box>
          <div className="text-[#079abf] text-sm font-['TWK Lausanne']">
            Processing
          </div>
     
        </div>
      );
  }
};
interface Props {
  status: string;
}
export const ProjectStatusCard: React.FC<Props> = ({ status }) => {
  return <Box>{getStatus(status)}</Box>;
};
