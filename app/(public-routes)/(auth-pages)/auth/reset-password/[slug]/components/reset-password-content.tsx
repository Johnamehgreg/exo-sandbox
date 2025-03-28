import { AuthSuccess } from '@/components/card/auth-succes';
import ErrorCard from '@/components/card/error-card';
import { PasswordInputCustom } from '@/components/input/password-input';
import { ResetPasswordCheck } from '@/components/other/reset-password-check';
import { routes } from '@/lib/routes';
import { CompanyLogo } from '@/public/icon/company-logo';
import { Button, Card, Center, Flex, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useRouter } from 'nextjs-toploader/app';
import { Dispatch, SetStateAction } from 'react';
import { ResetPasswordType } from './reset-password-client';

type Props = {
  token: string;
  tab: ResetPasswordType;
  setTab: Dispatch<SetStateAction<ResetPasswordType>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  form: UseFormReturnType<{ password: string; confirmPassword: string }>;
  onResetPassword: (arg0: {
    values: { password: string; token: string };
    successCallBack: () => void;
    errorCallBack: (e: string) => void;
  }) => void;
};

const ResetPasswordContent = ({
  token,
  tab,
  setTab,
  error,
  setError,
  isLoading,
  form,
  onResetPassword,
}: Props) => {
  const router = useRouter();

  return (
    <Flex justify={'center'} direction={'column'} w={'100%'}>
      <Center mb={'md'}>
        <CompanyLogo />
      </Center>
      {tab === 'reset' && (
        <form
          className="flex w-full justify-center"
          onSubmit={form.onSubmit((value) =>
            onResetPassword({
              values: { password: value.password, token: token! },
              successCallBack: () => setTab('success'),
              errorCallBack: (e) => {
                setError(e);
              },
            })
          )}
          style={{ position: 'relative' }}
        >
          <Card className="auth-small-card">
            <Text className="auth-text-header">Reset password</Text>
            <Text component="p" className="auth-text-title">
              Enter a new password below to change your password
            </Text>
            <ErrorCard error={error} />
            <PasswordInputCustom
              {...form.getInputProps('password')}
              label="Password"
            />
            <PasswordInputCustom
              mb={'0.5rem'}
              {...form.getInputProps('confirmPassword')}
              label="Confirm new password"
            />
            <ResetPasswordCheck
              confirmPassword={form.values.confirmPassword}
              password={form.values.password}
            />
            <Button size="md" loading={isLoading} type="submit" w={'100%'}>
              Reset password
            </Button>
          </Card>
        </form>
      )}

      <AuthSuccess
        description="
  Your password has been changed successfully and the new password  is ready for use"
        title="You are all set to sign in"
        isVisible={tab === 'success'}
      >
        <Button
          size="md"
          onClick={() => router.push(routes.auth.login)}
          w={'100%'}
        >
          Sign in
        </Button>
      </AuthSuccess>
    </Flex>
  );
};

export default ResetPasswordContent;
