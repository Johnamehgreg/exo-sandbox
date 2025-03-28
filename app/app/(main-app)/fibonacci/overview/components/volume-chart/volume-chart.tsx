import ChartSkeleton from '@/components/other/chart-skeleton';
import ReactApexChart from 'react-apexcharts';
import OverviewChartWrapper from '../overview-chart-wrapper';

type Props = {
  isLoading: boolean;
  chartKey: number;
  series: {
    name: string;
    data: (number | null)[];
  }[];
  options: ApexCharts.ApexOptions;
  chartData: unknown[];
};

const VolumeChart = ({
  isLoading,
  chartData,
  chartKey,
  series,
  options,
}: Props) => {
  if (isLoading) {
    return <ChartSkeleton />;
  }
  return (
    <OverviewChartWrapper isError={!chartData?.length}>
      <ReactApexChart
        key={chartKey}
        type="line"
        options={options}
        series={series}
        height={342}
      />
    </OverviewChartWrapper>
  );
};

export default VolumeChart;
