/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import { useMetricIcon } from '@/hooks/logic/use-metric-icon';
import { getCurrencySymbol } from '@/lib/helper';
import { InsightDetailsModel } from '@/types/general';
import { Box, Card, Flex, Text } from '@mantine/core';
import { FC } from 'react';

export const FinancialMetrics: FC<{
  project: any;
  onInsight?: (type: InsightDetailsModel) => void;
}> = ({ project }) => {
  const keyIndicator = project?.key_indicators?.indicators;

  const { getMetricIcon } = useMetricIcon();

  const getIndicator = () => {
    if (!keyIndicator) return [];

    return keyIndicator.filter((item: any) => {
      return (
        item?.metric === 'Benefit-Cost Ratio' ||
        item?.metric === 'Total Capital Expenditure' ||
        item?.metric === 'Payback Period'
      );
    });
  };

  if (keyIndicator) return (
    <>
      <Box className="gray-card-wrapper-dashboard flex-col">
        <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
          <Text className="gray-card-header-text capitalize">
            Financial Metrics
          </Text>
          <DashboardTooltip label={'Financial Metrics'} />
        </Flex>
        <Card className="gray-card-dashboard grid grid-cols-1 divide-solid p-0 sm:grid-cols-2 sm:divide-x md:grid-cols-3">
          {getIndicator().map((objIndictor: any, index: number) => {
            return (
              <Box key={index} className="p-[20px]">
                <Box className="mb-[14px] flex h-[30px] w-[30px] items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm">
                  {getMetricIcon(objIndictor?.metric)}
                </Box>
                <Text className="text-[14px] font-[350] leading-normal text-gray-600">
                  {objIndictor.metric}
                </Text>
                <Box className="font-lausanne text-[24px] font-semibold leading-[49px] text-gray-800 [leading-trim:both] [text-edge:cap]">
                  {objIndictor?.has_units ? (
                    <>
                      {objIndictor?.units
                        ?.toLocaleLowerCase()
                        .includes('year') ? (
                        <p>
                          {objIndictor?.value} <>{objIndictor?.units}</>
                        </p>
                      ) : (
                        <>
                          {getCurrencySymbol(objIndictor?.units as string)}{' '}
                          {objIndictor?.value}
                        </>
                      )}
                    </>
                  ) : (
                    <>{objIndictor?.value}</>
                  )}
                </Box>
              </Box>
            );
          })}
        </Card>
      </Box>
    </>
  );
};
