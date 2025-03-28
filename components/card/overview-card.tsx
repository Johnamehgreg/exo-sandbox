import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import CircularProgress from '@/components/ui/circular-progress';
import { CLoudIcon } from '@/public/assets/svg/cloudIcon';
import { DownloadIcon } from '@/public/assets/svg/downloadIcon';
import { PdfIcon } from '@/public/assets/svg/pdfIcon';
import { Box, Card, Flex, Loader, Skeleton, Text, Transition } from '@mantine/core';
import React from 'react';

interface OverviewCardProps {
    creditScore?: boolean;
    transactionVolume?: boolean;
    bankStatmentCheck?: boolean
    status?:string
    creditScoreReport?:string
    transactionVolumeAmt?:string
    bankStatementCheckResult?: string
    loading:boolean
    creditScoreTotal?: number;
    creditScoreAmt?: number;
    transactionCount?:number;
    fileName?: string;
}
export const OverviewCard: React.FC<OverviewCardProps> = ({creditScore=false, transactionVolume=false,bankStatmentCheck=false, status, creditScoreReport, transactionVolumeAmt, bankStatementCheckResult,loading, creditScoreTotal, creditScoreAmt, transactionCount, fileName}) => {
  return (
    <Transition
          mounted={ true }
          transition="fade"
          duration={400}
          timingFunction="ease">
            {(styles) => (
       <Card  style={{
        ...styles,
      }}  className="auth-small-car p-0  w-full rounded-[8px] " >
       <Flex justify={"space-between"} className='pt-2 px-2 '>
           <Text className='text-primary font-[550]'>
               {creditScore ? "Credit Score" : transactionVolume ? "Transaction Volume" : bankStatmentCheck ? "Bank Statement Check" : ""}
           </Text>
           {creditScore && <DashboardTooltip label="Credit score" />}
           {transactionVolume && <Text className='text-[14px] text-[#6B7280] font-[350] '>12 May 24 - 14 Jul 25</Text> }
           
       </Flex>
       <Box className="w-full h-[194px] flex items-center justify-center " >
        {loading && <Loader size={"xs"} color='#9CA3AF'  /> }
          {!loading && creditScore &&  
          <Flex className='flex-col items-center' >
           <Flex className='items-center'>
                   <Text className='text-[60px] font-[550] '>{creditScoreAmt}</Text>
                   <Text className='text-[30px] font-[350] text-[#6B7280] mt-3 '>/{creditScoreTotal}</Text>
           </Flex>
           <span className={`mt-[-15px] text-[14px] gap-1 justify-center border border-[#D1D5DB] px-[10px] font-[450] py-1 rounded-[4px] ${status === "Completed" ? "bg-completed-bg text-[#00964A] " : status === "Moderate" ? "bg-processing-bg text-[#2C5C80]" : "bg-failed-bg text-[#A63418]"}`}>
             {status}
           </span>
          </Flex>
           }
   
           {!loading && transactionVolume && 
            <Box className='items-center'>
               <Text className='text-[60px] font-[550] '>{transactionCount}</Text>
               <Text className='text-center text-[#6B7280]  text-[14px] font-[300] mt-[-20px]  '>Transaction Count</Text>
            </Box>
           }
           {!loading && bankStatmentCheck && <CircularProgress currentStep={1} totalSteps={4} />
           }
       </Box>
       <Box className="w-full h-[126px] bg-[#F9FAFB] border-t border-t-[#f3f4f6] p-2 " >
           {!loading && creditScore && <Text className='text-[14px]' >{creditScoreReport}</Text>}
           {loading && creditScore && <Flex className='flex-col justify-center gap-2 w-full h-full '>
            <Skeleton height={16} width={"60%"} radius="sm" animate={true} />
            <Skeleton height={16} width={"80%"} radius="sm" animate={true} />
           </Flex>  }
           {!loading && transactionVolume &&  
               <Flex className='items-center justify-center flex-col w-full h-full '>
                   <Text className='text-[#1F2937] font-[550] text-[30px] '>₦{transactionVolumeAmt}</Text> 
                   <Text className='text-[#6B7280] text-[14px] font-[300] '>Total Transaction Value</Text>
               </Flex>
           }
           {loading && transactionVolume && <Flex className='items-center justify-center w-full h-full'><Loader size={"xs"} color='#9CA3AF'  /></Flex> }
           {!loading && bankStatementCheckResult && <Box>
               <Text className='text-[14px] '>{bankStatementCheckResult}</Text>
               <Flex justify={"space-between"} className="items-center  ">
               <Flex className='w-fit border mt-3 border-[#E4E6E6] rounded-[6px] py-1 px-2 items-center justify-center gap-1 '>
                   <Text className='text-primary text-[8px] '>Source:</Text>
                   <PdfIcon width={10} height={10} />
                   <Text className='text-[8px] '>{fileName}</Text>
                   <Box className='w-[1px] h-2 bg-[#E4E6E6] '></Box>
                   <DownloadIcon />
               </Flex>
               <Box className='mt-3'>
                   <CLoudIcon />
               </Box>
               </Flex>
           </Box>  }
           {loading && bankStatmentCheck && <Flex className='flex-col justify-center gap-2 w-full h-full '>
            <Skeleton height={16} width={"60%"} radius="sm" animate={true} />
            <Skeleton height={16} width={"80%"} radius="sm" animate={true} />
            <Flex className='items-center justify-between'>
            <Flex className='w-fit border mt-3 border-[#E4E6E6] rounded-[6px] py-1 px-2 items-center justify-center gap-1 '>
                   <Text className='text-primary text-[8px] '>Source:</Text>
                   <PdfIcon width={10} height={10} />
                   <Text className='text-[8px] '>{fileName}</Text>
                   <Box className='w-[1px] h-2 bg-[#E4E6E6] '></Box>
                   <DownloadIcon />
               </Flex>
               <Box className='mt-3'>
                   <CLoudIcon />
               </Box>
            </Flex>
           </Flex>  }
       </Box>
   </Card>
      )}
          </Transition>
    
  );
};
