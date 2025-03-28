import { AuthSuccess } from '@/components/card/auth-succes';
import ErrorCard from '@/components/card/error-card';
import { routes } from '@/lib/routes';
import { CompanyLogo } from '@/public/icon/company-logo';
import { Button, Card, Center, Flex, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isLoading: boolean;
  form: UseFormReturnType<{ email: string }>;
  onForgetPassword: (arg0: {
    values: { email: string };
    successCallBack: () => void;
    errorCallBack: (e: string) => void;
  }) => void;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  tab: string;
  setTab: Dispatch<SetStateAction<'forget' | 'success'>>;
};

const ForgetPasswordContent = ({
  isLoading,
  form,
  onForgetPassword,
  error,
  setError,
  tab,
  setTab,
}: Props) => {
  return (
    <Flex justify={'center'} direction={'column'} w={'100%'}>
      <Center mb={'md'}>
        <CompanyLogo />
      </Center>
      {tab === 'forget' && (
        <form
          className="flex w-full justify-center"
          onSubmit={form.onSubmit((value) =>
            onForgetPassword({
              values: value,
              successCallBack: () => setTab('success'),
              errorCallBack: (e) => {
                setError(e);
              },
            })
          )}
          style={{ position: 'relative' }}
        >
          <Card className="auth-small-card">
            <Text className="auth-text-header">Forgot your password?</Text>
            <Text component="p" className="auth-text-title">
              Enter your Email address and we will send you instructions on how
              to reset your password.
            </Text>

            <ErrorCard error={error} />
            <TextInput
              {...form.getInputProps('email')}
              placeholder="Acme corporation"
              label="Email address"
              mb={'lg'}
            />
            <Button
              loading={isLoading}
              type="submit"
              size="md"
              mb={'lg'}
              w={'100%'}
            >
              Send reset link
            </Button>
            <Link href={routes.auth.login}>
              <Button variant="default" size="md" w={'100%'}>
                Return to sign in
              </Button>
            </Link>
          </Card>
        </form>
      )}

      <AuthSuccess
        description="
 We sent a reset link  to reset your password. If you can’t find it, please check your spam folder or verify that the email you provided is correct."
        title="Check your email"
        isVisible={tab === 'success'}
      />
    </Flex>
  );
};

export default ForgetPasswordContent;
