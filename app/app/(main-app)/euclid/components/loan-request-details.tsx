import DetailRow from "@/components/euclid/detail-row";
import DashboardTooltip from "@/components/other/dashboard-tool-tip";
import errorWarning from "@/public/assets/svg/errorWarning.svg";
import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";

const LoanRequestDetails = () => {
  const [hoverOnContainer, setHoverOnContainer] = useState<boolean>(false)
  return (
    <div onMouseEnter={() => setHoverOnContainer(true) } onMouseLeave={() => setHoverOnContainer(false) }   className={` w-[350px] h-full bg-[#f3f4f6] rounded-[8px] p-2 overflow-y-auto  ${hoverOnContainer ? ""  :"scrollbar-hide"} `}>
      <Flex className="justify-between bg-[#F9FAFB] py-2 px-3 mb-4 rounded-[8px]">
        <Flex className="gap-1">
          <Text className="text-[14px]">Loan Request Details</Text>
          <DashboardTooltip label="Loan Request Details" />
        </Flex>
        <Text className="text-[14px]">12 May 2023</Text>
      </Flex>
      <Flex justify={"space-between"} className="py-3 relative">
          <Text className="text-[#6B7280] text-[14px]">Amount Requested</Text>
          <Text className="text-[14px]">₦50,000,000.00</Text>
          <div className="w-full h-[4px] absolute bottom-0 left-0  ">
        <div className="w-full h-[2px] bg-[#E5E7EB] "></div>
        <div className="w-full h-[2px] bg-white "></div>
      </div>
      </Flex>
      <Flex className="justify-between py-3">
        <Box>
          <DetailRow label="Loan Type" value="Mortgage" isBordered={false}  />
        </Box>
        <Box>
          <DetailRow label="Duration" value="2 Years" isBordered={false} className="text-end" loading= {true} />
        </Box>
      </Flex>
      <Box className="bg-[#F9FAFB] py-2 px-3 rounded-[8px]">
        <Flex className="gap-1">
          <Text className="text-[14px]">Customer Profile</Text>
          <DashboardTooltip label="Customer Profile" />
        </Flex>
      </Box>
      <DetailRow label="Name" value="Adeiza Joshua" />
      <DetailRow label="Customer Account Type" value="Business Account" />
      <Flex className="justify-between  relative">
        <Box>
          <DetailRow label="DOB" value="June 17, 1990 (34 yrs old)" isBordered={false}  />
        </Box>
        <Box>
          <DetailRow label="Gender" value="Male" isBordered={false} className="text-end" />
        </Box>
        <div className="w-full h-[4px] absolute bottom-0 left-0  ">
        <div className="w-full h-[2px] bg-[#E5E7EB] "></div>
        <div className="w-full h-[2px] bg-white "></div>
      </div>
      </Flex>
      <Box className=" relative pb-2">
        <Flex justify={"space-between"}>
          <Box>
            <DetailRow label="BVN" value="12345678901" isBordered={false} />
          </Box>
          <Box>
            <DetailRow label="Mobile Number" value="+234 812 345 6789" isBordered={false} className="text-end"  />
          </Box>
        </Flex>
        <Flex className="px-3 py-2 bg-[#FFF7ED] text-[#9A3413] text-[12px] gap-2 rounded-[6px] my-2 items-start ">
              <Image src={errorWarning} alt="warning" className="mt-1" />
              The BVN provided does not match the applicant’s registered name. Please verify the BVN or confirm the applicant’s details.
        </Flex>
        <div className="w-full h-[4px] absolute bottom-0  left-0  ">
        <div className="w-full h-[2px] bg-[#E5E7EB] "></div>
        <div className="w-full h-[2px] bg-white "></div>
      </div>
      </Box>
      <DetailRow label="Email Address" value="jimohibrahim@gmail.com" />
      <DetailRow
        label="Residential Address"
        value="12, Akinwale Street, Surulere, Lagos State"
        isBordered={false}
      />
      <DetailRow
        label="Bank Account Number"
        value="1234566779"
        isBordered={false}
        itemToCopy={true}
      />
    </div>
  );
};

export default LoanRequestDetails;
