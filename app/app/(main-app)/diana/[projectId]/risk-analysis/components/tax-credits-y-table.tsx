import { IconCheckCircle } from '@/public/assets/svg/icon-check-circle';
import { IconCloseSquare } from '@/public/assets/svg/icon-close-square';
import { TaxCreditModel } from '@/types/general';
import { Table, Text } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { useMemo } from 'react';
import { tableHeaderList } from './extras';
import { RiskAnalysisHeader } from './risk-analysis-header';

interface TaxTableProps {
  items: TaxCreditModel;
}

export const TaxCredits45YTable: React.FC<TaxTableProps> = ({ items }) => {
  const morkList = useMemo(
    () => [
      {
        component: 'Base credit',
        taxCredit: '$300,000',
        explanation: '$30/MWh × 10,000 MWh × 10 years.',
        eligibility: items?.base_case,
      },
      {
        component: 'Domestic content bonus',
        taxCredit: '$1,000,000',
        explanation: '$10/MWh × 10,000 MWh × 10 years (fully compliant).',
        eligibility: items?.prvailing_wage,
      },
      {
        component: 'Prevailing wage/\napprenticeship bonus',
        taxCredit: '$1,000,000',
        eligibility: items?.domestic_content,
        explanation: '$10/MWh × 10,000 MWh × 10 years (transaction eligible).',
      },

      {
        component: 'Energy community bonus',
        taxCredit: '$1,000,000',
        explanation: '$10/MWh × 10,000 MWh × 10 years (transaction eligible).',
        eligibility: items?.energy_community,
      },
    ],
    [items]
  );

  return (
    <Table className="px-1 !pb-0 shadow-sm" verticalSpacing="lg">
      <thead className="!pb-0">
        <tr className="bg-gray-50">
          {tableHeaderList.map((tableHeader) => {
            return (
              <RiskAnalysisHeader
                key={tableHeader.label}
                flexClassName={tableHeader.flexClassName}
                textClassName={tableHeader.textClassName}
                label={tableHeader.label}
                className={tableHeader.className}
              />
            );
          })}
        </tr>
      </thead>
      <tbody className="!pb-0">
        {morkList?.map((item, index) => (
          <tr
            key={`morkList-${index}`}
            className="min-h-[56px] cursor-pointer border-b border-gray-100 bg-white transition-colors hover:bg-[#F0FDF499]"
            onClick={() => { }}
          >
            <td className="max-w-[284px] border-l border-gray-100 px-4 py-3">
              <Text className="text-[14px] font-[350] capitalize leading-[18px] text-gray-800">
                {item.component}
              </Text>
            </td>
            <td className="border-l border-gray-100 px-4 py-3">
              <Text className="text-[14px] font-[450] capitalize leading-[18px] text-gray-600">
                {item.taxCredit}
              </Text>
            </td>
            <td className="border-l border-gray-100 px-4 py-3">
              {item.eligibility ? (
                <IconCheckCircle className="size-[20px]" />
              ) : (
                <IconCloseSquare className="size-[20px]" />
              )}
            </td>
            <td className="max-w-[284px] border-l border-gray-100 px-4 py-3">
              <Text className="text-[14px] font-[450] leading-[18px] text-gray-600">
                {upperFirst(item.explanation as string)}
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
