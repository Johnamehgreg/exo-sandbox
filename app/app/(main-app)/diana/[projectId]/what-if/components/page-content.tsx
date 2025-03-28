'use client';

import { useUiStore } from '@/app/store/ui.store';
import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import { ErrorPageLayout } from '@/components/layout/error-page-layout';
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import MarkdownWithLatex from '@/components/other/mark-down-with-latex';
import { useWhatIfLogic } from '@/hooks/logic/use-what-if';
import { routes } from '@/lib/routes';
import { IconInfo } from '@/public/assets/svg/icon-info';
import { IconPercent } from '@/public/assets/svg/icon-percent';
import { MergeMetric, WhatIfModel } from '@/types/general';
import { Anchor, Box, Button, Card, Container, Flex, Group, NumberInput, Slider, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';
import { useCallback } from 'react';
import { CostBenefitComponent, HeaderSkeletonLoading, ScenarioComparisonTable, SkeletonLoading } from './extras';

const PageContent = () => {
  const {
    isLoading,
    mergeMetrics,
    taxValue,
    isFetching,
    isITC,
    tooltipLabel,
    sliderList,
    whatIfData,
    onTaxValueChange,
    maxRange,
    isError,
    refetch
  } = useWhatIfLogic();
  const router = useRouter()
  const { setDashboardType } = useUiStore();
  const getScale = useCallback((v: number) => {
    return !isITC ? v / 10 : v;
  }, [isITC]); // Dependency array includes `isITC`

  if (isError)
    return (
      <ErrorPageLayout
        title={'Well! This is embarrassing"'}
        message={
          <Text component="p" className="text-center whitespace-pre-line">
            {"Error fetching "}{" "}
            <Anchor href="mailto:support@exoai.tech" target="_blank">
              support@exoai.tech
            </Anchor>
          </Text>
        }
      >
        <Group className="gap-3">
          <Button loading={isFetching} onClick={refetch}>
            {isFetching ? "Fetching..." : "Retry"}
          </Button>

          <Button
            onClick={() => {
              setDashboardType("dashboard");
              router.push(routes.app.dashoard);
            }}
          >
            Home
          </Button>
        </Group>
      </ErrorPageLayout>
    )

  return (
    <>
      <DashboardStickyHeader
        label={"What If"}
        showDownloadReport={false}
      />
      <Container className="dashboard-container-wrapper pt-[40px] dashboard-wrapper-two">
        <Box className="flex-1 flex flex-col gap-[20px] w-full ">
          <Box>
            <Text className="justify-start text-gray-800 mb-[14px] text-lg font-twk leading-[18px]">What-If Scenario Explorer</Text>
            <Text className="self-stretch justify-start  text-gray-600 text-sm font-twk leading-[18px]">Analyze how changes in tax incentives impact your transaction&apos;s financial outcomes</Text>
          </Box>
          {
            isLoading ? <HeaderSkeletonLoading /> :
              <>
                <div className="self-stretch inline-flex flex-col justify-center items-start gap-[33px]">
                  <div className="w-[737.15px] h-0 outline outline-1 outline-offset-[-0.50px] outline-[#f2f4f4]" />
                  <div className="self-stretch flex flex-col justify-start items-start gap-[18px]">
                    <div className="self-stretch flex-col sm:flex-row inline-flex sm:justify-start sm:items-center gap-[19px]">
                      <div className="flex justify-start items-center gap-1">
                        <div className="justify-start text-gray-800 text-base font-normal font-twk leading-[14px]">What if the {isITC ? 'ITC' : 'PTC'} Eligibility is</div>
                      </div>
                      <div className="flex-1 flex-col sm:flex-row flex sm:justify-start sm:items-center gap-[19px]">
                        <div className="flex justify-start items-center gap-1">
                          <div className="w-fit p-0.5 rounded-lg inline-flex flex-col justify-start items-start gap-0.5 overflow-hidden">
                            <div className="self-stretch h-9 p-3 bg-white rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-between items-center overflow-hidden">
                              <NumberInput
                                hideControls
                                max={maxRange}
                                clampBehavior="strict"

                                placeholder="0"
                                size="xs"
                                prefix={!isITC ? "￠" : ''}
                                value={taxValue as number}
                                onChange={(e) => onTaxValueChange(Number(e))}
                                classNames={{
                                  input: `!h-9 border-none ${!isITC ? '!w-[142px]' : '!w-[20px]'}  !p-0 bg-transparent text-gray-800 text-sm font-semibold font-twk leading-normal`,
                                  section: 'min-w-[40px] bg-red-500'
                                }}
                              />
                              <Text className="justify-start text-gray-500 text-sm font-twk leading-normal"> {isITC ? <IconPercent /> : '/KWh'}</Text>
                            </div>
                          </div>
                          <Tooltip
                            withArrow
                            w={210}
                            multiline
                            transitionProps={{ transition: "fade-up", duration: 300 }}
                            classNames={{
                              tooltip: `p-[10px] bg-p1 rounded-[4px]  text-[#fafbfb] !text-[12px]  leading-[16px]   `,
                            }}
                            label={tooltipLabel}>
                            <UnstyledButton>
                              <IconInfo className="size-[14.63px]" />
                            </UnstyledButton>
                          </Tooltip>
                        </div>
                        <div className="w-0 h-3.5 outline hidden sm:block outline-1 outline-offset-[-0.50px] outline-gray-300" />
                        <Slider
                          scale={getScale}
                          className="w-full"
                          color="#111827"
                          size={'lg'}
                          value={isITC ? taxValue : taxValue * 10}
                          marks={sliderList}

                          onChange={(e) => {
                            if (!isITC)
                              return onTaxValueChange(Number(e) / 10)
                            onTaxValueChange(Number(e))
                          }}
                          classNames={{
                            thumb: 'border-[4px] border-p1 p-[3px] bg-palegreen',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start items-center gap-1">
                  <div className="w-fit flex items-center gap-2 min-h-[45px] relative bg-gradient-to-r from-white pr-4 to-gray-200 overflow-hidden">
                    <div className="w-4 h-4 relative bg-white rounded-[20px] overflow-hidden">
                      <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-[#0c3932] rounded-[20px]" />
                    </div>
                    <div className="flex justify-start items-center gap-[5px]">
                      <Text className="justify-start text-gray-500 text-sm font-normal font-twk leading-[14px]">Scenario A:</Text>
                      <Text className="justify-start"><span className="text-gray-800 text-sm font-semibold font-twk leading-[14px]">(Default at </span><span className="text-gray-800 text-sm font-semibold font-twk leading-[14px]">{isITC ? `${whatIfData?.default || 0} %` : `￠${whatIfData?.default || 0}/kWh`}</span>)</Text>
                    </div>
                  </div>
                  <div className="w-fit min-h-[45px] relative gap-[7px] pr-4 bg-gradient-to-r p-2 from-gray-200 to-white overflow-hidden flex items-center">
                    <div className="w-4 h-4 relative bg-white rounded-[20px] overflow-hidden">
                      <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-vibrantgreen rounded-[20px]" />
                    </div>
                    <div className="flex justify-start items-center gap-[5px]">
                      <Text className="justify-start text-gray-500 text-sm font-normal font-twk leading-[14px]">Scenario B:</Text>
                      <Text className="justify-start">
                        <span className="text-gray-800 text-sm font-semibold font-twk leading-[14px]">(Custom) when {isITC ? 'ITC' : 'PTC'} is </span>
                        {
                          isITC ? <>
                            <span className="text-gray-800 text-sm font-semibold font-twk leading-[14px]">{taxValue || 0}%</span></> :
                            <> <span className="text-gray-800 text-sm font-semibold font-twk leading-[14px]">￠</span>
                              <span className="text-gray-800 text-sm font-semibold font-twk leading-[14px]">{taxValue || 0}/kWh</span></>
                        }
                      </Text>
                    </div>
                  </div>
                </div>
              </>
          }
          {
            isFetching ?
              <SkeletonLoading /> :
              <>
                <Box className=" gray-card-wrapper-dashboard flex-col">
                  <Flex className=" h-[36px] px-[8px] gap-[4px] items-center">
                    <Text className="gray-card-header-text capitalize">
                      Scenario Comparison
                    </Text>
                  </Flex>
                  <Card className="self-stretch bg-white rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-center items-start overflow-hidden p-0">
                    <ScenarioComparisonTable isITC={isITC} metrics={mergeMetrics() as MergeMetric[]} />
                  </Card>
                  {
                    !isITC && (
                      <Flex className=" h-min-[36px] px-[8px] gap-[4px] items-center">
                        <DashboardTooltip label={"Capital expenditures "} />
                        <Text className="justify-start text-gray-800 text-[14px] font-twk leading-[18px]">Capital expenditures remain constant because the PTC doesn&apos;t affect upfront costs, only future cash flows.</Text>
                      </Flex>
                    )
                  }
                </Box>
                <CostBenefitComponent comparison_plot={whatIfData?.comparison_plot as WhatIfModel['comparison_plot']} />
                <Box className=" gray-card-wrapper-dashboard px-4  flex-col">
                  <div className="border-b-[1px] h-[42px] py-3 ">
                    <Text className="gray-card-header-text capitalize">Scenario Highlight</Text>
                  </div>
                  <Text
                    className={` markdown-format pt-[20px] pb-3`}
                  >
                    <MarkdownWithLatex
                      content={whatIfData?.insight as string}
                    />
                  </Text>
                </Box>
              </>
          }
        </Box>
      </Container>
    </>



  );
};

export default PageContent;
