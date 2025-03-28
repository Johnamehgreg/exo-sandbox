import checked from "@/public/assets/svg/checkCircle.svg";
import { LoanIcon } from '@/public/assets/svg/euclid/loan';
import failed from "@/public/assets/svg/failed.svg";
import { Box, Card, Flex, Loader, Skeleton, Text, Transition } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
interface OverviewCardProps {
    keyFinancialMetrics?: boolean;
    potentialRedFlags?: boolean;
    creditWorthy?: boolean
    monthlyIncome?:string;
    monthlyExpense?:string;
    netSurplusAmt?: string;
    liability?: string;
    redFlags?: string[];
    creditWorthyReasons?: string[];
    creditWorthyStatus?: "Yes" | "No";
    loading: boolean
}
export const AuxillaryOverviewCard: React.FC<OverviewCardProps> = ({keyFinancialMetrics=false, potentialRedFlags=false,creditWorthy=false,monthlyIncome, monthlyExpense,netSurplusAmt,liability,redFlags, creditWorthyReasons, creditWorthyStatus,loading}) => {
  return (
    <Transition
          mounted={ true }
          transition="fade"
          duration={400}
          timingFunction="ease">
            {(styles) => (
       <Card  style={{
        ...styles,
      }}  className="auth-small-car h-[350px] p-0  w-full rounded-[8px] " >
       <Flex justify={"space-between"} className='pt-2 px-2 items-center h-[40px] '>
           <Text className='text-primary font-[550] '>
               {keyFinancialMetrics ? "Key Financial Metrics" : potentialRedFlags ? "Potential Red Flags" : creditWorthy ? "Is Applicant Credit Worthy?" : ""}
           </Text>
           {!loading && creditWorthy &&
           <Box className={`text-[14px] flex items-center gap-1 justify-center border border-[#D1D5DB] font-[450] px-2 h-[26px] rounded-[8px] ${creditWorthyStatus === "Yes" ? "bg-completed-bg text-[#00964A] " : "bg-failed-bg text-[#A63418]"}`}>
           <Image src={creditWorthyStatus === "Yes" ? checked  : failed } alt="S/N" />
           <Text className="text-[14px] ">{creditWorthyStatus}</Text>
         </Box>
           }
           {loading && creditWorthy && <Loader size={"xs"} color='#9CA3AF'  /> }
       </Flex>
       <Box className="w-full h-[calc(100%-45px)] p-2 overflow-y-auto" >
          { keyFinancialMetrics &&  
         <Box>
            <Flex className='border-b border-b-[#f3f4f6] justify-between items-center w-full py-3 '>
              <Text className='text-[#6B7280] text-[14px] '>Monthly Income</Text>
              {!loading ?
              <Text className='text-[14px] '>₦{monthlyIncome}</Text>
              :  <Skeleton height={16} width={"20%"} radius="sm" animate={true} />
              }
            </Flex>
            <Flex className='border-b border-b-[#f3f4f6] justify-between items-center w-full py-3 '>
              <Text className='text-[#6B7280] text-[14px] '>Monthly Expense</Text>
              {!loading ?
              <Text className='text-[14px] '>₦{monthlyExpense}</Text>
              :  <Skeleton height={16} width={"40%"} radius="sm" animate={true} />
              }
            </Flex>
            <Flex className='border-b border-b-[#f3f4f6] justify-between items-center w-full py-3 '>
              <Text className='text-[#6B7280] text-[14px] '>Net Surplus</Text>
              {!loading ?
              <Text className='text-[14px] '>₦{netSurplusAmt}</Text>
              :  <Skeleton height={16} width={"30%"} radius="sm" animate={true} />
              }
            </Flex>
            <Flex className=' justify-between items-center w-full py-3 '>
              <Text className='text-[#6B7280] text-[14px] '>Existing Libilities</Text>
              {!loading ?
              <Text className='text-[14px] '>{liability} outstanding loans</Text>
              :  <Skeleton height={16} width={"50%"} radius="sm" animate={true} />
              }
            </Flex>
            
         </Box>
           }

           {!loading && potentialRedFlags &&
            redFlags?.map((item:string,index:number) => {
              return <Flex key={index} className={` gap-1 items-start  ${redFlags.length - 1  === index ? "" : "border-b-[#f3f4f6] border-b"}  w-full py-3 `}>
            <Box className='mt-1'>
            <LoanIcon fill='#C73E1D' stroke='red' />
            </Box>
            <Text className='text-[14px] '>{item}</Text>
         </Flex>
            })
           }
           {loading && potentialRedFlags &&
           <Box className="mt-1">
            { Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={`py-2 ${ index === 3 ? "" : "border-b-[#f3f4f6] border-b"} `}>
                <Skeleton  className={`${index / 2 === 1 ? "w-[70%]" :"w-[80%]"} my-1 rounded-[4px] `} height={16}  />
              </div>
            ))}
           </Box>
           }
           
            {!loading && creditWorthy &&
            <Box>
            <Text className='font-[450] text-[14px] text-[#6B7280] '>Why this applicant could qualify:</Text>
            {!loading &&  creditWorthyReasons?.map((item:string,index:number) => {
              return <Box key={index} className={`  ${creditWorthyReasons.length - 1  === index ? "" : "border-b-[#f3f4f6] border-b"}  w-full py-3 `}>
           
            <Text className='text-[14px] '>{item}</Text>
         </Box>
            })}
            </Box>
           }
           {loading && creditWorthy &&
           <Box className="mt-1">
            { Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={`py-2 ${ index === 3 ? "" : "border-b-[#f3f4f6] border-b"} `}>
                <Skeleton  className={`${index / 2 === 1 ? "w-[90%]" :"w-[70%]"} my-1 rounded-[4px] `} height={16}  />
              </div>
            ))}
           </Box>
           }
       </Box>
      
   </Card>
      )}
          </Transition>
    
  );
};
