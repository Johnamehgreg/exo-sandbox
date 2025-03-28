import { Tooltip } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import React from "react";

interface Props {
  label?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const TooltipNavIcon: React.FC<Props> = ({
  label,
  disabled,
  children,
}) => {
  return (
    <Tooltip
      disabled={disabled}
      position="left"
      arrowSize={8}
      label={upperFirst(label || "")}
      withArrow
      classNames={{
        tooltip: `py-1 px-2 text-[12px] rounded-md text-[#F5F5F5] shadow-md transition-all `,
      }}
      transitionProps={{ transition: "fade-right", duration: 300 }}
    >
      {children}
    </Tooltip>
  );
};
