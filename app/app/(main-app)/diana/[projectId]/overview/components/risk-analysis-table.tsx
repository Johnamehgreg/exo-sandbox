import { useSortRiskAnalysis } from '@/hooks/logic/useSortRiskAnalysis';
import { routes } from '@/lib/routes';
import { RiskItem } from '@/types/overview';
import { Table } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { RiskAnalysisHeader } from './risk-analysis-header';
import { RiskAnalysisTableRow } from './risk-analysis-table-row';

interface RiskTableProps {
  items: RiskItem[];
}

export const RiskTable: React.FC<RiskTableProps> = ({ items }) => {
  const router = useRouter();
  const { projectId } = useParams();
  const { sortedItems, sortState, handleSort } = useSortRiskAnalysis(items);

  const handleNavigation = (route: string) => router.push(route);

  const handleClick = (item: RiskItem) => {
    switch (item.name) {
      case 'geospatial score':
        return handleNavigation(
          routes.diana.geospatialAnalysis(projectId as string)
        );
      case 'location score':
        return handleNavigation(
          routes.diana.geospatialAnalysis(projectId as string)
        );
      case 'natural hazard score':
        return handleNavigation(routes.diana.riskAnalysis(projectId as string));
      case 'regulatory score':
        return handleNavigation(routes.diana.riskAnalysis(projectId as string));
      case 'company financial score':
        return handleNavigation(
          routes.diana.financialAnalysis(projectId as string)
        );
      case 'operational score':
        return handleNavigation(
          routes.diana.operationalAnalysis(projectId as string)
        );
      case 'overall risk score':
        return handleNavigation(routes.diana.riskAnalysis(projectId as string));
      default:
        return null;
    }
  };
  return (
    <Table className="px-1 shadow-sm" verticalSpacing="sm">
      <thead>
        <tr className="text-sm">
          <RiskAnalysisHeader
            label="NAME"
            column="name"
            className="max-w-[221px]"
            currentSort={sortState}
            onSort={handleSort}
          />
          <RiskAnalysisHeader
            label="SCORE"
            column="score"
            className="max-w-[175px]"
            currentSort={sortState}
            onSort={handleSort}
          />
          <RiskAnalysisHeader
            label="STATUS"
            column="status"
            currentSort={sortState}
            onSort={handleSort}
          />
        </tr>
      </thead>
      <tbody>
        {sortedItems?.map((item) => (
          <RiskAnalysisTableRow
            key={item.name}
            onClick={(item) => {
              handleClick(item);
            }}
            item={item}
          />
        ))}
      </tbody>
    </Table>
  );
};
