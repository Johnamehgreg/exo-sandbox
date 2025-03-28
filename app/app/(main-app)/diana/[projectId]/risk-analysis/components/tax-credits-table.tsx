'use client';

import { IconCheckCircle } from '@/public/assets/svg/icon-check-circle';
import { IconCloseSquare } from '@/public/assets/svg/icon-close-square';
import { TaxCreditModel } from '@/types/general';
import { Table, Text } from '@mantine/core';
import { FC, useMemo } from 'react';
import { RiskAnalysisHeader } from './risk-analysis-header';

interface TaxTableProps {
  items: TaxCreditModel;
}

interface HeaderConfig {
  flexClassName?: string;
  className: string;
  textClassName: string;
  label: string;
  column: string;
}

interface TaxCreditRow {
  component: string;
  taxCredit: string;
  eligibility: boolean;
  explanation: string;
}

export const TaxCreditsTable: FC<TaxTableProps> = ({ items }) => {
  // Define the table header configuration.
  const tableHeaders: HeaderConfig[] = useMemo(
    () => [
      {
        flexClassName: 'justify-between',
        className: 'w-[201px]',
        textClassName: 'uppercase text-gray-700',
        label: 'component',
        column: 'component',
      },
      {
        className: 'w-[115px]',
        textClassName: 'uppercase text-gray-700',
        label: 'Tax Credit',
        column: 'taxCredit',
      },
      {
        className: 'w-[162px]',
        textClassName: 'uppercase text-gray-700 flex-1',
        label: 'Eligibility',
        column: 'taxCredit',
      },
      {
        className: 'w-[250px]',
        textClassName: 'uppercase text-gray-700',
        label: 'Explanation',
        column: 'explanation',
      },
    ],
    []
  );

  // Build the rows for the tax credits table.
  const taxCreditRows: TaxCreditRow[] = useMemo(
    () => [
      {
        component: 'Base credit',
        taxCredit: '6',
        eligibility: items?.base_case,
        explanation:
          'Standard 48E credit for eligible solar and storage transactions.',
      },
      {
        component: 'Prevailing wage/\napprenticeship bonus',
        taxCredit: '+24',
        eligibility: items?.prvailing_wage,
        explanation:
          'All labor meets prevailing wage requirements and uses apprentices for 15% of labor hours.',
      },
      {
        component: 'Domestic credit bonus',
        taxCredit: '+10',
        eligibility: items?.domestic_content,
        explanation: '75% of materials sourced domestically.',
      },
      {
        component: 'Energy community bonus',
        taxCredit: '+10',
        eligibility: items?.energy_community,
        explanation:
          'Located in an energy community with significant fossil fuel industry closure.',
      },
    ],
    [items]
  );

  return (
    <Table className="px-1 !pb-0 shadow-sm" verticalSpacing="lg">
      <thead className="!pb-0">
        <tr className="bg-gray-50">
          {tableHeaders.map((header) => (
            <RiskAnalysisHeader
              key={header.label}
              flexClassName={header.flexClassName}
              textClassName={header.textClassName}
              label={header.label}
              className={header.className}
            />
          ))}
        </tr>
      </thead>
      <tbody className="!pb-0">
        {taxCreditRows.map((row, index) => (
          <tr
            key={index}
            className="min-h-[56px] cursor-pointer border-b border-gray-100 bg-white transition-colors hover:bg-[#F0FDF499]"
            onClick={() => {
              /* Optional onClick handler */
            }}
          >
            <td className="max-w-[284px] border-l border-gray-100 px-4 py-3">
              <Text className="whitespace-pre-line text-[14px] font-[350] capitalize leading-[18px] text-gray-800">
                {row.component}
              </Text>
            </td>
            <td className="border-l border-gray-100 px-4 py-3">
              <Text className="whitespace-pre-line text-[14px] font-[450] capitalize leading-[18px] text-gray-600">
                {row.taxCredit}%
              </Text>
            </td>
            <td className="border-l border-gray-100 px-4 py-3">
              {row.eligibility ? (
                <IconCheckCircle className="size-[20px]" />
              ) : (
                <IconCloseSquare className="size-[20px]" />
              )}
            </td>
            <td className="max-w-[284px] border-l border-gray-100 px-4 py-3">
              <Text className="whitespace-pre-line text-[14px] font-[300] capitalize leading-[18px] text-gray-600">
                {row.explanation}
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
