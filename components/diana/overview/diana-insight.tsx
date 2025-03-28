import MarkdownWithLatex from '@/components/other/mark-down-with-latex';
import { ReadMoreText } from '@/components/other/read-more';
import { colors } from '@/lib/app-config';
import { IconMagicWand } from '@/public/assets/svg/icon-magic-wand';
import { IconMagicWandFill } from '@/public/assets/svg/icon-magic-wand-fill';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import { IconOutlineMessage } from '@/public/assets/svg/transaction/icon-outline-message';
import { InsightModel } from '@/types/general';
import { Box, Card, Divider, Flex, Text, UnstyledButton } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useState } from 'react';
import RiskRatingChart from './risk-chart';

interface Props {
  insight?: InsightModel[];
  onClick?: (label: string, title: string) => void;
  title?: string;
  label?: string;
}

export const DianaInsight: React.FC<Props> = ({
  onClick,
  title,
  label,
  insight,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const getInsightList = () => {
    if (!Array.isArray(insight) || insight.length === 0) return [];
    return insight.slice(0, isExpanded ? insight.length : 3);
  };
  const insightList = getInsightList();

  return (
    <Box className="px-[8px] py-[12px]">
      {insightList?.length > 0 && (
        <Box className="w-full transition-all duration-300">
          <Flex className="items-center px-3 py-[12px]">
            <Text className="text-[14px] font-[550] leading-normal text-gray-800">
              Highlights
            </Text>
          </Flex>
          <Divider className="border-gray-200" />
          <Flex className="gap-2">
            <Box>
              <Box className="mt-3 inline-flex size-[30px] flex-col items-center justify-center gap-2.5 rounded-[30px] border border-gray-200 bg-white">
                <IconMagicWand />
              </Box>
            </Box>
            <Flex className="flex-1 flex-col divide-y-[1px] divide-solid divide-gray-200">
              {insightList?.map((item, index) => {
                const showRating = item?.scoreDetail;
                return (
                  <Box
                    key={`${index}-${item?.title}`}
                    className="w-ful flex cursor-pointer items-center"
                    onClick={() => {
                      if (item?.scoreDetail) return;
                      onClick?.(item?.full_text, item?.title);
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set(
                        'insight_tab',
                        item?.title.toLowerCase().replace(/ /g, '_')
                      );
                      router.push(`?${params.toString()}`);
                    }}
                  >
                    <Box
                      className="flex w-full items-center gap-[6px] px-2 py-4"
                      key={item?.title}
                    >
                      <Box className="w-full !flex-1 self-stretch">
                        <Text className="text-[14px] font-normal leading-[18px] text-gray-800">
                          {item?.title}
                        </Text>
                        {item?.scoreDetail ? (
                          <ReadMoreText
                            textClassName="text-gray-600 my-[12px]  text-[14px] leading-[18px]"
                            maxLength={200}
                            text={item.summary}
                          />
                        ) : (
                          <Text className="my-[12px] text-[14px] leading-[18px] text-gray-600">
                            {item.summary}
                          </Text>
                        )}
                      </Box>
                      {!showRating && <IconArrowRightIos fill="#000" />}
                    </Box>
                    {showRating && (
                      <Flex>
                        <RiskRatingChart
                          size={150}
                          riskLevel={item?.scoreDetail?.riskLevel}
                          rating={`${item?.scoreDetail?.value}`}
                          maxRating={10}
                          title={item?.scoreDetail?.name?.replace(/_/g, ' ')}
                        />
                      </Flex>
                    )}
                  </Box>
                );
              })}
            </Flex>
          </Flex>

          {(insight || []).length > 3 && (
            <Box className="px-3">
              <UnstyledButton
                onClick={toggleExpand}
                className="mb-1 flex items-center gap-2 text-sm font-medium leading-5 text-vibrant-green"
              >
                {isExpanded ? 'Collapse View' : 'Show More'}
                <svg
                  className={`transition-transform ${!isExpanded ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M7.96403 4.50863L12.339 8.88363C12.4623 9.00691 12.5316 9.17412 12.5316 9.34847C12.5316 9.52282 12.4623 9.69003 12.339 9.81331C12.2157 9.9366 12.0485 10.0059 11.8742 10.0059C11.6998 10.0059 11.5326 9.9366 11.4093 9.81331L7.49973 5.90261L3.58903 9.81222C3.52798 9.87327 3.45551 9.92169 3.37576 9.95473C3.296 9.98776 3.21051 10.0048 3.12419 10.0048C3.03786 10.0048 2.95237 9.98776 2.87261 9.95473C2.79286 9.92169 2.72039 9.87327 2.65934 9.81222C2.5983 9.75118 2.54987 9.67871 2.51684 9.59895C2.4838 9.51919 2.4668 9.43371 2.4668 9.34738C2.4668 9.26105 2.4838 9.17556 2.51684 9.09581C2.54987 9.01605 2.5983 8.94358 2.65934 8.88253L7.03434 4.50753C7.09538 4.44643 7.16788 4.39797 7.24769 4.36494C7.3275 4.33191 7.41304 4.31496 7.49941 4.31506C7.58578 4.31516 7.67129 4.33231 7.75102 4.36553C7.83074 4.39875 7.90313 4.44738 7.96403 4.50863Z"
                    fill="#0CAE5C"
                  />
                </svg>
              </UnstyledButton>
            </Box>
          )}
        </Box>
      )}

      {label && (
        <Flex className="w-full gap-2 transition-all duration-300">
          <Box className="flex w-[50px] justify-center py-2 transition-all duration-300">
            <IconMagicWandFill className="scale-110" />
          </Box>
          <Card
            p={0}
            className="w-full overflow-hidden rounded-[8px] border-[1px] border-solid border-gray-300 transition-all duration-300"
          >
            <Box className="flex items-center gap-2 !border-l-[4px] !border-l-[var(--mantine-color-exo-brand-5)] px-[10px] py-[12px] transition-all duration-300">
              <Box className="flex-1">
                <Box className="markdown-format line-clamp-2 font-twk text-[13px] font-normal leading-[150%] transition-all duration-300">
                  <MarkdownWithLatex content={label as string} />
                </Box>
              </Box>
              <UnstyledButton
                onClick={() => {
                  onClick?.(label as string, '');
                  const params = new URLSearchParams(searchParams.toString());
                  params.set(
                    'insight_tab',
                    title?.toLowerCase()?.replace(/ /g, '_') as string
                  );
                  router.push(`?${params.toString()}`);
                }}
                className="hover-scale flex h-[24px] items-center justify-center gap-[4px] rounded-[4px] border-[1px] border-solid border-gray-300 px-[7px] text-[14px] text-[550] text-p1"
              >
                <IconOutlineMessage fill={colors.vibrantgreen} />
                <IconArrowRightIos fill={colors.vibrantgreen} />
              </UnstyledButton>
            </Box>
          </Card>
        </Flex>
      )}
    </Box>
  );
};
