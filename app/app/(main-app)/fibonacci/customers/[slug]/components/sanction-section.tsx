import { PaginationCard } from '@/components/card/pagination-card';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useScreeningResults } from '@/hooks/query/use-screening-results';
import { Box, Container, ScrollArea, Stack, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { formatDate } from 'date-fns';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import SanctionDrawer from './sanction-drawer';
import SanctionEmptyState from './sanction-empty-state';

const tableHeadings = [
  'Screening Date',
  'Full Name',
  'Date of Birth',
  'Nationality',
  'Entity types',
  'Match Score',
  'Category',
];

const SanctionSection = () => {
  const { slug } = useParams();
  const { data, isLoading, updateQuery, query } = useScreeningResults(
    slug as string
  );

  const [resultID, setResultID] = useState('');

  const [opened, { open, close }] = useDisclosure(false);
  const handleOpenModal = useCallback(
    (id: string) => {
      setResultID(id);
      open();
    },
    [open]
  );

  const handlePageChange = (val: number) => {
    updateQuery('page', val);
  };

  const handlePageSizeChange = (page: number) => {
    updateQuery('page', 1);
    updateQuery('pageSize', page);
  };

  const rows = useMemo(() => {
    return (
      data?.data?.map((data, index) => (
        <Table.Tr
          key={`table-row-${index}`}
          onClick={() => handleOpenModal(data?._id)}
          className="cursor-pointer"
        >
          <Table.Td>
            <Text className="table-item-text table-item-padding">
              {formatDate(data?.screeningDate, 'dd/MM/yyyy')}
            </Text>
          </Table.Td>
          <Table.Td>
            <Text className="table-item-text table-item-padding capitalize">
              {data?.firstName?.toLowerCase()} {data?.lastName?.toLowerCase()}
            </Text>
          </Table.Td>
          <Table.Td>
            <Text className="table-item-text table-item-padding text-center">
              {data?.dob ? formatDate(data?.dob, 'MMM d, yyyy') : 'N/A'}
            </Text>
          </Table.Td>
          <Table.Td>
            <Text className="table-item-text table-item-padding">N/A</Text>
          </Table.Td>
          <Table.Td>
            <Text className="table-item-text table-item-padding">N/A</Text>
          </Table.Td>
          <Table.Td>
            <Text className="table-item-text table-item-padding">
              {data?.score}%
            </Text>
          </Table.Td>
          <Table.Td>
            <Text className="table-item-text table-item-padding">N/A</Text>
          </Table.Td>
        </Table.Tr>
      )) || []
    );
  }, [data?.data, handleOpenModal]);

  if (!data?.total && !isLoading) {
    return <SanctionEmptyState />;
  }
  return (
    <>
      <Container fluid>
        {resultID && <SanctionDrawer {...{ opened, close, resultID }} />}
        <ScrollArea h={'500px'} className="overflow-y-scroll">
          {isLoading ? (
            <Stack>
              <TableSkeleton row={10} col={4} />
            </Stack>
          ) : (
            <Box className="dashboard-border table-container">
              <Table
                className="!m-0"
                horizontalSpacing="sm"
                highlightOnHover
                verticalSpacing="xs"
              >
                <Table.Thead bg={'#F8FAFC'}>
                  <Table.Tr>
                    {tableHeadings?.map((heading, index) => (
                      <Table.Th key={`table-headings-${index}`}>
                        <Text className="table-head-text table-head-padding">
                          {heading}
                        </Text>
                      </Table.Th>
                    ))}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Box>
          )}
        </ScrollArea>
      </Container>

      <PaginationCard
        showPageItem
        onChange={handlePageChange}
        total={data?.total as number}
        page={query.page}
        setPageSize={handlePageSizeChange}
        pageSize={query.pageSize}
      />
    </>
  );
};

export default SanctionSection;
