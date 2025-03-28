import { useRunCheck } from '@/hooks/mutate/use-run-check';
import { IconSlider } from '@/public/assets/svg/icon-slider';
import { Box, Button, Center, Flex, Text } from '@mantine/core';

const SanctionEmptyState = () => {
  const { mutate, isPending } = useRunCheck();
  const handleRunCheck = () => {
    mutate();
  };
  return (
    <Box className="rounded-lg border border-gray-300 bg-white py-10">
      <Center>
        <Flex className="flex-col items-center gap-y-4">
          <IconSlider />
          <Text className="text-base font-semibold leading-[14px] text-secondary">
            There’s nothing here, yet
          </Text>
          <Text className="w-[160px] text-center text-[11px] font-normal leading-normal text-[#9CA3AF]">
            Set up automated checks in settings or run checks manually
          </Text>
          <Button loading={isPending} onClick={handleRunCheck}>
            Run Check
          </Button>
        </Flex>
      </Center>
    </Box>
  );
};

export default SanctionEmptyState;
