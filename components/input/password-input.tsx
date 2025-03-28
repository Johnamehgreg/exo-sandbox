'use client';

import { PasswordInput, Text } from '@mantine/core';
import { FC } from 'react';

interface Props {
  label?: string;
  placeholder?: string;
  mb?: string | number;
}

export const PasswordInputCustom: FC<Props> = ({
  label,
  mb,
  placeholder,
  ...props
}) => {
  return (
    <PasswordInput
      {...props}
      classNames={{
        visibilityToggle: '!px-[1.3rem] mr-4',
      }}
      visibilityToggleIcon={({ reveal }) =>
        reveal ? (
          <Text
            fw={600}
            className="text-[var(--mantine-color-exo-brand-6)]"
            fz={'xs'}
          >
            Hide
          </Text>
        ) : (
          <Text
            fw={600}
            className="text-[var(--mantine-color-exo-brand-6)]"
            fz={'xs'}
          >
            Show
          </Text>
        )
      }
      placeholder={placeholder || 'hi@acmecorporation.com'}
      label={label || 'Password'}
      mb={mb || '2rem'}
    />
  );
};
