import { Box, Flex, Table } from '@mantine/core';

interface Props {
  text?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  align?: 'flex-start' | 'center' | 'flex-end';
}

const TableItem: React.FC<Props> = ({ text, style, children, align }) => {
  return (
    <Table.Td style={style}>
      <Flex className="table-item-padding w-full" align={align || 'flex-start'}>
        {children}
        <Box className="table-item-text">{text}</Box>
      </Flex>
    </Table.Td>
  );
};

export default TableItem;
