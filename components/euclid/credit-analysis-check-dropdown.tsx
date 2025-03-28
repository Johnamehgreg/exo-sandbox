import React from 'react'
import { Box, Flex, Loader, Text } from '@mantine/core'
import Image from 'next/image';
import checked from "@/public/assets/svg/checkCircle.svg";

export interface CreditAnalysisCheckItem {
    name: string;
    status: "Not-started" | "In-progress" | "Completed";
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface CreditAnalysisCheckProps {
    creditAnalysisChecks: CreditAnalysisCheckItem[];
    index: number;
    item: CreditAnalysisCheckItem;
}
export const CreditAnalysisCheckDropdown: React.FC<CreditAnalysisCheckProps> = ({ creditAnalysisChecks, item, index }) => {
    return (
        
      <Flex justify={"space-between"} className={`${creditAnalysisChecks.length - 1 === index ? "" : "border-b border-b-[#F3F4F6]"} py-2 items-center`}>
        <Flex className="items-center gap-1 pl-3">
          {item.status !== "Not-started" ? <item.icon width={16} height={16} /> : <item.icon fill="#6B7280" width={16} height={16} />}
          <Text className={`${item.status === "Not-started" ? "text-[#6B7280]" : item.status === "In-progress" ? "text-[#1F2937]" : "text-[#00964A]"} text-[12px]`}>
            {item.name}
          </Text>
        </Flex>
        {item.status === "Completed" ? <Image src={checked} alt="completed" className="mr-3 w-4 h-4" /> : item.status === "In-progress" ? <Loader size={"16px"} color="black" className="mr-3" /> : <Box className="w-4 h-4 border-[2px] border-[#F3F4F6] rounded-full mr-3"></Box>}
      </Flex>
    );
  };
  