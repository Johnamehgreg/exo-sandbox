/* eslint-disable @typescript-eslint/no-explicit-any */
import RiskRatingChart from '@/components/diana/overview/risk-chart';
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import { useQueryParams } from '@/hooks/logic/use-query-parems';
import { colors } from '@/lib/app-config';
import { getDuration } from '@/lib/helper';
import IconDurationDate from '@/public/assets/svg/icon-duration-date';
import IconEqualizer from '@/public/assets/svg/icon-equalizer';
import { IconLeaf } from '@/public/assets/svg/icon-leaf';
import IconMapPinLine from '@/public/assets/svg/icon-map-pin-line';
import IconPackage from '@/public/assets/svg/icon-package';
import { IconPercentage } from '@/public/assets/svg/icon-percentage';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import { InsightDetailsModel } from '@/types/general';
import {
  Box,
  Card,
  Flex,
  Image,
  Popover,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { FC } from 'react';

export const ProjectSummary: FC<{
  project: any;
  onInsight?: (type: InsightDetailsModel) => void;
}> = ({ project }) => {
  const projectDetails = project?.project_details;
  const size = projectDetails?.size;

  const { setQueryParams } = useQueryParams();

  const getCapacity = () => {
    if (size)
      return size
        ?.map((sizeItem: any, index: number) => {
          const lastItem = index + 1 === size.length;
          return `${sizeItem?.value} ${sizeItem?.unit}
         ${sizeItem?.asset === 'Storage' ? 'Battery' : sizeItem?.asset}
         ${lastItem ? ' ' : ', '}`;
        })
        .join('');

    return '';
  };

  const riskSummary = () => {
    return {
      risk: parseFloat(
        project?.project_overview_and_underwriting?.risk_analysis
          ?.overall_risk_score[0]
      ).toFixed(2),
      riskText:
        project?.project_overview_and_underwriting?.risk_analysis
          ?.overall_risk_score[1] || 'Low',
    };
  };
  const list = [
    {
      label: 'Project Type',
      value: projectDetails?.project_type,
      icon: <IconPackage />,
    },
    {
      label: 'Location',
      value: projectDetails?.location,
      icon: <IconMapPinLine />,
    },
    {
      label: 'Capacity',
      value: getCapacity(),
      icon: <IconEqualizer />,
    },
    {
      label: 'Duration',
      value: getDuration({
        startDate: projectDetails?.start_date as string,
        endDate: projectDetails?.end_date as string,
      }),
      icon: <IconDurationDate />,
    },
    {
      label: 'Tax Credit',
      value: (
        <Flex>
          <Popover
            transitionProps={{ transition: 'fade-up', duration: 300 }}
            width={251}
            arrowPosition="center"
            trapFocus
            zIndex={5}
            position="top"
            withArrow
            shadow="xs"
          >
            <Popover.Target>
              <UnstyledButton className="flex w-fit items-center gap-[2px] rounded-[30px] bg-gray-100 px-[4px] py-[2px]">
                <IconLeaf />
                <Text className="text-[14px] font-[450] text-vibrantgreen">
                  45Y Eligible
                </Text>
              </UnstyledButton>
            </Popover.Target>
            <Popover.Dropdown className="!z-10 bg-p1 p-[10px]">
              <Text className="mb-[15px] text-[12px] font-[550] leading-[16px] text-[#FAFBFB]">
                45Y + Bonuses
                <br />
                (Clean Electricity Production Tax Credit)
              </Text>
              <Text className="mb-[5px] text-[12px] font-[350] leading-[16px] text-gray-300">
                Best Case Provides
              </Text>
              <Text className="mb-[15px] text-[12px] font-[550] leading-[16px] text-[#FAFBFB]">
                $5,000,000 over 10years
              </Text>
              <UnstyledButton
                onClick={() => {
                  setQueryParams(
                    {
                      diana_tab: 'risk-analysis',
                    },
                    'Tax_Credit'
                  );
                }}
                className="flex items-center text-[10px] font-[550] text-palegreen"
              >
                Details
                <IconArrowRightIos
                  fill={colors.palegreen}
                  className="size-[12px] fill-palegreen"
                />
              </UnstyledButton>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      ),
      icon: <IconPercentage className="size-[16px]" />,
    },
  ];

  return (
    <>
      <Box className="gray-card-wrapper-dashboard flex-col">
        <Flex className="items-center justify-between px-[8px]">
          <Flex className="items-center gap-[4px] py-[12px]">
            <Text className="gray-card-header-text capitalize">
              Transaction {projectDetails?.project_name}
            </Text>
            <DashboardTooltip
              label={projectDetails?.project_name || 'Project Name'}
            />
          </Flex>
          {projectDetails?.start_date && <p className="text-[12px] font-normal leading-[24px] text-gray-500">
            Start Date:
            <span className="text-primary"> { projectDetails?.start_date}</span>
          </p>}
        </Flex>
        <Card className="gray-card-dashboard !p-0">
          {' '}
          <Flex className="flex-col divide-x-[1px] divide-gray-100 py-[10px] sm:flex-row">
            <div className="flex w-full flex-col divide-y divide-solid divide-gray-100 pl-[20px]">
              {list?.map((item) => (
                <Flex className="items-center py-5 pr-[20px]" key={item?.label}>
                  <Flex className="w-[130px] items-center gap-[4px]">
                    {'src' in item.icon ? (
                      <Image className="w-[28px]" alt="" src={item?.icon} />
                    ) : (
                      item?.icon
                    )}
                    <Text className="text-[14px] font-[350] leading-normal text-gray-600">
                      {item?.label}
                    </Text>
                  </Flex>
                  <Box className="w-full flex-1">
                    <Box className="text-[14px] font-[450] leading-normal text-gray-800">
                      {item?.value}
                    </Box>
                  </Box>
                </Flex>
              ))}
            </div>

            <Flex className="flex flex-col items-center justify-center px-[20px]">
              <RiskRatingChart
                size={180}
                riskLevel={riskSummary().riskText}
                rating={riskSummary().risk}
                maxRating={10}
              />
              <Text className="mt-[-20px] text-[14px] text-gray-800">
                Risk Summary
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </>
  );
};
