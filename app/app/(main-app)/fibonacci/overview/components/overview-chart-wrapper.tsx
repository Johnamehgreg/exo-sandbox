import { Card } from '@mantine/core';
import { PropsWithChildren } from 'react';
import TransactionsEmptyMessage from './transactions-empty-message';

type Props = {
  isError?: boolean;
};

const OverviewChartWrapper = ({
  children,
  isError,
}: PropsWithChildren<Props>) => {
  return (
    <Card>
      {isError ? (
        <TransactionsEmptyMessage
          height={300}
          text="No graph data available for the selected period. Please try another period or check back later."
        />
      ) : (
        children
      )}
    </Card>
  );
};

export default OverviewChartWrapper;
