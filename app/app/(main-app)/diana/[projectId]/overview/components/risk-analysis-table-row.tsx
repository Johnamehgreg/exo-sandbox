import { RiskBadge } from '@/components/diana/overview/risk-badge';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import { RiskItem } from '@/types/overview';
import { Text } from '@mantine/core';
import { RiskAnalysisScore } from './risk-analysis-score';

interface RiskTableRowProps {
  item: RiskItem;
  onClick?: (item: RiskItem) => void;
}

export const RiskAnalysisTableRow: React.FC<RiskTableRowProps> = ({
  item,
  onClick,
}) => {
  return (
    <tr
      className="group cursor-pointer bg-white transition-colors hover:bg-[#F0FDF499]"
      onClick={() => onClick?.(item)}
    >
      <td className="h-[56px] w-[221px] border-b border-l border-gray-100 px-4">
        <Text size="sm" className="font-medium capitalize">
          {item?.name}
        </Text>
      </td>
      <td className="h-[56px] w-[175px] border-b border-l border-gray-100 px-4">
        <RiskAnalysisScore status={item?.status} score={item?.score} />
      </td>
      <td className="flex h-[56px] items-center justify-between border-b border-l border-gray-100 px-4">
        <RiskBadge
          textClassName="!text-[14px]"
          riskLevel={item?.status}
          isDot
        />
        <IconArrowRightIos fill="#000" className="hidden group-hover:block" />
      </td>
    </tr>
  );
};
