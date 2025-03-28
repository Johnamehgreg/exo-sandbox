import { Box, Container, SimpleGrid, Transition } from '@mantine/core';
import { PropsWithChildren } from 'react';

type Props = {
  animate: boolean;
};

const AuthLayoutContent = ({ animate, children }: PropsWithChildren<Props>) => {
  return (
    <Box className="h-[100vh] overflow-y-scroll bg-auth-background bg-cover bg-center bg-no-repeat  ">
      <Transition
        mounted={animate}
        transition="fade-left"
        duration={500}
        timingFunction="ease"
      >
        {(styles) => (
          <Container style={styles} size={'lg'} className="h-full w-full">
            <SimpleGrid
              cols={{
                base: 1,
                sm: 1,
              }}
              spacing={'3rem'}
              className="h-full"
            >
              {children}
            </SimpleGrid>
          </Container>
        )}
      </Transition>
    </Box>
  );
};

export default AuthLayoutContent;
