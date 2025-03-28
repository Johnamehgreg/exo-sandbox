'use client';

import { useGetOverview } from '@/hooks/query/diana-dashboard';
import { InsightDetailsModel, SectionScrollModel } from '@/types/general';
import { Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CriticalCovenants } from './critical-covenants';
import { FinancialMetrics } from './finacial-metric';
import OverviewPagePureComponent from './overview-page-pure-component';
import { PotentialScenariosCard } from './potential-scenarios-card';
import { ProjectFinancingStructure } from './project-financing-structure';
import { ProjectSummary } from './project-summary';
import { RiskAnalysisSummary } from './risk-analysis-summary';

const OverviewPageClient = () => {
  const [showInsight, setShowInsight] = useState(true);
  const { projectId } = useParams();
  const [sectionId, setSectionId] = useState('');

  const [selectedInsightDetail, setSelectedInsightDetail] =
    useState<InsightDetailsModel>({ insight: '', title: '' });
  const { finData, isLoading } = useGetOverview({
    project_id: projectId as string,
  });

  const projectOverview = finData?.overview?.overview;

  const sectionList: SectionScrollModel[] = useMemo(
    () => [
      {
        label: 'Overview',
        id: 'overview',
        component: (
          <>
            <Text className="mb-[16px] text-[20px] font-semibold">
              Transaction Overview and Underwriting
            </Text>
            <ProjectSummary
              onInsight={(insightDetail) => {
                setSelectedInsightDetail(insightDetail);
                setShowInsight(true);
                setSectionId('overview');
              }}
              project={projectOverview}
            />
          </>
        ),
      },
      {
        label: 'Financial Metrics',
        id: 'Financial_Metrics',
        component: (
          <FinancialMetrics
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onInsight={(insightDetail: any) => {
              setSelectedInsightDetail(insightDetail);
              setShowInsight(true);
              setSectionId('Financial_Metrics');
            }}
            project={projectOverview}
          />
        ),
      },
      {
        label: 'Overall Risk Analysis Summary',
        id: 'Risk_Analysis_Summary',
        insightComponent: (
          <RiskAnalysisSummary
            hideInsight
            onInsight={(insightDetail) => {
              setSelectedInsightDetail(insightDetail);
              setShowInsight(true);
              setSectionId('Risk_Analysis_Summary');
            }}
            project={projectOverview}
          />
        ),

        component: (
          <RiskAnalysisSummary
            onInsight={(insightDetail) => {
              setSelectedInsightDetail(insightDetail);
              setShowInsight(true);
              setSectionId('Risk_Analysis_Summary');
            }}
            project={projectOverview}
          />
        ),
      },
      {
        label: 'Recommended Tax Equity Structure',
        id: 'recommended_tax_equity_structure',
        component: (
          <ProjectFinancingStructure
            onInsight={(insightDetail) => {
              setSelectedInsightDetail(insightDetail);
              setShowInsight(true);
              setSectionId('recommended_tax_equity_structure');
            }}
            project={projectOverview}
          />
        ),
      },
      {
        label: 'Tax Equity Parameters',
        id: 'tax_equity_parameters',
        component: (
          <CriticalCovenants
            onInsight={(insightDetail) => {
              setSelectedInsightDetail(insightDetail);
              setShowInsight(true);
              setSectionId('tax_equity_parameters');
            }}
            project={projectOverview}
          />
        ),
        insightComponent: (
          <CriticalCovenants
            hideInsight
            onInsight={(insightDetail) => {
              setSelectedInsightDetail(insightDetail);
              setShowInsight(true);
              setSectionId('Critical_Covenants');
            }}
            project={projectOverview}
          />
        ),
      },
      {
        label: 'Explore Potential Scenarios',
        id: 'Explore_Potential_Scenarios',
        component: (
          <PotentialScenariosCard
            scenariosList={
              projectOverview?.scenario_recommendations as string[]
            }
            onItemClick={({ value }) => {
              setSelectedInsightDetail({
                title: 'Explore Potential Scenarios',
                insight: value,
              });
              setShowInsight(true);
              setSectionId('Explore_Potential_Scenarios');
            }}
          />
        ),
      },
    ],
    [projectOverview]
  );

  const selectedComponent = sectionList.find((item) => item.id === sectionId);
  return (
    <OverviewPagePureComponent
      insightComponent={selectedComponent?.insightComponent}
      {...{
        isLoading,
        sectionList,
        selectedInsightDetail,
        setShowInsight,
        showInsight,
      }} />
  );
};

export default OverviewPageClient;
