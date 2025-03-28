import { colors } from '@/lib/app-config';
import { IconGlobe } from '@/public/assets/svg/icon-globe';
import { IconMagicWand } from '@/public/assets/svg/icon-magic-wand';
import { InsightDetailsModel, TaxCreditModel } from '@/types/general';
import {
  Anchor,
  Box,
  Card,
  Flex,
  List,
  Popover,
  Table,
  Text,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import { FC } from 'react';
import { IconLink } from './icon-link';
import { TaxCreditsTable } from './tax-credits-table';
import { TaxCredits45YTable } from './tax-credits-y-table';

interface TaxCreditsProps {
  taxCredit: TaxCreditModel;
  onInsight?: (type: InsightDetailsModel) => void;
}

const scenarioList = [
  {
    context:
      'If domestic content increases to 100%, bonus credit could rise to 10% more, achieving 60% total.',
  },
  {
    context: 'Source remaining 25% of materials domestically.',
  },
];

export const TaxCredits: FC<TaxCreditsProps> = ({ taxCredit }) => {
  return (
    <Box className="gray-card-wrapper-dashboard flex-col">
      {/* header */}
      <Flex className="items-center justify-between gap-[4px] px-[8px] py-[12px]">
        <Flex className="flex-wrap items-center gap-[4px]">
          <Text className="gray-card-header-text capitalize">
            Best Case Tax Credit - {taxCredit?.tax_type}
          </Text>
        </Flex>
      </Flex>
      <Transition
        mounted={taxCredit?.tax_type === '48E'}
        transition="fade-left"
        duration={400}
        enterDelay={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Card
            style={styles}
            className="gray-card-dashboard mb-[10px] bg-transparent p-0"
          >
            <Table.ScrollContainer
              minWidth={'full'}
              className="overflow-hidden rounded-lg border-gray-200 px-0"
            >
              <TaxCreditsTable items={taxCredit} />
            </Table.ScrollContainer>
          </Card>
        )}
      </Transition>

      <Transition
        mounted={taxCredit?.tax_type === '45Y'}
        transition="fade-left"
        duration={400}
        enterDelay={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Card
            style={styles}
            className="gray-card-dashboard mb-[10px] bg-transparent p-0"
          >
            <Table.ScrollContainer
              minWidth={'full'}
              className="overflow-hidden rounded-lg border-gray-200 px-0"
            >
              <TaxCredits45YTable items={taxCredit} />
            </Table.ScrollContainer>
          </Card>
        )}
      </Transition>
      <Box className="p-[16px_8px]">
        <Flex className="gap-[10px]">
          <Box className="flex size-[30px] items-center justify-center rounded-full border border-gray-200 bg-white">
            <IconMagicWand />
          </Box>
          <Box className="flex-1 pt-[8px]">
            <Text className="mb-[11px] text-[14px] font-[450] leading-[18px] text-gray-800">
              Points to consider in maximizing credits
            </Text>
            <List
              className="mb-[10px]"
              withPadding={false}
              type="ordered"
              listStyleType="disc"
            >
              {scenarioList.map((item, index) => {
                return (
                  <List.Item key={index}>
                    <Text className="text-[14px] font-[350] leading-[18px] text-gray-600">
                      {item.context}
                    </Text>
                  </List.Item>
                );
              })}
            </List>

            <Popover
              transitionProps={{ transition: 'fade-up', duration: 300 }}
              width={251}
              arrowPosition="center"
              trapFocus
              position="top-start"
              withArrow
              shadow="xs"
            >
              <Popover.Target>
                <UnstyledButton className="mb-[36px] flex w-fit items-center gap-1 rounded-[6px] border-[1px] border-solid border-gray-300 bg-white p-[2px_8px]">
                  <IconGlobe className="size-[16px]" fill={colors.P1} />
                  <Text className="text-[14px] font-[500] text-p1">
                    IRS Guidelines
                  </Text>
                </UnstyledButton>
              </Popover.Target>
              <Popover.Dropdown className="bg-p1">
                <Text className="text-[12px] font-[550] text-white">
                  Emerging Markets Resilience
                </Text>
                <Text className="mb-[6px] line-clamp-3 text-[12px] font-[300] text-white">
                  Despite global economic slowdowns, emerging markets show a 7%
                  average growth in green energy investments, signaling
                  opportunities for ESG-focused portfolios.Despite global
                  economic slowdowns, emerging markets show a 7% average growth
                  in green energy investments, signaling opportunities for
                  ESG-focused portfolios.
                </Text>
                <Anchor
                  target="_blanks"
                  href="https://www.irs.gov/"
                  style={{ textDecoration: 'none' }}
                  className="flex w-fit items-center gap-1 border-x-0 border-b-[1px] border-t-0 border-solid border-b-palegreen text-[10px] text-palegreen !underline-offset-0"
                >
                  <IconLink />
                  https://www.irs.gov/
                </Anchor>
              </Popover.Dropdown>
            </Popover>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
