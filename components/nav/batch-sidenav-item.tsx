'use client';

import { Box, Collapse, UnstyledButton } from "@mantine/core";
import { CaretDown } from "@phosphor-icons/react";

import { useUiStore } from "@/app/store/ui.store";
import Fader from "@/public/image/fader.svg";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { JSX } from "react";
import { TooltipNavIcon } from "../dashboard/tooltip-nav-icon";

interface Props {
  label: string;
  url?: string;
  onClick?: () => void;
  count: string;
  Icon: JSX.Element;
  children?: React.ReactNode;
}

export const DianaSidenavItem: React.FC<Props> = ({
  label,
  count,
  Icon,
  children,
  url,
  onClick,
}) => {
  const [opened, { toggle }] = useDisclosure(true);
  const  pathname  = usePathname();
  const activeLink = pathname.startsWith(url as string);

  const { isNavCollapse } = useUiStore();

  return (
    <Box className="relative">
      <TooltipNavIcon disabled={!isNavCollapse} label={label}>
        <UnstyledButton
          onClick={() => {
            onClick?.();
          }}
          className="batch-collapse-link  nav-collapse-icon-wrapper"
          data-is-active={activeLink}
        >
          <Box className="flex flex-1 gap-x-2 nav-collapse-icon-wrapper  items-center text-[14px]">
            {Icon}
            <span className="nav-collapse-item">
              {label} <span className="font-semibold">{`(${count})`}</span>
            </span>
          </Box>
          {activeLink && <Image alt="" src={Fader} className="absolute -left-24 -z-1" />}
          <span
            //   variant="transparent"
            className="p-1 hover:bg-gray-50 nav-collapse-item rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
          >
            <CaretDown className={`${opened && "rotate-180"} transition-all`} />
          </span>{" "}
        </UnstyledButton>
      </TooltipNavIcon>
      <Collapse
        in={opened}
        className="pl-5 pr-6 space-y-0.5 relative max-h-[200px] overflow-hidden hover:overflow-y-auto nav-collapse-item"
      >
        <div className="flex gap-3">
          <div className="min-h-full w-px border-gray-200 border-r"></div>{" "}
          {/* Ensure this takes full height */}
          <div className="py-1 w-full">{children}</div>
        </div>
      </Collapse>
    </Box>
  );
};
