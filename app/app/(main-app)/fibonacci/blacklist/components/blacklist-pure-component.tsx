import { PaginationCard } from '@/components/card/pagination-card';
import { DashboardStickyHeader } from '@/components/dashboard/dashboard-sticky-header';
import { QueryParams } from '@/hooks/query/blacklist';
import { BlacklistModel } from '@/types/general';
import { Box, Container, Tabs } from '@mantine/core';
import { Session } from 'next-auth';
import { Dispatch, SetStateAction } from 'react';
import { BlackListFilterModal } from './blacklist-filter-modal';
import BlacklistTabContent from './blacklist-tab-content';
import {
    blacklistTabList,
    BlacklistTabsType,
    BlacklistType,
} from './extras';
import UploadBlacklistModal from './upload-blacklist';


type Props = {
    activeTab: BlacklistTabsType;
    handleTabChange: (e: string | null) => void;
    isLoading: boolean;
    handleOpenUploadBlackListModal: VoidFunction;
    onFilterClick: VoidFunction;
    refetch: VoidFunction;
    updateQuery: <K extends keyof QueryParams>(
        field: K,
        value: QueryParams[K]
    ) => void;
    blacklists: BlacklistModel[];
    csvList: BlacklistModel[];
    handlePaginationChange: (val: number) => void;
    setShowFilter: Dispatch<SetStateAction<boolean>>;
    showFilter: boolean;
    totalItem: number;
    query: QueryParams;
    session: Session | null

}

const BlacklistPureComponent = ({
    activeTab,
    handleTabChange,
    isLoading,
    handleOpenUploadBlackListModal,
    onFilterClick,
    refetch,
    updateQuery,
    blacklists,
    handlePaginationChange,
    setShowFilter,
    showFilter,
    totalItem,
    query,
    csvList,
    session
}: Props) => {

    return (
        <>
            <UploadBlacklistModal {...{ refetch, session }} />
            <DashboardStickyHeader label="Blacklist" />
            <Container fluid className="dashboard-container-wrapper">
                <Box>
                    <Tabs
                        classNames={{
                            list: 'tab-list-style',
                        }}
                        value={activeTab}
                        onChange={handleTabChange}
                    >
                        <Tabs.List mb={'1.5rem'}>
                            {blacklistTabList.map((tab, index) => (
                                <Tabs.Tab key={`blacklistTabList-${index}`} value={tab.value}>
                                    {tab.label}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                        <BlacklistTabContent
                            currentTab={activeTab}
                            isLoading={isLoading}
                            handleOpenUploadBlackListModal={handleOpenUploadBlackListModal}
                            onFilterClick={onFilterClick}
                            refetch={refetch}
                            updateQuery={updateQuery}
                            tab={BlacklistType.Customers}
                            csvList={csvList}
                            data={blacklists}

                        />
                        <BlacklistTabContent
                            currentTab={activeTab}
                            isLoading={isLoading}
                            handleOpenUploadBlackListModal={handleOpenUploadBlackListModal}
                            onFilterClick={onFilterClick}
                            refetch={refetch}
                            updateQuery={updateQuery}
                            tab={BlacklistType.Devices}
                            csvList={csvList}
                            data={blacklists}

                        />
                        <BlacklistTabContent
                            currentTab={activeTab}
                            isLoading={isLoading}
                            handleOpenUploadBlackListModal={handleOpenUploadBlackListModal}
                            onFilterClick={onFilterClick}
                            refetch={refetch}
                            updateQuery={updateQuery}
                            tab={BlacklistType.Accounts}
                            csvList={csvList}
                            data={blacklists}

                        />
                    </Tabs>
                </Box>

                {
                    blacklists?.length && !isLoading ? <PaginationCard
                        showPageItem
                        onChange={handlePaginationChange}
                        total={totalItem}
                        page={query.page}
                        setPageSize={(page: number) => {
                            updateQuery('page', 1);
                            updateQuery('pageSize', page);
                        }}
                        pageSize={query.pageSize}
                    /> : null
                }

            </Container>
            <BlackListFilterModal
                isVisible={showFilter}
                onClose={() => setShowFilter(false)}
            />
        </>
    )
}

export default BlacklistPureComponent