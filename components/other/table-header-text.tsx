import { Flex, Table, Text } from '@mantine/core';

interface Props {
  text?: React.ReactNode;
  style?: React.CSSProperties;
  align?: 'flex-start' | 'center' | 'flex-end';
}

const TableHeaderText: React.FC<Props> = ({ text, align, style }) => {
  return (
    <Table.Th style={style}>
      <Flex className="table-item-padding w-full" align={align || 'flex-start'}>
        <Text className="table-head-text" lineClamp={1}>
          {text}
        </Text>
      </Flex>
    </Table.Th>
  );
};

export default TableHeaderText;
