import { Box, Text, Transition } from '@mantine/core';

interface Props {
  error: string;
}
const ErrorCard: React.FC<Props> = ({ error }) => {
  return (
    <Transition
      mounted={error ? true : false}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Box
          mb={'md'}
          p={'xs'}
          className="rounded-[8px] bg-[#FAEBEA]"
          style={{
            ...styles,
          }}
        >
          <Text fz={'xs'} className="text-[var(--mantine-color-error-color-3)]">
            {error}
          </Text>
        </Box>
      )}
    </Transition>
  );
};

export default ErrorCard;
