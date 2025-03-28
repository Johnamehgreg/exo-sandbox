import { memo } from "react";
import ReactApexChart from "react-apexcharts";
import ChartSkeleton from "@/components/other/chart-skeleton";
import TransactionsEmptyMessage from "../../../overview/components/transactions-empty-message";
import { ApexOptions } from "apexcharts";

interface Props {
  options: ApexOptions;
  series: {
    name: string;
    data: object[];
  }[];
  isLoading: boolean;
  yearFilter: string;
}

// Define the component as a named function
const RulesChartComponent = ({ options, series, isLoading, yearFilter }: Props) => {
  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (!series[0]?.data.length) {
    return (
      <TransactionsEmptyMessage
        height={300}
        text="No graph data available for the selected rule. Please try another rule or check back later."
      />
    );
  }

  return (
    <ReactApexChart
      key={yearFilter} // Force re-render on key change
      options={options}
      series={series as ApexOptions["series"]}
      type="line"
      height={350}
    />
  );
};

// Memoize the named component
const RulesChart = memo(RulesChartComponent);

export default RulesChart;