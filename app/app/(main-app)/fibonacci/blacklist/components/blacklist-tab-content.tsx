import { TableTopCard } from '@/components/card/table-top-card';
import TableWrapper from '@/components/other/table-wrapper';
import { useDownloadCsv } from '@/hooks/logic/use-download-csv';
import { QueryParams } from '@/hooks/query/blacklist';
import { IconUploadSimple } from '@/public/assets/svg/icon-upload-simple';
import { BlacklistModel, ExportCsvModel } from '@/types/general';
import { Box, Button, Tabs, Transition } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { BlackListTable } from './blacklist-table';
import { BlacklistTabsType, BlacklistType } from './extras';

type Props = {
  csvList?: BlacklistModel[];
  updateQuery: <K extends keyof QueryParams>(
    field: K,
    value: QueryParams[K]
  ) => void;
  currentTab: BlacklistTabsType;
  tab: BlacklistTabsType;
  onFilterClick: VoidFunction;
  handleOpenUploadBlackListModal: VoidFunction;
  data?: BlacklistModel[];
  refetch: VoidFunction;
  isLoading: boolean;
};

const exportTypeMapping: Record<BlacklistTabsType, ExportCsvModel['type']> = {
  [BlacklistType.Customers]: 'blacklisted-customer',
  [BlacklistType.Accounts]: 'blacklisted-accounts',
  [BlacklistType.Devices]: 'blacklisted-devices',
};

const BlacklistTabContent = ({
  csvList,
  updateQuery,
  currentTab,
  tab,
  onFilterClick,
  handleOpenUploadBlackListModal,
  data,
  isLoading,
  refetch,
}: Props) => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as BlacklistTabsType;

  const { isPending, downloadCSV } = useDownloadCsv({
    type: exportTypeMapping[tabParam as BlacklistTabsType],
  });

  return (
    <Transition
      mounted={currentTab == tab}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Tabs.Panel style={styles} value={tab} className="">
          <Box className="dashboard-border table-container bg-white">
            <TableTopCard
              hideFilter
              csvData={csvList}
              onChangeSearchValue={(searchValue) => {
                updateQuery('search', searchValue);
              }}
              searchPlaceholder="Search by ID, account name or city"
              onFilterClick={onFilterClick}
              downloadCSV={downloadCSV}
              isPending={isPending}
            >
              <Button
                onClick={handleOpenUploadBlackListModal}
                leftSection={<IconUploadSimple />}
                className="text-[14px] font-medium leading-6"
              >
                Upload Blacklist
              </Button>
            </TableTopCard>
            <TableWrapper
              data={data!}
              skeletonCol={6}
              skeletonRow={10}
              isLoading={isLoading}
              notFoundMessage="No blacklist found"
              table={(data) => (
                <BlackListTable refetch={refetch} blacklist={data} />
              )}
            />
          </Box>
        </Tabs.Panel>
      )}
    </Transition>
  );
};

export default BlacklistTabContent;
