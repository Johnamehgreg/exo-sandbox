'use client';

import { useAuth } from '@/hooks/mutate/use-auth';
import { signInSchema } from '@/lib/validator/auth';
import { FormLoginValue } from '@/types/auth';
import { useForm, yupResolver } from '@mantine/form';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import LoginContent from './login-content';

const initialValues: FormLoginValue = {
  email: '',
  password: '',
};

const LoginClient = () => {
  const searchParams = useSearchParams();
  const { isLoading, onLogin } = useAuth(searchParams);
  const [error, setError] = useState('');
  const form = useForm({
    initialValues,
    validate: yupResolver(signInSchema),
  });
  return <LoginContent {...{ isLoading, onLogin, form, error, setError }} />;
};

export default LoginClient;
