import { getRiskLevel } from '@/lib/helper';
import { IconChevronUp } from '@/public/assets/svg/icon-chevron-up';
import { Badge, Box, Flex, Text } from '@mantine/core';

interface Props {
  riskLevel: string;
  isDot?: boolean;
  textClassName?: string;
  rating?: string | number;
}
export const RiskBadge: React.FC<Props> = ({
  riskLevel,
  rating,
  isDot,
  textClassName,
}) => {
  return (
    <>
      {!rating && (
        <Badge
          className={`h-fit w-fit rounded-md border border-gray-200 px-[0.3rem] py-0.5 ${getRiskLevel(riskLevel).cardClassName}`}
          bg={getRiskLevel(riskLevel).hex}
        >
          <div className="flex items-center space-x-1">
            {isDot ? (
              <Box
                bg={getRiskLevel(riskLevel).color}
                className="relative h-2 w-2 rounded-[40px]"
              />
            ) : (
              <IconChevronUp
                fill={getRiskLevel(riskLevel).color}
                className={`${getRiskLevel(riskLevel).iconClass} size-[9.1px] transition`}
              />
            )}
            <span
              className={`text-[9.1px] font-medium capitalize ${getRiskLevel(riskLevel).textClassName} ${textClassName}`}
            >
              {riskLevel}
            </span>
          </div>
        </Badge>
      )}

      {rating && (
        <Flex
          className={`h-fit w-fit items-center divide-x-[1px] divide-gray-200 overflow-hidden rounded-md border border-gray-200 ${getRiskLevel(riskLevel).cardClassName} `}
        >
          <Text className="px-2.5 text-base font-medium leading-[18px] text-gray-600">
            {rating}/10
          </Text>
          <div
            className={`ml-1 flex h-full items-center px-2.5 ${getRiskLevel(riskLevel).secondCardClassName}`}
          >
            <Text
              className={`text-base font-medium capitalize ${getRiskLevel(riskLevel).textClassName} ${textClassName}`}
            >
              {riskLevel}
            </Text>
          </div>
        </Flex>
      )}
    </>
  );
};
