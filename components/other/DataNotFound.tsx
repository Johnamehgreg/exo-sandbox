import { Card, Text } from '@mantine/core';

interface Props {
  message?: string;
  className?: string;
}
const DataNotFound: React.FC<Props> = ({ message, className }) => {
  return (
    <Card className={`my-4 flex items-center justify-center ${className} `}>
      <Text className="font-bold">{message || 'No item found'}</Text>
    </Card>
  );
};

export default DataNotFound;
