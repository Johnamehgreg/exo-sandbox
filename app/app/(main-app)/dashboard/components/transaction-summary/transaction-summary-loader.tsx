import { Grid, Skeleton } from '@mantine/core';

const TransactionSummaryLoader = () => {
  return (
    <Grid gutter="xs">
      {[...Array(4)].map((_, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
          <Skeleton height={176} radius="md" animate={true} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default TransactionSummaryLoader;
