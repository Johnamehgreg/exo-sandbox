import { formatLargeNumber, getCurrencySymbol } from '@/lib/helper';
import { IconArrowDown } from '@/public/assets/svg/icon-arrow-down';
import { IconArrowUp } from '@/public/assets/svg/icon-arrow-up';
import { IconArrowsLeftRight } from '@/public/assets/svg/icon-arrows-left-tight';
import { IconChartLineUp } from '@/public/assets/svg/icon-chart-line-up';
import { IconHandCoins } from '@/public/assets/svg/icon-hand-coins';
import { IconPercent } from '@/public/assets/svg/icon-percent';
import { IconShieldWarning } from '@/public/assets/svg/icon-shield-warning';
import { IconUserDuo } from '@/public/assets/svg/icon-user-duo';
import { IconWarningDaimond } from '@/public/assets/svg/icon-warning-daimond';
import { Box, Flex, Text } from '@mantine/core';
import { useMemo } from 'react';

type Props = {
  key?: string;
  title: string;
  currency?: string;
  percentChange?: string | undefined;
  hasUnit: boolean;
  showIcon?: boolean;
  amount: number | string;
  isIncreasing?: 'Positive' | 'Negative';
  className?: string;
  periodRange?: string;
};

const FraudulentTransaction = ({
  title,
  currency,
  percentChange,
  amount,
  hasUnit,
  isIncreasing,
  className,
  showIcon,
  periodRange,
}: Props) => {
  const titleIcon = useMemo(() => {
    switch (title.toLowerCase().trim()) {
      case 'total transaction value':
        return <IconHandCoins className="h-6 w-6" />;
      case 'total transaction volume':
        return <IconArrowsLeftRight className="h-6 w-6" />;
      case 'fraudulent transaction rate':
      case 'potential loss prevented':
        return <IconWarningDaimond className="h-6 w-6" />;
      case 'high risk transaction rate':
        return <IconShieldWarning className="h-6 w-6" />;
      case 'blacklisted rate':
        return <IconChartLineUp className="h-6 w-6" />;
      case 'transaction decline rate (false positives rate)':
        return <IconPercent className="h-6 w-6" />;
      case 'unique active customers':
        return <IconUserDuo className="h-6 w-6" />;
      default:
        return null;
    }
  }, [title]);

  return (
    <Box
      className={`relative w-full border-r border-gray-100 bg-white p-[20px] ${className}`}
    >
      <div className="mb-4 w-max rounded-lg border border-gray-300">
        {titleIcon && <div className="p-1">{titleIcon}</div>}
      </div>

      <Text className="dashboard-grid-header-text">{title}</Text>
      <Flex className="items-end gap-x-1">
        {hasUnit && (
          <Text className="dashboard-grid-sub-text uppercase">
            {getCurrencySymbol(currency as string)}
          </Text>
        )}
        <Text className="dashboard-grid-sub-text capitalize">
          {hasUnit || title.toLowerCase().trim() === 'total transaction volume'
            ? formatLargeNumber(+amount)
            : amount}
        </Text>
      </Flex>
      {percentChange && (
        <Flex className="gap-x-0.5">
          <Flex className="items-baseline gap-x-[2px]">
            {isIncreasing === 'Negative' && (
              <IconArrowDown className="h-3 w-3" />
            )}
            {isIncreasing === 'Positive' && <IconArrowUp className="h-3 w-3" />}
            <Text
              className={`${
                isIncreasing === 'Negative' ? 'text-danger' : 'text-green-700'
              } leading-[18px]" text-sm font-medium`}
            >
              {percentChange}{' '}
              <Text
                span
                className="text-sm font-[250] leading-normal text-gray-500"
              >
                vs {periodRange}
              </Text>
            </Text>
          </Flex>
        </Flex>
      )}
      {showIcon && (
        <Box className="absolute -bottom-1.5 -right-[7px] z-20">
          <svg
            width="13"
            height="12"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.25 0L7.87054 4.37946L12.25 6L7.87054 7.62054L6.25 12L4.62946 7.62054L0.25 6L4.62946 4.37946L6.25 0Z"
              fill="#D9D9D9"
            />
          </svg>
        </Box>
      )}
    </Box>
  );
};

export default FraudulentTransaction;
