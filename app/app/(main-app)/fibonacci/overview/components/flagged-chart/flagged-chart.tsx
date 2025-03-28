import ChartSkeleton from '@/components/other/chart-skeleton';
import ReactApexChart from 'react-apexcharts';
import OverviewChartWrapper from '../overview-chart-wrapper';

type Props = {
  isLoading: boolean;
  chartKey: number;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  options: ApexCharts.ApexOptions;
  categories: unknown[];
};

const FlaggedChart = ({
  isLoading,
  chartKey,
  series,
  options,
  categories,
}: Props) => {
  if (isLoading) {
    return <ChartSkeleton />;
  }
  return (
    <OverviewChartWrapper isError={!(series?.length && categories?.length > 1)}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        key={chartKey}
        height={342}
      />
    </OverviewChartWrapper>
  );
};

export default FlaggedChart;
