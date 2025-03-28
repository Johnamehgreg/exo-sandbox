"use client"
import { handleCopy } from "@/lib/helper";
import { IconCopy } from "@/public/assets/svg/icon-copy";
import { Box, Flex, Text } from "@mantine/core";
import clsx from "clsx";
import { useState } from "react";

interface DetailRowProps {
  label: string;
  value: string;
  isBordered?: boolean;
  className?: string; 
  itemToCopy?: boolean;
  loading?: boolean;
}

const DetailRow = ({ label, value, isBordered = true, className, itemToCopy = false, loading = false}: DetailRowProps) => {
  const [copied, setCopied] = useState(false);
  const Container = itemToCopy ? Flex : Box;
  return (
    <Container className={clsx("py-3 relative", itemToCopy && "justify-between flex items-start", className)}>
      <Box>
        <Text className="text-[#6B7280] text-[14px]">{label}</Text>
        {loading ? <Box className="h-5 rounded-[4px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] px-[80px] animate-shimmer w-full"></Box>
 : <Text className="text-[14px]">{value}</Text>}
      </Box>
      {itemToCopy && 
       <Flex className="text-[#1F2937] font-[550] text-[14px] ml-2 items-center">
        {copied && <Text className="mt-2 mr-1 text-green-600 text-sm">Copied!</Text>}
          <button onClick={() => handleCopy(value,setCopied)} className="mt-2">
            <IconCopy fill="black"/>
          </button>
        </Flex>
      }
      {isBordered && <div className="w-full h-[4px] absolute bottom-0 left-0  ">
        <div className="w-full h-[2px] bg-[#E5E7EB] "></div>
        <div className="w-full h-[2px] bg-white "></div>
      </div> }
    </Container>
  );
};

export default DetailRow;
