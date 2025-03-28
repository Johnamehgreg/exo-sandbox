import DianaPageLoaderWrapper from '@/components/diana/diana-page-loader-wrapper';
import { InsightDetailsModel, SectionScrollModel } from '@/types/general';
import { Dispatch, ReactNode, SetStateAction } from 'react';

type Props = {
  isLoading: boolean;
  showInsight: boolean;
  setShowInsight: Dispatch<SetStateAction<boolean>>;
  sectionList: SectionScrollModel[];
  selectedInsightDetail: InsightDetailsModel;
  insightComponent: ReactNode;
};

const OverviewPagePureComponent = ({
  isLoading,
  showInsight,
  setShowInsight,
  sectionList,
  selectedInsightDetail,
  insightComponent,
}: Props) => {
  const handleCloseInsight = () => setShowInsight(false);

  return (
    <DianaPageLoaderWrapper
      pageTitle="Overview"
      tabTitle="Overview"
      {...{
        isLoading,
        showInsight,
        selectedInsightDetail,
        handleCloseInsight,
        sectionList,
        insightComponent,
      }}
    />
  );
};

export default OverviewPagePureComponent;
