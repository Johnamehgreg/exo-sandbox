'use client';
import { useSearchParams } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';
import { DashboardStickyHeader } from '../dashboard/dashboard-sticky-header';
import { InsightChatComponent } from '../other/insight-chat-component';

interface Props {
  showInsight?: boolean;
  pageTitle?: string;
  headerComponent?: ReactNode;
  selectedInsightComponent?: ReactNode;
  stat?: unknown;
  type?: 'diana' | 'fibonacci';
  showDownloadReport?: boolean;
  onCloseInsight?: () => void;
  selectedInsightDetail?: {
    insight?: string;
    title?: string;
  };
}
export const InsightWrapper = ({
  children,
  pageTitle,
  type,
  stat,
  headerComponent,
  showDownloadReport,
  selectedInsightDetail,
  selectedInsightComponent,
}: PropsWithChildren<Props>) => {
  const searchParams = useSearchParams();
  const insight_tab = searchParams.get('insight_tab') as string;
  const title = selectedInsightDetail?.title;

  if (insight_tab) {
    return (
      <>
        <DashboardStickyHeader
          subTitle={title}
          label={pageTitle}
          showDownloadReport={showDownloadReport}
        >
          {headerComponent}
        </DashboardStickyHeader>
        <InsightChatComponent
          topChildren={selectedInsightComponent}
          type={type}
          stat={stat}
          insight={selectedInsightDetail?.insight}
        />
      </>
    );
  }
  return (
    <>
      <DashboardStickyHeader label={pageTitle} showDownloadReport>
        {headerComponent}
      </DashboardStickyHeader>
      {children}
    </>
  );
};
