import { formatNumber } from '@/lib/helper';
import { IconNotePad } from '@/public/assets/svg/icon-notepad';
import { IconWarningCircle } from '@/public/assets/svg/icon-warning-circle';
import { IconWarningRed } from '@/public/assets/svg/icon-warning-red';
import { GetFibonacciDashboardOverviewResponse } from '@/types/general';
import { ExoProductStatus } from '@/types/overview';
import { Box, Transition } from '@mantine/core';
import TransactionSummaryItem from './transaction-summary-item';
import TransactionSummaryLoader from './transaction-summary-loader';

type Props = {
  analytics?: GetFibonacciDashboardOverviewResponse['analytics'];
  isLoading: boolean;
};

const TransactionSummaryContent = ({ analytics, isLoading }: Props) => {
  return (
    <Box className="w-full">
      <Transition
        mounted={isLoading}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
            <TransactionSummaryLoader />
          </Box>
        )}
      </Transition>
      <Transition
        mounted={!isLoading}
        transition="fade-left"
        duration={400}
        timingFunction="ease"
        enterDelay={500}
      >
        {(styles) => (
          <Box
            style={styles}
            className="grid h-full w-full grid-cols-2 justify-end gap-2.5"
          >
            {analytics?.map((data, index) => (
              <TransactionSummaryItem
                key={index}
                description={data?.title}
                periodRange={data?.periodRange}
                percentage={data?.percentChange}
                margin={data?.isIncreasing}
                price={formatNumber(+data?.value)}
                type={
                  data?.isIncreasing
                    ? ExoProductStatus.BASE
                    : ExoProductStatus.DANGER
                }
                icon={
                  data?.title?.toLowerCase() ===
                  'total number of transactions anomalies detected' ? (
                    <IconNotePad />
                  ) : data?.isIncreasing ? (
                    <IconWarningCircle />
                  ) : (
                    <IconWarningRed />
                  )
                }
              />
            ))}
          </Box>
        )}
      </Transition>
    </Box>
  );
};

export default TransactionSummaryContent;
