import { IconClockCountdown } from '@/public/assets/svg/icon-clock-countdown';
import { IconHandCoin } from '@/public/assets/svg/icon-hand-coin';
import { IconPercentage } from '@/public/assets/svg/icon-percentage';
import { IconReceipt } from '@/public/assets/svg/icon-receipt';
import { JSX } from 'react';

export const useMetricIcon = () => {
  const iconMap: { [key: string]: JSX.Element } = {
    net: <IconHandCoin />,
    benefit: <IconReceipt />,
    period: <IconClockCountdown />,
    overall: <IconHandCoin />,
    capital: <IconReceipt />,
    irr: <IconPercentage />,
    hours: <IconClockCountdown />,
  };

  const getMetricIcon = (metric: string) => {
    const lowerCaseMetric = metric.toLowerCase();
    for (const key in iconMap) {
      if (lowerCaseMetric.includes(key)) {
        return iconMap[key];
      }
    }
    return <IconHandCoin />;
  };

  return {
    getMetricIcon,
  };
};
