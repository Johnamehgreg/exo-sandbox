/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconExport } from '@/public/assets/svg/icon-export';
import { IconFilter } from '@/public/assets/svg/icon-filter';
import { IconSearch } from '@/public/assets/svg/icon-search-icon';
import { Button, Flex, Group, TextInput } from '@mantine/core';

interface Props {
  filterChildren?: React.ReactNode;
  children?: React.ReactNode;
  hideFilter?: boolean;
  hideExport?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  onChangeSearchValue?: (value: string) => void;
  onFilterClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  downloadCSV?: VoidFunction;
  csvData?: any[];
  isPending?: boolean;
}

export const TableTopCard: React.FC<Props> = ({
  children,
  onChangeSearchValue,
  searchValue,
  hideFilter,
  searchPlaceholder,
  hideExport,
  csvData,
  onFilterClick,
  downloadCSV,
  isPending,
}) => {
  return (
    <Flex className="dashboard-border flex-wrap justify-between gap-4 !border-x-0 !border-t-0 px-[24px] py-[16px]">
      <TextInput
        value={searchValue}
        onChange={(event) => onChangeSearchValue?.(event.target.value)}
        className="w-full sm:w-[280px]"
        classNames={{
          input: '!rounded-[4px] !border-gray-200 placeholder:text-gray-500',
        }}
        leftSection={<IconSearch />}
        size="xs"
        placeholder={searchPlaceholder}
      />
      <Group>
        {!hideFilter && (
          <Button
            onClick={onFilterClick}
            leftSection={<IconFilter />}
            className="!text-[12px] font-medium"
            variant="default"
          >
            Filter
          </Button>
        )}
        {!hideExport && (
          <>
            {(csvData || []).length > 0 && (
              <Button
                onClick={downloadCSV}
                leftSection={<IconExport />}
                className="!text-[12px] font-medium"
                size="xs"
                variant="default"
                loading={isPending}
              >
                Export CSV
              </Button>
            )}
          </>
        )}
        {children}
      </Group>
    </Flex>
  );
};
