'use client'
import { routes } from "@/lib/routes";
import { Box, Button, Flex, Stepper, Text, Transition } from "@mantine/core";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { PropsWithChildren, useEffect, useState } from "react";

const steps = {
    START: 1,
    CONVERSATION: 2,
}

const DianaOnboardingLayoutWrapper = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const params = useParams()
    const [animate, setAnimate] = useState(false);
    const [, setCurrentStep] = useState(steps.START);
    const [active, setActive] = useState(0);
    const projectId = params?.slug?.[0]

    useEffect(() => {
        if (projectId) {
            setActive(1);
            setCurrentStep(steps.CONVERSATION);
        } else {
            setActive(0);
            setCurrentStep(steps.START);
        }
    }, [projectId]);

    const handleNavigation = (path: string) => {
        router.push(path);
    }
    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <Transition
            mounted={animate}
            transition="fade-left"
            duration={500}
            timingFunction="ease">
            {(style) => (
                <Flex
                    style={style}
                    className="h-screen w-full dashboard-gray-bg overflow-hidden dashboard-gray-bg"
                >
                    <Box className="h-screen  hidden sm:block    px-[15px] w-[356px] ">
                        <Box className=" h-[60px] flex items-center">
                            <Text className="text-[#1F2937] mb-[6px] font-semibold text-[20px] font-twk leading-[24px]">
                                ExoFinance
                            </Text>
                        </Box>

                        <Box className="h-[calc(100vh-120px)] pt-[30px]">
                            <Text className="text-[#1F2937] mb-[6px] font-[400] text-[18px] font-twk leading-[24px]">
                                New Diana Transaction
                            </Text>
                            <Text className="text-[#4B5563] mb-[50px] font-[250] text-[15px] font-twk leading-[20px]">
                                Create a new Transaction to streamline investment analysis,
                                integrate research data, and make financing decisions
                                smarter—all in one place
                            </Text>

                            <Stepper
                                iconSize={20}
                                allowNextStepsSelect={false}
                                color="#0B743F"
                                classNames={{
                                    stepLabel: "text-[15px] font-[400] ",
                                    stepIcon: "text-[12px] font-[400] ",
                                }}
                                active={active}
                                orientation="vertical"
                            >
                                <Stepper.Step
                                    c={active === 1 ? "#0B743F" : "#4B5563"}
                                    className=""
                                    label="Transaction Type"
                                />
                                <Stepper.Step
                                    c={active === 2 ? "#0B743F" : "#4B5563"}
                                    label="Transaction Information"
                                />
                                <Stepper.Step
                                    c={active === 3 ? "#0B743F" : "#4B5563"}
                                    label="Analysis and Configuration"
                                />
                            </Stepper>
                        </Box>

                        <Box className=" h-[60px] flex items-center ">
                            <Button
                                onClick={() => {
                                    // TODO change route to diana overview
                                    handleNavigation(routes.app.dashoard)
                                }}
                                variant="default"
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                    <Box className=" w-full dashboard-header-card-wrapper-border">
                        {children}
                    </Box>


                </Flex>
            )}
        </Transition>
    )
}

export default DianaOnboardingLayoutWrapper
