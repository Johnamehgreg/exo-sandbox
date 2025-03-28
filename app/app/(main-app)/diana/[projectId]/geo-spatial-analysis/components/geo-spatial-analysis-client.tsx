'use client';

import DianaPageLoaderWrapper from '@/components/diana/diana-page-loader-wrapper';
import { DianaInsight } from '@/components/diana/overview/diana-insight';
import { RiskBadge } from '@/components/diana/overview/risk-badge';
import DashboardTooltip from '@/components/other/dashboard-tool-tip';
import { useGetGeoSpatialAnalysis } from '@/hooks/query/diana-dashboard';
import { getInsightScoreArray, getScoreArray } from '@/lib/helper';
import {
  InsightDetailsModel,
  InsightModel,
  ScoreObject,
  SectionScrollModel,
} from '@/types/general';
import {
  Box,
  Card,
  Flex,
  Image,
  SimpleGrid,
  Text
} from '@mantine/core';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ResponsiveContainer } from 'recharts';

const GeoSpatialAnalysisClient = () => {
  const { projectId } = useParams();
  const { isLoading, finData } = useGetGeoSpatialAnalysis({
    project_id: projectId as string,
  });


  const satellite_imagery =
    finData?.geospatial_analysis?.geospatial_analysis?.satellite_imagery;
  const [selectedInsightDetail, setSelectedInsightDetail] = useState<{
    insight: string;
    title: string;
  }>({ insight: '', title: '' });
  const [showInsight, setShowInsight] = useState(false);
  const [sectionId, setSectionId] = useState('');
  const overview = finData?.geospatial_analysis?.geospatial_analysis?.overview;

  const overviewScores = getScoreArray(overview?.scores as ScoreObject);
  const overviewInsight = overview?.insight;
  const overviewInsightList = getInsightScoreArray({
    insightList: overviewInsight,
    scoreList: overviewScores,
  });

  const handleInsight = (detail: InsightDetailsModel) => {
    setSelectedInsightDetail({
      insight: detail.insight,
      title: detail.title,
    });
    setShowInsight(true);
  };

  const handleCloseInsight = () => setShowInsight(false);

  const overviewComponent = (hideInsight?: boolean) => {
    return (
      <Box className="gray-card-wrapper-dashboard mb-[24px] flex-col">
        <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
          <Text className="gray-card-header-text">
            Macro & Regulatory Risk Evaluations
          </Text>
          <DashboardTooltip label="Macro & Regulatory Risk Evaluations" />
        </Flex>
        <SimpleGrid
          className="dashboard-white-card"
          spacing="1px"
          cols={{ base: 1, sm: 2 }}
        >
          {overviewInsightList?.map((top) => {
            const name = top?.scoreDetail?.name?.replace(/_/g, ' ');
            return (
              <Box key={top.title} className="w-full bg-white p-[20px]">
                <Box className="mb-[14px] inline-flex h-7 w-7 items-center justify-center gap-2.5 rounded-md border border-gray-300 bg-white p-0.5 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      opacity="0.2"
                      d="M13.5009 12.9993H2.50093C2.32548 12.9991 2.15316 12.9528 2.00129 12.8649C1.84941 12.7771 1.72332 12.6509 1.63567 12.4989C1.54802 12.3469 1.50191 12.1745 1.50195 11.9991C1.502 11.8236 1.5482 11.6513 1.63593 11.4993L7.13593 1.99931C7.22375 1.84748 7.34996 1.72141 7.5019 1.63377C7.65384 1.54613 7.82615 1.5 8.00155 1.5C8.17695 1.5 8.34927 1.54613 8.50121 1.63377C8.65314 1.72141 8.77936 1.84748 8.86718 1.99931L14.3672 11.4993C14.455 11.6513 14.5012 11.8238 14.5012 11.9994C14.5011 12.1749 14.4549 12.3474 14.3671 12.4994C14.2793 12.6514 14.1531 12.7777 14.001 12.8654C13.849 12.9532 13.6765 12.9993 13.5009 12.9993Z"
                      fill="#6B7280"
                    />
                    <path
                      d="M5.99909 13.0004C5.99909 13.133 5.94641 13.2602 5.85264 13.3539C5.75887 13.4477 5.6317 13.5004 5.49909 13.5004H2.49909C2.23586 13.5002 1.97731 13.4308 1.74941 13.2991C1.52151 13.1674 1.33228 12.978 1.20073 12.75C1.06919 12.522 0.99996 12.2634 1 12.0001C1.00004 11.7369 1.06935 11.4783 1.20096 11.2504L3.34409 7.54725L2.46596 7.78162C2.40235 7.79861 2.33602 7.80291 2.27075 7.79426C2.20548 7.78562 2.14256 7.7642 2.08556 7.73124C1.97046 7.66466 1.88652 7.55509 1.85221 7.42662C1.8179 7.29816 1.83602 7.16133 1.9026 7.04623C1.96918 6.93113 2.07875 6.84719 2.20721 6.81287L4.25534 6.26475C4.31878 6.24774 4.38496 6.2434 4.45008 6.25197C4.5152 6.26054 4.578 6.28187 4.63488 6.31472C4.69176 6.34757 4.74161 6.39131 4.78158 6.44343C4.82156 6.49555 4.85086 6.55504 4.86784 6.6185L5.41721 8.66662C5.43457 8.73036 5.43912 8.7969 5.4306 8.86241C5.42209 8.92791 5.40068 8.99108 5.36762 9.04827C5.33455 9.10545 5.29048 9.15551 5.23795 9.19557C5.18543 9.23562 5.12548 9.26487 5.06159 9.28162C5.01913 9.29268 4.97546 9.29835 4.93159 9.2985C4.82159 9.2984 4.71471 9.26202 4.62748 9.19502C4.54025 9.12802 4.47755 9.03412 4.44909 8.92787L4.21159 8.0435L2.06846 11.7504C2.02468 11.8262 2.00158 11.9122 2.00147 11.9998C2.00137 12.0873 2.02426 12.1734 2.06786 12.2493C2.11146 12.3253 2.17425 12.3884 2.24992 12.4325C2.3256 12.4765 2.41152 12.5 2.49909 12.5004H5.49909C5.6317 12.5004 5.75887 12.5531 5.85264 12.6468C5.94641 12.7406 5.99909 12.8678 5.99909 13.0004ZM14.7947 11.2504L13.3485 8.75037C13.2793 8.64154 13.1707 8.56365 13.0455 8.53297C12.9202 8.50229 12.7879 8.52119 12.6763 8.58573C12.5646 8.65027 12.4822 8.75545 12.4463 8.8793C12.4104 9.00316 12.4237 9.1361 12.4835 9.25037L13.9297 11.7504C13.9735 11.8262 13.9966 11.9122 13.9967 11.9998C13.9968 12.0873 13.9739 12.1734 13.9303 12.2493C13.8867 12.3253 13.8239 12.3884 13.7483 12.4325C13.6726 12.4765 13.5867 12.5 13.4991 12.5004H9.20596L9.85221 11.8541C9.94603 11.7604 9.99877 11.6332 9.99883 11.5006C9.99889 11.368 9.94626 11.2408 9.85252 11.1469C9.75879 11.0531 9.63162 11.0004 9.499 11.0003C9.36637 11.0003 9.23916 11.0529 9.14534 11.1466L7.64534 12.6466C7.59885 12.6931 7.56197 12.7482 7.53681 12.8089C7.51165 12.8696 7.49869 12.9347 7.49869 13.0004C7.49869 13.0661 7.51165 13.1311 7.53681 13.1918C7.56197 13.2525 7.59885 13.3077 7.64534 13.3541L9.14534 14.8541C9.19179 14.9005 9.24693 14.9373 9.30762 14.9625C9.3683 14.9876 9.43333 15.0005 9.499 15.0004C9.56466 15.0004 9.62968 14.9874 9.69034 14.9623C9.751 14.9371 9.80611 14.9003 9.85252 14.8538C9.89894 14.8074 9.93575 14.7522 9.96085 14.6915C9.98596 14.6309 9.99886 14.5658 9.99883 14.5002C9.9988 14.4345 9.98584 14.3695 9.96068 14.3088C9.93553 14.2481 9.89867 14.193 9.85221 14.1466L9.20596 13.5004H13.4991C13.7623 13.5002 14.0209 13.4308 14.2488 13.2991C14.4767 13.1674 14.6659 12.978 14.7974 12.75C14.929 12.522 14.9982 12.2634 14.9982 12.0001C14.9981 11.7369 14.9288 11.4783 14.7972 11.2504H14.7947ZM7.99909 2.00037C8.08696 1.99949 8.17346 2.02223 8.24954 2.06621C8.32562 2.11018 8.38849 2.17379 8.43159 2.25037L10.5747 5.9535L9.69471 5.71725C9.5682 5.68755 9.43509 5.70828 9.3236 5.77504C9.2121 5.8418 9.13098 5.94935 9.09742 6.0749C9.06386 6.20044 9.0805 6.33412 9.14381 6.44761C9.20712 6.5611 9.31213 6.64548 9.43659 6.68287L11.4853 7.23225C11.5276 7.24334 11.571 7.24901 11.6147 7.24912C11.7247 7.24902 11.8316 7.21265 11.9188 7.14565C12.0061 7.07864 12.0688 6.98475 12.0972 6.8785L12.6466 4.82912C12.6654 4.76514 12.6713 4.69803 12.6638 4.63174C12.6564 4.56546 12.6357 4.50133 12.6031 4.44316C12.5704 4.38498 12.5265 4.33392 12.4738 4.29298C12.4212 4.25204 12.3608 4.22206 12.2964 4.20479C12.232 4.18753 12.1647 4.18333 12.0987 4.19245C12.0326 4.20156 11.969 4.22381 11.9116 4.25788C11.8543 4.29194 11.8043 4.33714 11.7647 4.39081C11.7251 4.44448 11.6966 4.50553 11.681 4.57037L11.4435 5.456L9.29721 1.75037C9.16544 1.52277 8.97614 1.33382 8.7483 1.20246C8.52046 1.0711 8.26208 1.00195 7.99909 1.00195C7.73609 1.00195 7.47772 1.0711 7.24988 1.20246C7.02204 1.33382 6.83274 1.52277 6.70096 1.75037L5.25346 4.25037C5.19127 4.36491 5.17625 4.49919 5.21162 4.62463C5.24698 4.75007 5.32992 4.85675 5.44277 4.92194C5.55563 4.98712 5.68948 5.00567 5.8158 4.97362C5.94213 4.94158 6.05095 4.86147 6.11909 4.75037L7.56659 2.25037C7.60968 2.17379 7.67256 2.11018 7.74864 2.06621C7.82472 2.02223 7.91121 1.99949 7.99909 2.00037Z"
                      fill="#6B7280"
                    />
                  </svg>
                </Box>
                <Text className="dashboard-grid-header-text capitalize">
                  {name}
                </Text>
                <Flex className="items-center gap-2">
                  <span className="text-[19.5px] font-bold transition-opacity duration-500">
                    {top?.scoreDetail?.value.toFixed(1)}/10
                  </span>
                  <RiskBadge
                    isDot
                    riskLevel={top?.scoreDetail?.riskLevel as string}
                  />
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
        {!hideInsight && overviewInsightList?.length > 0 && (
          <DianaInsight
            title="Macro & Regulatory Risk Evaluations"
            onClick={(insight: string, title: string) => {
              handleInsight({ insight, title: title });
              setSectionId('overview');
            }}
            insight={overviewInsightList as InsightModel[]}
          />
        )}
      </Box>
    );
  };
  const satelliteComponent = (hideInsight?: boolean) => {
    return (
      <Box className="gray-card-wrapper-dashboard flex-col">
        <Flex className="items-center gap-[4px] px-[8px] py-[12px]">
          <Text className="gray-card-header-text">
            Satellite Imagery Analysis
          </Text>
          <DashboardTooltip label=" Satellite Imagery Analysis" />
        </Flex>
        <Card>
          <ResponsiveContainer width="100%" height={500}>
            <div className="h-full w-full">
              <Image
                loading="lazy"
                src={satellite_imagery?.image_url}
                className="h-full w-full rounded-[8px]"
                alt=""
              />
            </div>
          </ResponsiveContainer>
        </Card>
        {satellite_imagery?.description && !hideInsight && (
          <DianaInsight
            title="Satellite Imagery Analysis"
            onClick={(insight: string, title: string) => {
              setSelectedInsightDetail({
                insight: insight,
                title: title,
              });
              setShowInsight(true);
              setSectionId('Satellite Imagery Analysis');
            }}
            insight={satellite_imagery?.description as InsightModel[]}
          />
        )}
      </Box>
    );
  };



  const sectionList: SectionScrollModel[] = [
    {
      label: 'Overview',
      id: 'overview',
      component: <>{overviewComponent()}</>,
      insightComponent: overviewComponent(true),
    },
    {
      label: 'Satellite Imagery Analysis',
      id: 'Satellite Imagery Analysis',
      component: satelliteComponent(),
      insightComponent: satelliteComponent(true),
    },
  ];
  const selectedComponent = sectionList.find((item) => item.id === sectionId);

  return (
    <DianaPageLoaderWrapper
      pageTitle="Geospatial Analysis"
      tabTitle="Geospatial Analysis"
      insightComponent={selectedComponent?.insightComponent}
      isLoading={isLoading}
      selectedInsightDetail={selectedInsightDetail}
      showInsight={showInsight}
      sectionList={sectionList}
      handleCloseInsight={handleCloseInsight}
    />
  );
};

export default GeoSpatialAnalysisClient;
