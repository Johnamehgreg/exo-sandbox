'use client';
import { PaginationCard } from '@/components/card/pagination-card';
import { TableTopCard } from '@/components/card/table-top-card';
import TableWrapper from '@/components/other/table-wrapper';
import { useGetSettingTeam } from '@/hooks/query/fibonacci-s-team';
import { TeamMemberModel } from '@/types/general';
import { Box, Button } from '@mantine/core';
import { useState } from 'react';
import { TeamFilterModal } from './team-filter-modal';
import { TeamFModal } from './team-modal';
import { TeamSettingTable } from './teams-table';

const TeamSection = () => {
  const [showEsModal, setShowEsModal] = useState(false);
  const { updateQuery, isLoading, query, teams, totalItem } =
    useGetSettingTeam();

  const [showFilter, setShowFilter] = useState(false);

  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberModel>(
    {}
  );
  const [isCreate, setIsCreate] = useState(false);

  const handleEditTeam = (team: TeamMemberModel) => {
    setSelectedTeamMember(team);
    setIsCreate(false);
    setShowEsModal(true);
  };

  return (
    <Box className="dashboard-border table-container">
      <TableTopCard
        hideFilter
        onFilterClick={() => setShowFilter(true)}
        onChangeSearchValue={(searchValue) => {
          updateQuery('search', searchValue);
        }}
        searchValue={query.search}
        searchPlaceholder="Search for a team member..."
        hideExport={true}
      >
        <Button
          onClick={() => {
            setShowEsModal(true);
            setSelectedTeamMember({});
            setIsCreate(true);
          }}
        >
          New Team member
        </Button>
      </TableTopCard>

      <TableWrapper
        data={teams}
        isLoading={isLoading}
        skeletonCol={4}
        skeletonRow={10}
        notFoundMessage="No team member found"
        table={(data) => (
          <TeamSettingTable onEdit={handleEditTeam} teams={data} />
        )}
      />

      <TeamFModal
        selectedTeamMember={selectedTeamMember}
        isCreate={isCreate}
        isVisible={showEsModal}
        onClose={() => {
          setShowEsModal(false);
          setIsCreate(false);
          setSelectedTeamMember({});
        }}
      />

      <TeamFilterModal
        updateQuery={updateQuery}
        isVisible={showFilter}
        onClose={() => setShowFilter(false)}
      />

      <PaginationCard
        total={totalItem}
        setPageSize={(page: number) => updateQuery('pageSize', page)}
        pageSize={query.pageSize}
      />
    </Box>
  );
};

export default TeamSection;
