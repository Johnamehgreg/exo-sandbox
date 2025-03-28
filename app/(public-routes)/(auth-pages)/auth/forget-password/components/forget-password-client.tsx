'use client';

import { useAuth } from '@/hooks/mutate/use-auth';
import { forgetPasswordSchema } from '@/lib/validator/auth';
import ForgetPasswordContent from './forget-password-content';

import { useForm, yupResolver } from '@mantine/form';
import { useState } from 'react';

const initialValues = {
  email: '',
};

const ForgetPasswordClient = () => {
  const [tab, setTab] = useState<'forget' | 'success'>('forget');
  const [error, setError] = useState('');

  const { onForgetPassword, isLoading } = useAuth();

  const form = useForm({
    initialValues,
    validate: yupResolver(forgetPasswordSchema),
  });
  return (
    <ForgetPasswordContent
      {...{ isLoading, form, onForgetPassword, error, setError, tab, setTab }}
    />
  );
};

export default ForgetPasswordClient;
