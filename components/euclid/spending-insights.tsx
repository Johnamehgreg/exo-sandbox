import Legend from "@/components/euclid/legend";
import map from "@/public/assets/svg/euclid/map.svg";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { IconTransaction } from "@/public/assets/svg/nav/fibonacci/icon-transaction";
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const SpendingInsights = () => {
  const [order, setOrder] = useState<"Ascending" | "Descending">("Descending");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const topLocations = useMemo(
    () => [
      {
        name: "Lagos",
        percent: 90,
        number: 430,
      },
      {
        name: "Abuja",
        percent: 50,
        number: 430,
      },
      {
        name: "Kano",
        percent: 30,
        number: 430,
      },
      {
        name: "Jos",
        percent: 100,
        number: 430,
      },
    ],
    []
  );

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="  ">
      <Box className="">
        <Flex className="bg-[#F9FAFB] rounded-t-[8px]  p-3 items-center justify-between">
          <Flex className="items-center gap-1">
            <IconTransaction />
            <Flex className="items-center gap-1">
              <Text className="text-[14px]">Spending Insights</Text>
              <Text className="italic text-[#6B7280] text-[14px]">(Transaction Location Spread)</Text>
            </Flex>
          </Flex>
          <Flex justify="space-between" className="items-center gap-2">
            <Text className="text-primary text-[12px]">12 May 2023 @ 6:45PM</Text>
            <Box className="w-[1px] h-3 bg-[#E4E6E6]"></Box>
            <UnstyledButton>
              <IconDropDown className="rotate-180 transition-all" />
            </UnstyledButton>
          </Flex>
        </Flex>

        <Box className="bg-white p-2 rounded-b-[10px]  overflow-y-auto">
          <Flex className="justify-between items-start">
            <Box className="w-[65%]">
              <Image src={map} alt="map" className=" " />
            </Box>
            <Box className="w-[33%] ">
              <Flex className="items-center justify-between pt-2 w-full mb-2">
                <Text className="text-[14px]">Top Locations</Text>
                <Flex justify="space-between" className="items-center gap-2">
                  <Flex
                    ref={dropdownRef}
                    className="relative w-fit border border-[#E4E6E6] rounded-[6px] py-1 px-2 items-center justify-center gap-1 cursor-pointer"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    <Box className={"rotate-90"}>
                      <IconTransaction />
                    </Box>
                    <Text className="text-[12px] font-[350]">{order} Order</Text>
                    <UnstyledButton>
                      <IconDropDown className="transition-all" />
                    </UnstyledButton>

                    {dropdownOpen && (
                      <Box className="absolute top-full left-0 mt-1 w-[140px] bg-white border border-gray-300 rounded-md shadow-md z-10">
                        <Text
                          className="text-[12px] px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setOrder("Ascending");
                            setDropdownOpen(false);
                          }}
                        >
                          Ascending Order
                        </Text>
                        <Text
                          className="text-[12px] px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setOrder("Descending");
                            setDropdownOpen(false);
                          }}
                        >
                          Descending Order
                        </Text>
                      </Box>
                    )}
                  </Flex>
                </Flex>
              </Flex>
              <Box className=" max-h-[380px] overflow-y-auto mb-2">
                {topLocations.map((item, index) => (
                  <Legend key={index} item={item} />
                ))}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default SpendingInsights;
