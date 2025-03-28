import { useQueryParams } from '@/hooks/logic/use-query-parems';
import { colors } from '@/lib/app-config';
import { SectionScrollModel } from '@/types/general';
import { Box, Card, Flex, Text, Transition } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { CustomTab } from './custom-tab';

interface Props {
  sectionList: SectionScrollModel[];
  scrollToSection?: (value: string) => void;
  value?: string;
  tabTitle?: string;
}
export const TabScrollIntoView: React.FC<Props> = ({
  scrollToSection,
  value,
  sectionList,
  tabTitle,
}) => {
  const { hovered, ref } = useHover();
  const { queryParams } = useQueryParams();
  const insight_tab = queryParams?.insight_tab;
  const tabList = sectionList?.map((item) => {
    return {
      label: item.label,
      value: item.id,
    };
  });

  if (!insight_tab)
    return (
      <Box
        ref={ref}
        className={`absolute left-10 top-[50px] z-[300] hidden cursor-pointer lg:block`}
      >
        <Box className="absolute top-[-10px]">
          <Transition
            mounted={hovered}
            transition="fade-right"
            duration={200}
            enterDelay={200}
            timingFunction="ease"
          >
            {(styles) => (
              <Box
                className="gray-card-dashboard w-[260px] overflow-hidden rounded-[8px] bg-gray-50"
                style={styles}
              >
                {tabTitle && (
                  <Flex className="px-[12px] py-[12px]">
                    <Text>{tabTitle}</Text>
                  </Flex>
                )}
                <Card className="rounded-t-none px-[12px] pb-[10px]">
                  <CustomTab
                    value={value}
                    activeIconColor={colors.vibrantgreen}
                    indicatorClassName="side-nav-link-btn"
                    activeClassNameText="text-vibrantgreen"
                    inactiveClassNameText="text-gray-600 font-[350] text-[14px]"
                    iconWrapperClassName=" h-[25px] z-20 sticky dashboard-gray-bg w-[25px]"
                    onChange={(value: string | ((val: string) => string)) => {
                      if (typeof value === 'string') {
                        scrollToSection?.(value);
                      }
                    }}
                    sectionList={tabList}
                  />
                </Card>
              </Box>
            )}
          </Transition>
        </Box>

        <Flex className="flex-col gap-[10px]">
          <Box className="h-[2px] w-[24px] bg-gray-600" />
          {tabList.map((i) => {
            return (
              <Box
                key={i.value}
                className={`transition-all ${
                  i.value === value
                    ? 'h-[4px] bg-vibrantgreen'
                    : 'h-[2px] bg-gray-600'
                } w-[12px]`}
              />
            );
          })}
        </Flex>
      </Box>
    );
};
