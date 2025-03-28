import ErrorCard from '@/components/card/error-card';
import { PasswordInputCustom } from '@/components/input/password-input';
import { routes } from '@/lib/routes';
import { CompanyLogo } from '@/public/icon/company-logo';
import { FormLoginValue } from '@/types/auth';
import { Button, Card, Center, Flex, Text, TextInput, UnstyledButton, useMantineTheme } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  isLoading: boolean;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  form: UseFormReturnType<FormLoginValue>;
  onLogin: (value: FormLoginValue, callback: (error: string) => void) => void;
};

const LoginContent = ({ isLoading, error, setError, form, onLogin }: Props) => {
  
      const theme = useMantineTheme();
      const router = useRouter();

  return (
    <Flex className="flex-col items-center justify-center">
      <Center mb={'20px'}>
        <Flex className="flex-col items-center justify-center">
          <CompanyLogo />
          <Text className="auth-text-title mt-2 whitespace-pre-line text-center text-[14px]">
            {'Your AI companion for complex \ntransaction risk management'}
          </Text>
        </Flex>
      </Center>
      <form
        className="flex w-full justify-center"
        onSubmit={form.onSubmit((value) =>
          onLogin(value, (e) => {
            setError(e);
          })
        )}
        style={{ position: 'relative' }}
      >
        <Card className="auth-small-card">
          <Text className="auth-text-header">Welcome back</Text>
          <ErrorCard error={error} />
          <TextInput
            {...form.getInputProps('email')}
            placeholder="hi@acmecorporation.com"
            label="Email address"
            mb={'md'}
          />
          <PasswordInputCustom
            mb={'16px'}
            placeholder={'********'}
            {...form.getInputProps('password')}
          />
          <Link href={routes.auth.forgetPassword} className="mb-[16px]">
            <Text className="font-twk text-[14px] font-[650] text-vibrantgreen">
              Forgot password?
            </Text>
          </Link>
          <Button
            variant="primary"
            size="md"
            loading={isLoading}
            type="submit"
            className="w- mb-[32px]"
          >
            Login
          </Button>
          <div className="auth-text-title">
                          Do not have an account? {"      "}
                          <UnstyledButton
                            onClick={() => router.push(routes.auth.signup)}
                            mr={"md"}>
                            <Text
                              className="auth-text-title !text-vibrantgreen"
                              c={theme.colors[theme.primaryColor][6]}
                              fw={700}>
                              Sign up
                            </Text>
                          </UnstyledButton>
                        </div>
        </Card>
      </form>
      
    </Flex>
  );
};

export default LoginContent;
