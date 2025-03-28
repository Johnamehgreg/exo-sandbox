import { routes } from '@/lib/routes';
import { Button, Center, Flex, Text } from '@mantine/core';

type Props = {
  handleNavigation: (path: string) => void;
};

const NoProjects = ({ handleNavigation }: Props) => {
  return (
    <Center>
      <Flex className="flex-col gap-2 py-3">
        <Text>No Transaction</Text>
        <Button
          onClick={() => {
            handleNavigation(routes.diana.onboarding);
          }}
          size="xs"
          variant="default"
          className="flex w-full items-center justify-center gap-x-2 space-x-2 !border-gray-300 text-gray-800 shadow-sm"
        >
          {' '}
          Add New Transaction
        </Button>
      </Flex>
    </Center>
  );
};

export default NoProjects;
