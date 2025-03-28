"use client"
import { useSignUpFlowStore } from "@/app/store/signUpFlow.store";
import { AuthSuccess } from "@/components/card/auth-succes";
import ErrorCard from "@/components/card/error-card";
import { PasswordInputCustom } from "@/components/input/password-input";
import { AuthLayout } from "@/components/layout/auth/auth-layout";
import { CompanyLogo } from "@/components/other/company-logo";
import { PasswordCheck } from "@/components/other/password-check";
import { useAuth } from "@/hooks/mutate/use-auth";
import { routes } from "@/lib/routes";
import { otpSchema, signUpSchema } from "@/lib/validator/auth";
import { IconBarChart } from "@/public/assets/svg/bar-chart";
import { IconArrowLeft } from "@/public/assets/svg/icon-arrow-left";
import { IconGridCard } from "@/public/assets/svg/icon-grid-card";
import { IconStack } from "@/public/assets/svg/icon-stack";
import { FormSignUpValue } from "@/types/auth";
import {
  Button,
  Card,
  Center,
  Flex,
  Loader,
  PinInput,
  SimpleGrid,
  Text,
  TextInput,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
  
  const initialValues: FormSignUpValue = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  };
  
  const SignUpPage = () => {
        const router = useRouter();
    const theme = useMantineTheme();
    const { tab, setTab } = useSignUpFlowStore();
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState<number>(0); // Countdown time in seconds
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
  
    const { onVerifyEmail, onSignUp, isLoading, isSending, onSendEmail } =
      useAuth();
    const form = useForm({
      initialValues,
      validate: yupResolver(signUpSchema),
    });
    const otpForm = useForm({
      initialValues: {
        otp: "",
      },
      validate: yupResolver(otpSchema),
    });
  
    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        setIsDisabled(false); // Enable the button when countdown ends
      }
      return () => clearInterval(timer);
    }, [timeLeft]);
  
    const handleResendOTP = useCallback(() => {
      onSendEmail({
        value: {
          email: form.values.email,
          firstName: form.values.firstName,
        },
        cb: () => {
          setTimeLeft(30);
          setIsDisabled(true);
        },
      });
    }, [onSendEmail, form.values.email, form.values.firstName]);
  
    const refList = useMemo(() => ({
      title: "Sign up to explore Diana and Fibonacci in action:",
      list: [
        {
          title: (
            <div>
              <Text component="span" className="font-medium">
                Transform Complexity into Clarity:{" "}
              </Text>
              <span>
                With Fibonacci, uncover anomalies in transactions effortlessly, and
                gain immediate insights into{" "}
              </span>
              <Text component="span" className="font-medium">
                risk distribution
              </Text>{" "}
              and potential threats.
            </div>
          ),
          icon: <IconStack />,
        },
        {
          title: (
            <div>
              <Text component="span" className="font-medium">
                Real-Time Monitoring & Insights:{" "}
              </Text>
              Get a comprehensive view of{" "}
              <Text component="span" className="font-medium">
                risk scores,
              </Text>{" "}
              top user behaviors, and data touch points—all at your fingertips for
              informed decisions.
            </div>
          ),
          icon: <IconBarChart />,
        },
        {
          title: (
            <div>
              <Text component="span" className="font-medium">
                From Data Overload to Strategic Insights:{" "}
              </Text>
              Access a KPI dashboard showcasing{" "}
              <Text component="span" className="font-medium">
                fraud detection rates, false positives,
              </Text>{" "}
              and the{" "}
              <Text component="span" className="font-medium">
                average time to risk detection,
              </Text>{" "}
              empowering your team with the data that matters.
            </div>
          ),
          icon: <IconGridCard />,
        },
      ],
    }), []);
  
    const handleSignUpSubmit = useCallback(() => {
      onVerifyEmail({
        values: { email: form.values.email },
        errorCallBack: (e) => setError(e),
        successCallBack: () => {
          onSendEmail({
            value: {
              email: form.values.email,
              firstName: form.values.firstName,
            },
            cb: () => {
              setTimeLeft(30);
              setIsDisabled(true);
              setTab("otp");
              setError("");
            },
          });
        },
      });
    }, [onVerifyEmail, onSendEmail, form.values.email, form.values.firstName, setTab, setTimeLeft, setIsDisabled, setError]);
    
    const handleOTPSubmit = useCallback(() => {
      onSignUp({
        values: {
          ...form.values,
          otp: parseInt(otpForm.values.otp, 10),
        },
        errorCallBack: (e) => setError(e),
        successCallBack: () => {
          setTab("success");
          setError("");
        },
      });
    }, [onSignUp, form.values, otpForm.values.otp, setTab, setError]);
    
    return (
      <AuthLayout
        sidelist={refList}
        showLeftOnMobile={true}
        hideLeft={tab !== "signup" ? true : false}>
        <Flex
          className="flex-col items-center justify-center  py-10 "
        >
          {tab !== "signup" && (
            <Center mb={"md"}>
              <CompanyLogo />
            </Center>
          )}
          <Transition
            enterDelay={500}
            exitDelay={300}
            mounted={tab === "signup"}
            transition="fade"
            duration={400}
            timingFunction="ease">
            {(styles) => (
              <form
                className="w-full"
                onSubmit={form.onSubmit(handleSignUpSubmit)}>
                <Card
                  className="auth-card"
                  style={{
                    ...styles,
                    display: tab === "signup" ? "block" : "none",
                  }}>
                  <Text className="auth-text-header">Create an account</Text>
                  <div className="auth-text-title">
                    Already have an account? {"      "}
                    <UnstyledButton
                      onClick={() => router.push(routes.auth.login)}
                      mr={"md"}>
                      <Text
                        className="auth-text-title !text-vibrantgreen"
                        c={theme.colors[theme.primaryColor][6]}
                        fw={700}>
                        Sign in
                      </Text>
                    </UnstyledButton>
                  </div>
                  <ErrorCard error={error} />
                  <SimpleGrid mb={"md"} cols={{ base: 1, sm: 2 }}>
                    <TextInput
                      {...form.getInputProps("firstName")}
                      placeholder="John"
                      label="First name"
                    />
                    <TextInput
                      {...form.getInputProps("lastName")}
                      placeholder="Doe"
                      label="Last name"
                    />
                  </SimpleGrid>
                  <TextInput
                    {...form.getInputProps("email")}
                    placeholder="Acme corporation"
                    label="Work email"
                    mb={"md"}
                  />
                  <PasswordInputCustom
                    mb={"1rem"}
                    placeholder={"hi@acmecorporation.com"}
                    {...form.getInputProps("password")}
                  />
                  <PasswordCheck
                    password={form.values.password}
                    email={form.values.email}
                    firstName={form.values.firstName}
                    lastName={form.values.lastName}
                  />
                  <Button
                    size="md"
                    variant="primary"
                    loading={isLoading}
                    type="submit"
                    w={"100%"}
                    mb={"2rem"}
                    mt={"1rem"}>
                    Sign Up
                  </Button>
                  <div className="auth-text-title">
  By signing up, you acknowledge that you have read, understood, and agree to Exo AI’s {' '}
  <UnstyledButton>
      <Text component="a" className="auth-text-title mr-1 !text-vibrantgreen" 
        c={theme.colors[theme.primaryColor][6]} fw={700}>
          Terms of Service
      </Text>
  </UnstyledButton>
  and
  <UnstyledButton>
      <Text component="a" className="auth-text-title !text-vibrantgreen ml-1" 
        c={theme.colors[theme.primaryColor][6]} fw={700}>
          Privacy Policy
      </Text>
  </UnstyledButton>
</div>

                </Card>
              </form>
            )}
          </Transition>
          <Transition
            mounted={tab === "otp"}
            transition="slide-left"
            duration={400}
            timingFunction="ease">
            {(styles) => (
              <form
                className="flex justify-center w-full"
                onSubmit={otpForm.onSubmit(handleOTPSubmit)}>
                <Card
                  className="auth-small-card "
                  style={{
                    ...styles,
                    display: tab === "otp" ? "block" : "none",
                  }}>
                  <Button
                    size="md"
                    className="px-0 mb-4 bg-transparent "
                    variant="white"
                    onClick={() => {
                        setError("")
                        setTab("signup")}}>
                    <Flex className="gap-2">
                      <IconArrowLeft />
                      <Text
                        c={theme.colors[theme.primaryColor][6]}
                        className="font-normal hidden md:block text-[14px]">
                        Back to Signup
                      </Text>
                    </Flex>
                  </Button>
                  <Text className="auth-text-header">Verify your email</Text>
                  <Text mb={"1.5rem"} className="auth-text-title ">
                    Enter the 6 digit code sent to your email address
                  </Text>
                  <ErrorCard error={error} />
                  <Center mb={"2rem"}>
                    <PinInput
                      type="number"
                      classNames={{
                        root: "justify-between w-full",
                        input: "!font-bold !text-[1.1rem]",
                      }}
                      {...otpForm.getInputProps("otp")}
                      placeholder=""
                      length={6}
                      size="lg"
                    />
                  </Center>
                  <Button
                    size="md"
                    loading={isLoading}
                    className="mb-5"
                    w={"100%"}
                    type="submit">
                    Verify your email address
                  </Button>
                  <div
                    
                    className="flex items-center justify-center text-center auth-text-title">
                    Didn’t receive any code?{" "}
                    {isDisabled ? (
                      `You can resend the OTP in ${timeLeft} seconds`
                    ) : (
                      <>
                        {isSending ? (
                          <Loader className="ml-2" size={"xs"} />
                        ) : (
                          <>
                            <UnstyledButton
                              className="mr-2 "
                              onClick={handleResendOTP}
                              disabled={isDisabled}>
                              <Text
                                component="span"
                                className="pl-2 auth-text-title "
                                c={theme.colors[theme.primaryColor][6]}
                                fw={700}>
                                Resend code
                              </Text>
                            </UnstyledButton>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </Card>
              </form>
            )}
          </Transition>
          <AuthSuccess
            description="
          Thank you for your 
          interest in our cutting-edge technology."
            title="Account created successfully"
            isVisible={tab === "success"}>
            <Button size="md" 
            onClick={() => router.push(routes.auth.login)}
                >
              Sign in
            </Button>
          </AuthSuccess>
        </Flex>
      </AuthLayout>
    );
  };
  export default SignUpPage;
  