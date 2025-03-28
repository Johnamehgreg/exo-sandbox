import { IconSuccess } from '@/public/icon/icon-success';
import { Avatar, Card, Center, Text, Transition } from '@mantine/core';
import React from 'react';
interface Props {
  isVisible: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}
export const AuthSuccess: React.FC<Props> = ({
  isVisible,
  title,
  description,
  children,
}) => {
  return (
    <Transition
      mounted={isVisible}
      transition="slide-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Card p={'2rem'} className="auth-small-card w-full" style={styles}>
          <Center mb={'md'}>
            <Avatar size={'lg'}>
              <IconSuccess style={{ transform: 'scale(1.4)' }} />
            </Avatar>
          </Center>
          <Text className="auth-text-header text-center">{title}</Text>
          <Center>
            <Text mb={'1.5rem'} className="auth-text-title w-[80%] text-center">
              {description}
            </Text>
          </Center>

          {children}
        </Card>
      )}
    </Transition>
  );
};
