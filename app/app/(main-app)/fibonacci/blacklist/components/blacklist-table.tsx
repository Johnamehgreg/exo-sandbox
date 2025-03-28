import { ActionModal } from '@/components/modal/action-modal';
import TableHeaderText from '@/components/other/table-header-text';
import TableItem from '@/components/other/table-item';
import { useBlacklist } from '@/hooks/mutate/use-blacklist';
import { routes } from '@/lib/routes';
import { IconVerticalStack } from '@/public/assets/svg/icon-vertical-stack';
import { BlacklistModel } from '@/types/general';
import { ActionIcon, Box, Flex, Menu, Table } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { format } from 'date-fns';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

import { useState } from 'react';

interface Props {
  blacklist: BlacklistModel[];
  refetch?: () => void;
}
export const BlackListTable: React.FC<Props> = ({ blacklist, refetch }) => {
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedId, setSelectedId] = useState('');
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const { onDeleteBlacklist, isLoading } = useBlacklist();
  const params = new URLSearchParams(searchParams);

  const isUser = tab === 'users';
  const isAccounts = tab === 'accounts';
  const isDevices = tab === 'devices';
  const rows = blacklist?.map((element) => (
    <Table.Tr
      className="cursor-pointer"
      onClick={() =>
        router.push(
          `${routes.fibonacci.blacklistDetail}/${element._id}?redirect=${pathname}?${params.toString()}${
            element.type ? `&type=${element.type}` : ''
          }`
        )
      }
      key={element._id}
    >
      <TableItem text={format(element?.createdAt || '', 'dd MMM, yyyy')} />
      <TableItem text={element._id} />
      {(isUser || isAccounts) && (
        <TableItem text={upperFirst(element?.accountType || element?.type)} />
      )}
      {isAccounts && <TableItem text={upperFirst(element?.account || '-')} />}

      {isUser && (
        <>
          <TableItem text={upperFirst(element?.state || '-')} />
          <TableItem text={upperFirst(element?.city || '-')} />
        </>
      )}
      {isDevices && (
        <>
          <TableItem text={upperFirst(element?.model || '-')} />
          <TableItem text={upperFirst(element?.manufacturer || '-')} />
          <TableItem text={upperFirst(element?.osName || '-')} />
          <TableItem text={upperFirst(element?.osVersion || '-')} />
        </>
      )}

      <Table.Td>
        <Flex className="justify-end">
          <Menu withArrow>
            <Menu.Target>
              <ActionIcon
                onClick={(e) => {
                  e.stopPropagation();
                }}
                bg={'transparent'}
              >
                <IconVerticalStack fill="#98A2B3" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDelete(true);
                  setSelectedId(element?._id);
                }}
                className="min-w-[130px] text-[12px] font-normal"
              >
                Remove from blacklist
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  if (blacklist?.length > 0)
    return (
      <Box className="overflow-x-auto">
        <Table
          // bg={'red'}
          className="!m-0"
          horizontalSpacing="sm"
          highlightOnHover
          verticalSpacing="xs"
        >
          <Table.Thead bg={'#F8FAFC'}>
            <Table.Tr>
              <TableHeaderText text="Date" />
              <TableHeaderText text="ID" />
              {isDevices && (
                <>
                  <TableHeaderText text="Model" />
                  <TableHeaderText text="Manufacturer" />
                  <TableHeaderText text="OS Name" />
                  <TableHeaderText text="OS Version" />
                </>
              )}

              {(isUser || isAccounts) && (
                <TableHeaderText text="Account type" />
              )}
              {isAccounts && <TableHeaderText text="Account" />}
              {isUser && (
                <>
                  <TableHeaderText text="State" />
                  <TableHeaderText text="City" />
                </>
              )}
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        <ActionModal
          isProcessing={isLoading}
          message="Removing a user from blacklist means the user can now complete transactions, anywhere and anytime"
          title="Are you sure you want to remove user from blacklist"
          onSubmit={() => {
            onDeleteBlacklist({
              id: selectedId,
              type: tab as string,
              cb() {
                refetch?.();
                setShowDelete(false);
                setSelectedId('');
              },
            });
          }}
          onClose={() => {
            setShowDelete(false);
          }}
          isVisible={showDelete}
        />
      </Box>
    );
};
