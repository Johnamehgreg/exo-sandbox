"use client"
import customerHeader from "@/public/assets/svg/euclid/euclidCustomer.svg";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";

interface EuclidHeaderProps {
    session:Session | null
    }

const EuclidHeader:React.FC<EuclidHeaderProps> = ({session}) => {
  const [opened, setOpened] = useState(false);
  return (
    <Box className="w-[calc(100%-110px)] fixed top-0 z-[100] mt-[9px] h-[68px] flex items-center gap-4 bg-[#F9FAFB] px-[10px] rounded-t-[8px] ">
      <Flex className="border-[#E5E7EB] h-[48px] p-[3px] rounded-[8px] bg-white border items-center justify-between min-w-[211px] ">
        <Box className="flex items-center gap-2">
          <Image src={customerHeader} alt="customer" width={42} height={42} />
          <Box>
            <Text className="text-[14px] text-[#1F2937] font-[650]  ">
              {session?.user?.firstName}{" "}{session?.user?.lastName}
            </Text>
            <Text className="text-[#4B5563] text-sm font-[250] ">Euclid</Text>
          </Box>
        </Box>
        <UnstyledButton onClick={() => setOpened(!opened)}>
          <IconDropDown
            className={`${opened && "rotate-180"} transition-all`}
          />
        </UnstyledButton>
      </Flex>
      <Box className="bg-[#92A3B8] border-2px h-4 w-[1px] "></Box>
      <Text className=" text-[#1F2937] font-[650]  ">Credit Analysis</Text>
    </Box>
  );
};

export default EuclidHeader;
