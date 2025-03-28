import { IconArrowDown } from '@/public/assets/svg/icon-arrow-down';
import { IconArrowUp } from '@/public/assets/svg/icon-arrow-up';
import { SortableHeaderProps } from '@/types/general';
import { Flex, Text, UnstyledButton } from '@mantine/core';

export const RiskAnalysisHeader: React.FC<SortableHeaderProps> = ({
  label,
  column,
  currentSort,
  onSort,
  textClassName,
  className,
  children,
  hideArrow,
  flexClassName,
}) => {
  const getSortIcon = () => {
    if (currentSort?.column !== column)
      return <IconArrowUp fill="#9CA3AF" className="size-[14px]" />;
    return currentSort?.direction === 'asc' ? (
      <IconArrowUp fill="#9CA3AF" className="size-[14px]" />
    ) : (
      <IconArrowDown fill="#9CA3AF" className="size-[14px]" />
    );
  };

  return (
    <th>
      <UnstyledButton
        onClick={() => onSort?.(column || 'component')}
        className={`flex h-[40px] w-full items-center px-4 py-3 text-gray-600 transition-colors hover:text-gray-900 ${className}`}
      >
        {children}
        <Flex className={`flex-1 items-center gap-2 ${flexClassName}`}>
          <Text
            className={`whitespace-pre-line text-[11px] font-medium ${textClassName}`}
          >
            {label}
          </Text>
          {!hideArrow && getSortIcon()}
        </Flex>
      </UnstyledButton>
    </th>
  );
};
