"use client";

import { toast } from "@/components/ui/toast";
import { useDianType } from "@/hooks/logic/diana-logic";
import { useCreateDianaOnboardingChat } from "@/hooks/mutate/use-onboarding-diana-chat";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@/public/assets/svg/icon-right-arrow";
import DianaEllipse from "@/public/image/diana-onboarding-ellispe.svg";
import { Box, Card, Center, Container, Flex, Loader, Overlay, ScrollArea, SimpleGrid, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

interface Props {
    session: Session | null
}

const OnboardingPageClient = ({ session }: Props) => {
    const { dianaTasks } = useDianType();
    const [selectedTaskCode, setSelectedTaskCode] = useState("");

    const router = useRouter()
    const theme = useMantineTheme();
    const { mutateAsync, isPending } = useCreateDianaOnboardingChat();

    const handleTaskSelection = async (task: typeof dianaTasks[number]) => {
        setSelectedTaskCode(task.code);

        try {
            const response = await mutateAsync();
            if (response?._id) {
                router.push(task.routePath(response?._id));
            }
        } catch {
            toast({
                message: "Failed to create onboarding chat",
                variant: "error",
            })
        }
    };


    return (
        <Box className="h-[99vh] overflow-hidden relative">
            <ScrollArea className="w-full h-full ">
                <Container className="mt-16  dashboard-vertical-padding">
                    <Image
                        className="absolute left-[50%] translate-x-[-50%] top-0"
                        alt=""
                        src={DianaEllipse}
                    />
                    <Box className="mb-[40px]">
                        <Text className="text-center  text-[20px] font-[350] text-primary mb-[13px]">
                            Hi {session?.user?.firstName ?? "User"},
                        </Text>

                        <Text className=" text-primary whitespace-pre-line text-center text-[28px] font-medium leading-[34px] ">
                            Select the type of real asset transaction
                            <Box component="span" className="block"> you&apos;d like to analyze today</Box>
                        </Text>
                    </Box>
                    <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
                        {dianaTasks.map((task, index) => {
                            const { Icon } = task;
                            return (
                                <UnstyledButton key={`dianaTasks-${index}`} disabled={task.isDisabled}>
                                    <Card
                                        onClick={() => handleTaskSelection(task)}
                                        className={cn("gray-card-wrapper  transition-all duration-500 relative opacity-30", {
                                            "hover:shadow-md hover:scale-100 opacity-100": !task.isDisabled,
                                        })}
                                    >
                                        {isPending && selectedTaskCode === task.code ? (
                                            <Overlay
                                                color={theme.colors[theme.primaryColor][6]}
                                                backgroundOpacity={0.15}
                                                blur={3}
                                            >
                                                <Center className="h-full">
                                                    <Loader />
                                                </Center>
                                            </Overlay>
                                        ) : null}
                                        <Flex className="h-[40px] px-[8px] items-center justify-between">
                                            <Text className="gray-card-header-text">{task.title}</Text>
                                            <IconArrowRight fill="#1F2937" />
                                        </Flex>
                                        <Box className="project-type-card-inner relative ">
                                            <Box className="absolute top-[50%] left-0 translate-y-[-50%]">
                                                {task.shade}
                                            </Box>
                                            <Icon className="text-xl mb-[20px]" />
                                            <Text className="text-[#4B5563] font-sans text-[14px] font-normal leading-5">
                                                {task.description}
                                            </Text>
                                        </Box>
                                    </Card>
                                </UnstyledButton>
                            );
                        })}
                    </SimpleGrid>
                </Container>
            </ScrollArea>
        </Box>

    )
}

export default OnboardingPageClient