"use client"
import { AuxillaryOverviewCard } from '@/components/card/auxillary-overview-card';
import { OverviewCard } from '@/components/card/overview-card';
import LoanDecisionTable from '@/components/euclid/loan-decision-table';
import ReceiverSenderTable from '@/components/euclid/receiver-sender-table';
import SpendingInsights from '@/components/euclid/spending-insights';
import TransactionsBreakdowntable from '@/components/euclid/transactions-breakdown-table';
import { truncateString } from '@/lib/helper';
import { DownloadIcon } from '@/public/assets/svg/downloadIcon';
import { LoanIcon } from '@/public/assets/svg/euclid/loan';
import { OverviewIcon } from '@/public/assets/svg/euclid/overview-icon';
import { TransactionIcon } from '@/public/assets/svg/euclid/transaction';
import ExportIcon from '@/public/assets/svg/exportIcon';
import { GlobeIcon } from '@/public/assets/svg/globe-icon';
import { IconCalender } from '@/public/assets/svg/icon-calender';
import { IconDelete } from '@/public/assets/svg/icon-delete';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { IconTransaction } from '@/public/assets/svg/nav/fibonacci/icon-transaction';
import { PdfIcon } from '@/public/assets/svg/pdfIcon';
import { Box, Container, Flex, Tabs, Text, Transition, UnstyledButton } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import CreditDebitCategoriesChart from './credit-debit-categories-chart';

const CreditAnalysis = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  const loanDecisionTab = searchParams.get("loanDecisionTab") || "all-loans"
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [hoverOnContainer, setHoverOnContainer] = useState<boolean>(false)
  const handleDateChange = useCallback((dates: [Date | null, Date | null]) => {
    setSelectedDateRange(dates);
  }, []);

  const handleTabChange = useCallback((value: string | null) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);
  
  const handleTabChangeLoanDecisionTab = useCallback((value: string | null) => {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('loanDecisionTab', value);
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);
  

  useEffect(() => {
    if (["overview", "loan-decision", "transaction-breakdown"].includes(tab)) return;
    
    const params = new URLSearchParams(searchParams);
    params.set('tab', 'overview');
    router.replace(`?${params.toString()}`);
  }, [tab, router, searchParams]);
  

  return (
    <div onMouseEnter={() => setHoverOnContainer(true) } onMouseLeave={() => setHoverOnContainer(false) }  className={`w-[calc(100%-350px)] h-full bg-white  overflow-y-auto  ${hoverOnContainer ? ""  :"scrollbar-hide"}   `}>
      <Container fluid className="">
      <Box className=' '>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            className='bg-white'
          >
            <Tabs.List mb={'lg'} className=' sticky top-0 z-10 bg-white border-b border-b-[#E5E7EB] '>
              <Tabs.Tab value="overview">
                <Flex gap={5} align={"center"}>
                  <OverviewIcon fill={tab === "overview" ? "#0C3932" :"#6B7280"} /> 
                  <Text className={tab === "overview" ? "text-[#0C3932] text-[14px]" : "text-[#6B7280] text-[14px]"} >Overview</Text>
                </Flex>
              </Tabs.Tab>
              <Tabs.Tab value="loan-decision">
              <Flex gap={5} align={"center"}>
                <LoanIcon fill={tab === "loan-decision" ? "#0C3932" :"#6B7280"} /> 
                <Text className ={tab === "loan-decision" ? "#0C3932  text-[14px]" :"#6B7280 text-[14px]"} >Loan Decision and Risk Analysis</Text>
              </Flex>  
              </Tabs.Tab>
              <Tabs.Tab value="transaction-breakdown">
              <Flex gap={5} align={"center"}>
                <TransactionIcon fill={tab === "transaction-breakdown" ? "#0C3932" :"#6B7280"} /> 
                <Text className ={tab === "transaction-breakdown" ? "#0C3932  text-[14px]" :"#6B7280  text-[14px]" } >Transaction Breakdown</Text>
              </Flex> 
              </Tabs.Tab>
            </Tabs.List>
            {/* tab === 'overview' */}
            {tab === "overview" &&
            
            <div className='bg-[#f3f4f6] p-1 rounded-[10px] '>
            <Transition
              mounted={tab === 'overview'}
              transition="fade-left"
              exitDuration={100}
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel style={styles} value={tab} className='overflow-y-auto w-full bg-whit rounded-[8px] '>
                  <Flex className='items-start flex-wrap gap-y-1 w-full justify-between bg-wh overflow-y-auto  rounded-[8px] '>
                  <Box className="w-[33%] ">
                    <OverviewCard loading={false} creditScore status='Moderate' creditScoreReport='A score of 600 indicates moderate creditworthiness. Scores above 700 are generally considered good; below 550 may be considered risky.' creditScoreTotal={800} creditScoreAmt={400} />
                  </Box>
                  <Box className="w-[33%] ">
                    <OverviewCard loading={false} transactionVolume transactionVolumeAmt='33,200,100' transactionCount={250} />
                  </Box>
                  <Box className="w-[33%] ">
                    <OverviewCard loading={false} bankStatmentCheck bankStatementCheckResult ="Bank statement passed our authenticity checks with a total score of 89%. (Low likelihood of tampering.)" fileName='d743af_Risk_Revamp_PRD' />
                  </Box>
                  <Box className='w-[33%] '>
                    <AuxillaryOverviewCard loading={false} keyFinancialMetrics monthlyExpense='200,000' monthlyIncome='1,900,000' netSurplusAmt='400,000' liability='3' />
                  </Box>
                  <Box className='w-[33%] '>
                    <AuxillaryOverviewCard loading={false} potentialRedFlags redFlags={["Repeated gambling transactions exceeding 20% of income.","Multiple bounced checks or overdrafts.","Consistently late repayments on other loans.", "Minor mismatch flagged for missing transactions, but not indicative of large-scale fraud"]} />
                  </Box>
                  <Box className='w-[33%] '>
                    <AuxillaryOverviewCard loading={false} creditWorthy creditWorthyStatus='Yes' creditWorthyReasons={["Stable monthly salary from Global Imports Ltd.","Positive net cash flow: ~₦600,000 surplus/month.","Mostly on-time payments (only 1 late in the last year)"]}  />
                  </Box>
                  </Flex>
                </Tabs.Panel>
              )}
            </Transition>
                  <Box className='w-[calc(100%-8px)]  bg-[#f9fafb] rounded-[8px] m-1 px-5 py-2 '>
                    <Text className='text-[#6B7280] '>Summary:</Text>
                    <Text className='text-[12px]'>Based on this applicant’s net surplus, we estimate they could comfortably repay up to ₦35,000,000 over a 2-year term.</Text>
                    <Text className='text-[12px] italic text-[#6B7280] '>For guidance only—final decision depends on your underwriting policy</Text>
                  </Box>
            </div>
            }
            {/* tab === 'loan-decision' */}
            {tab === "loan-decision" &&
            <div>

            <div className='bg-[#f3f4f6] p-1 rounded-[10px] '>
            <Transition
              mounted={tab === 'loan-decision'}
              transition="fade-left"
              exitDuration={100}
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel style={styles} value={tab}>
                  <Box className="  overflow-y-auto w-full border-x border-t border-[#E5E7EB] rounded-t-[8px]">
                    <Box className=' rounded-[8px]  '>
                      <Flex className='bg-[#F9FAFB] p-3 items-center justify-between rounded-t-[8px] '>
                        <Flex className='items-center gap-1'>
                          <IconTransaction />
                          <Text className='text-[14px] '>Loan History Data</Text>
                        </Flex>
                        <Flex justify={"space-between"} className="items-center gap-2 ">
                          <Flex className='w-fit border border-[#E4E6E6] rounded-[6px] py-1 px-2 items-center justify-center gap-1 '>
                            <Text className='text-primary text-[12px] font-[500] '>Source:</Text>               
                            <GlobeIcon />
                            <Text className='text-[12px] font-[500]'>Credit Bureau</Text>
                          </Flex>
                          <Box className='w-[1px] h-3 bg-[#E4E6E6] '></Box>
                           <UnstyledButton>
                                <IconDropDown
                                      className="rotate-180 transition-all"
                                />
                            </UnstyledButton>
                        </Flex>
                      </Flex>

                    </Box>
                  
                    <Tabs value={loanDecisionTab} onChange={handleTabChangeLoanDecisionTab} className='w-full pt-4 bg-white' >
                      <Tabs.List className='border-b border-b-[#E5E7EB] w-full flex justify-between '>
                        <Tabs.Tab value='all-loans'className='w-[25%] '>
                          <Flex className='flex-col items-center'>
                            <Text className='text-[14px] '>All loans</Text>
                            <Text className='text-[14px] text-[#9CA3AF] '>₦34,200,000</Text>
                          </Flex>
                        </Tabs.Tab>
                        <Tabs.Tab value='active-loans' className='w-[25%] '>
                          <Flex className='flex-col items-center'>
                            <Text className='text-[14px] '>Active Loans</Text>
                            <Text className='text-[14px] text-[#9CA3AF] '>₦34,200,000</Text>
                          </Flex>
                        </Tabs.Tab>
                        <Tabs.Tab value='outstanding-loans' className='w-[25%] '>
                          <Flex className='flex-col items-center'>
                            <Text className='text-[14px] '>Outstanding Loans</Text>
                            <Text className='text-[14px] text-[#9CA3AF] '>₦34,200,000</Text>
                          </Flex>
                        </Tabs.Tab>
                        <Tabs.Tab value='loan-defaults' className='w-[25%] '>
                          <Flex className='flex-col items-center'>
                            <Text className='text-[14px] '>Loan Defaults</Text>
                            <Text className='text-[14px] text-[#9CA3AF] '>₦34,200,000</Text>
                          </Flex>
                        </Tabs.Tab>
                      </Tabs.List>
                    </Tabs>
                  </Box>
                </Tabs.Panel>
              )}
            </Transition>
            
            
            <LoanDecisionTable />
            
            </div>
            </div>
            }
            {/* tab === 'transaction-breakdown' */}
            <Transition
              mounted={tab === 'transaction-breakdown'}
              transition="fade-left"
              exitDuration={100}
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel style={styles} value={tab}>
                  <Box className='bg-white'>
                    <Flex className="w-full justify-between mt-3 rounded-lg  bg-[#f3f4f6] p-1">
                      <CreditDebitCategoriesChart cardType='Credit' />
                      <CreditDebitCategoriesChart cardType='Debit' />
                    </Flex>
                    <Box className="w-full justify-between mt-3 rounded-lg bg-[#f3f4f6] p-1">
                    <Flex className='bg-[#F9FAFB] p-3 items-center justify-between rounded-t-[8px] '>
                        <Flex className='items-center gap-1'>
                          <IconTransaction />
                          <Text className='text-[14px] '>Transactions</Text>
                        </Flex>
                        <Flex className='gap-2 items-center'>
                        <Flex className='w-fit border border-[#E4E6E6] rounded-[6px] py-1 px-2 gap-2 items-center justify-center '>
                            <Text className='text-primary text-[12px] '>Source:</Text>
                            <PdfIcon width={10} height={10} />
                            <Text className='text-[12px] '>{truncateString("d743a7f_Risk_Revamp_PRD",15)} </Text>
                            <Box className='w-[1px] h-2 bg-[#E4E6E6] '></Box>
                            <DownloadIcon />
                        </Flex>
                        <Box className='w-[1px] h-2 bg-[#E4E6E6] '></Box>
                        <UnstyledButton className='rotate-180 '>
                          <IconDropDown />
                        </UnstyledButton>
                        </Flex>
                      </Flex>
                      <Box className='bg-white rounded-b-[8px] p-4'>
                        <Flex className='justify-between items-center '>
                          <Flex className='items-center gap-2  relative'>
                          <Box onClick={() => setShowCalendar(!showCalendar)} className="cursor-pointer border border-[#D2CFE2]  rounded-[6px] text-[12px] px-3 h-[26px] flex items-center gap-4">
                            <Flex className='items-center gap-1'>
                            <IconCalender width={12} height={12} />
                            {selectedDateRange[0] && selectedDateRange[1] ? (
                              <Flex className='items-center gap-2 '>
                                <p>{selectedDateRange[0].toLocaleDateString()} - {selectedDateRange[1].toLocaleDateString()}
                                </p>
                                <UnstyledButton onClick={() => setSelectedDateRange([null,null])}>
                                  <IconDelete />
                                </UnstyledButton>
                              </Flex>
                          ) : "Date Range"}
                            </Flex>
                            <IconDropDown />
                          </Box>
                          <button className="border border-[#D2CFE2] rounded-[6px] text-[12px] px-3 h-[26px] flex items-center gap-4">
                            <Flex className='items-center gap-1'>
                            <IconTransaction />
                            Transaction Type
                            </Flex>
                            <IconDropDown />
                          </button>
                          {showCalendar && <DatePicker
                                    mb={'md'}
                                    className='absolute left-0 top-8 rounded-[8px] border border-[#D2CFE2] bg-white z-[50] '
                                    type="range"
                                    allowSingleDateInRange
                                    value={selectedDateRange}
                                    onChange={handleDateChange}
                                  />}
                          </Flex>
                          <button onClick={() => router.back()} className="border border-[#D2CFE2] rounded-[6px] text-[12px] px-3 h-[26px] flex items-center gap-1">
                            <ExportIcon />
                            Export
                          </button>
                        </Flex>
                      <TransactionsBreakdowntable />
                      </Box>
                    </Box>
                  </Box>
                </Tabs.Panel>
              )}
            </Transition>
            {/* loanDecisionTab is active */}
         {tab === "loan-decision" && <div className='bg-[#f3f4f6] rounded-[8px] mt-5 p-1'>

            <Transition
              mounted={ tab === "loan-decision"}
              transition="fade-left"
              exitDuration={100}
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Tabs.Panel style={styles} value={tab} className='   '>
                  
                   <SpendingInsights />
                   <Flex className='w-full bg-white mt-2 rounded-[10px] items-start justify-between pt-4 px-2 '>
                    <Box className='w-[49%] bg-white '>
                    <Flex className='items-center gap-1'>
                                <Text className='text-[14px] '>Top Receiver</Text>
                                <Text className='italic text-[#6B7280] text-[14px] '> (Where money is coming from)</Text>
                    </Flex>
                      <ReceiverSenderTable userType='receiver' />
                    </Box>
                    <Box className='w-[49%] bg-white '>
                    <Flex className='items-center gap-1'>
                                <Text className='text-[14px] '>Top Sender</Text>
                                <Text className='italic text-[#6B7280] text-[14px] '> (Where money is going)</Text>
                    </Flex>
                      <ReceiverSenderTable userType='sender' />
                    </Box>
                   </Flex>
                </Tabs.Panel>
              )}
            </Transition>
          </div>}
          </Tabs>
      </Box>
      </Container>
    </div>
  )
}

export default CreditAnalysis