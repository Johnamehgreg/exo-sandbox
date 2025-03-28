import { toast } from '@/components/ui/toast';
import { trackError } from '@/lib/error-tracking';
import { routes } from '@/lib/routes';
import apis from '@/services/api-services';
import { FormLoginValue, FormSignUpValue } from '@/types/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';
import { URLSearchParams } from 'url';

export const useAuth = (searchParams?: URLSearchParams) => {
  
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onLogin = async (
    values?: FormLoginValue,
    errorCallBack?: (error: string) => void
  ) => {
    setIsLoading(true);
    const redirectUrl = searchParams?.get('callbackUrl') as string;
    const callbackUrl = redirectUrl ?? routes.app.dashoard;
    const res = await signIn('credentials', {
      email: values?.email,
      password: values?.password,
      redirect: false,
      callbackUrl,
    });
    setIsLoading(false);
    if (!res?.error) {
      setIsLoading(false);
      toast({
        message: 'Sign In Successful',
        variant: 'success',
      });
      router.push(callbackUrl);
    } else {
      setIsLoading(false);
      errorCallBack?.(res?.error);
      toast({
        variant: 'error',
        message: res?.error,
      });
    }
  };

  const onForgetPassword = ({
    values,
    errorCallBack,
    successCallBack,
  }: {
    values?: { email: string };
    errorCallBack?: (error: string) => void;
    successCallBack: () => void;
  }) => {
    setIsLoading(true);
    apis.auth.user
      .forgetPassword(values!)
      .then(() => {
        setIsLoading(false);
        successCallBack?.();
        toast({
          message: 'Link sent successfully, ',
          variant: 'success',
        });
      })
      .catch(() => {
        setIsLoading(false);
        errorCallBack?.("You'll get a reset link if you have an email with us");
        toast({
          message: "You'll get a reset link if you have an email with us",
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const onResetPassword = ({
    values,
    errorCallBack,
    successCallBack,
  }: {
    values?: { password: string; token: string };
    errorCallBack?: (error: string) => void;
    successCallBack?: () => void;
  }) => {
    setIsLoading(true);
    apis.auth.user
      .resetPassword(values!)
      .then(() => {
        setIsLoading(false);
        successCallBack?.();
        toast({
          message: 'Link sent Successfully, ',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCallBack?.(e.response.data.message);
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const onChangePassword = ({
    values,
    errorCallBack,
    successCallBack,
  }: {
    values?: { oldPassword: string; newPassword: string };
    errorCallBack?: (error: string) => void;
    successCallBack?: () => void;
  }) => {
    setIsLoading(true);
    apis.auth.user
      .changePassword(values!)
      .then((res) => {
        setIsLoading(false);
        successCallBack?.();
        toast({
          message: res.data.message || 'Passwords changed successfully',
          variant: 'success',
        });
      })
      .catch((e) => {
        setIsLoading(false);
        errorCallBack?.(e.response.data.message);
        // TODO Error tracking
        // trackError(e, { message: `Password change error` });
        toast({
          message: e.response.data.message,
          variant: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const onSendEmail = ({
    value,
    cb
  }: {
    value: { email: string; firstName: string };
    cb?: () => void;
  }) => {
    setIsSending(true);
    apis.auth.user
      .sendRegistrationOtp(value)
      .then(() => {
        setIsSending(false);
        setIsLoading(false);
        cb?.();
        toast({
          message: "Otp sent successfully, ",
          variant: "success"
        });
      })
      .catch(() => {
        setIsSending(false);
        toast({
          message: "Something went wrong",
          variant: "error"
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const onSignUp = ({
    values,
    errorCallBack,
    successCallBack
  }: {
    values?: FormSignUpValue;
    errorCallBack?: (error: string) => void;
    successCallBack: () => void;
  }) => {
    setIsLoading(true);
    apis.auth.user
      .register(values!)
      .then(() => {
        setIsLoading(false);
        successCallBack?.();
      })
      .catch((e) => {
        setIsLoading(false);
        errorCallBack?.(e.response.data.message);
        trackError(e, { message: `Signup form submission error` });
        toast({
          message: e.response.data.message,
          variant: "error"
        });
      })
      .finally(() => setIsLoading(false));
  };
  const onVerifyEmail = ({
    values,
    errorCallBack,
    successCallBack
  }: {
    values?: { email: string };
    errorCallBack?: (error: string) => void;
    successCallBack: () => void;
  }) => {
    setIsLoading(true);
    apis.common
      .verifyEmail(values!)
      .then(() => {
        setIsLoading(false);
        successCallBack?.();
      })
      .catch((e) => {
        setIsLoading(false);
        errorCallBack?.(e.response.data.message);
        // toast({
        //   message: e.response.data.message,
        //   variant: 'error',
        // });
      })
      .finally(() => setIsLoading(false));
  };

  return {
    onLogin,
    onForgetPassword,
    onResetPassword,
    onChangePassword,
    isLoading,
    onSignUp,
onVerifyEmail, onSendEmail, isSending  };
};
