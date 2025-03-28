import { InsightDetailsModel, SectionScrollModel } from '@/types/general';
import { Box, Center, Loader, Paper } from '@mantine/core';
import { PropsWithChildren, ReactNode } from 'react';
import { InsightWrapper } from '../layout/insight-wrapper';
import { ScrollContainer } from '../other/scroll-container';

type Props = {
  isLoading: boolean;
  showInsight: boolean;
  handleCloseInsight: () => void;
  sectionList?: SectionScrollModel[];
  selectedInsightDetail: InsightDetailsModel;
  insightComponent: ReactNode;
  tabTitle?: string;
  pageTitle: string;
};

const DianaPageLoaderWrapper = ({
  isLoading,
  showInsight,
  handleCloseInsight,
  sectionList,
  selectedInsightDetail,
  insightComponent,
  children,
  tabTitle,
  pageTitle,
}: PropsWithChildren<Props>) => {
  return (
    <InsightWrapper
      selectedInsightComponent={insightComponent}
      selectedInsightDetail={selectedInsightDetail}
      showInsight={showInsight}
      pageTitle={pageTitle}
      showDownloadReport
      onCloseInsight={handleCloseInsight}
    >
      <Box className="relative">
        {isLoading ? (
          <Paper p="sm" h={'calc(100vh)'}>
            <Center style={{ height: '100%' }}>
              <Loader />
            </Center>
          </Paper>
        ) : (
          children || (
            <ScrollContainer tabTitle={tabTitle} sections={sectionList!} />
          )
        )}
      </Box>
    </InsightWrapper>
  );
};

export default DianaPageLoaderWrapper;
