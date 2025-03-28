'use client';

import ResetPasswordContent from './reset-password-content';
import { useState } from 'react';
import { useAuth } from '@/hooks/mutate/use-auth';
import { useForm, yupResolver } from '@mantine/form';
import { resetPasswordSchema } from '@/lib/validator/auth';

export type ResetPasswordType = 'reset' | 'success';

type Props = {
  token: string;
};

const initialValues: { password: string; confirmPassword: string } = {
  password: '',
  confirmPassword: '',
};

const ResetPasswordClient = ({ token }: Props) => {
  const [tab, setTab] = useState<'reset' | 'success'>('reset');
  const [error, setError] = useState('');
  const { onResetPassword, isLoading } = useAuth();
  const form = useForm({
    initialValues,
    validate: yupResolver(resetPasswordSchema),
  });
  return (
    <ResetPasswordContent
      {...{
        token,
        tab,
        setTab,
        error,
        setError,
        isLoading,
        form,
        onResetPassword,
      }}
    />
  );
};

export default ResetPasswordClient;
