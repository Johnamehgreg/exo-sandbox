'use client';

import { TableTopCard } from '@/components/card/table-top-card';
import TableWrapper from '@/components/other/table-wrapper';
import { useGetSettingRole } from '@/hooks/query/fibonacci-s-role';
import { SettingsFRoleModel } from '@/types/general';
import { Box, Button } from '@mantine/core';
import { useEffect, useState, useTransition } from 'react';
import { RoleFModal } from './role-modal';
import { RoleSettingTable } from './role-table';

const RoleSection = () => {
  const [showEsModal, setShowEsModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SettingsFRoleModel>({});
  const [isCreate, setIsCreate] = useState(false);
  const { isLoading, updateQuery, query, roles } = useGetSettingRole();
  const [, startTransition] = useTransition();

  const [roleList, setRoleList] = useState<SettingsFRoleModel[]>([]);

  useEffect(() => {
    if (roles) {
      setRoleList(roles);
    }
  }, [roles]);

  const handleSearch = (query: string) => {
    startTransition(() => {
      if (query.trim().length === 0) return setRoleList(roles);
      const filteredData = roles.filter((item) =>
        item?.name?.toLowerCase().includes(query?.toLowerCase())
      );
      setRoleList(filteredData);
    });
  };

  const handleEditRole = (role: SettingsFRoleModel) => {
    setIsCreate(false);
    setSelectedRole(role);
    setShowEsModal(true);
  };

  const handleCloseModal = () => {
    setShowEsModal(false);
    setIsCreate(false);
    setSelectedRole({});
  };
  return (
    <Box className="dashboard-border table-container">
      <TableTopCard
        onChangeSearchValue={(searchValue) => {
          handleSearch(searchValue);
          updateQuery('search', searchValue);
        }}
        searchValue={query.search}
        searchPlaceholder="Search by role"
        hideExport={true}
        hideFilter={true}
      >
        <Button
          onClick={() => {
            setIsCreate(true);
            setShowEsModal(true);
          }}
        >
          Create role
        </Button>
      </TableTopCard>
      <TableWrapper
        data={roleList}
        isLoading={isLoading}
        skeletonCol={4}
        skeletonRow={4}
        notFoundMessage="No role found"
        table={(data) => (
          <RoleSettingTable onEdit={handleEditRole} rolesList={data} />
        )}
      />

      <RoleFModal
        isCreate={isCreate}
        selectedRole={selectedRole}
        isVisible={showEsModal}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default RoleSection;
