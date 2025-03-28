'use client'
import { useUiStore } from "@/app/store/ui.store";
import { useAskDiana } from "@/hooks/logic/use-ask-diana";
import { useFetchAnimation } from "@/hooks/query/animation-data";
import { IconAtom } from "@/public/assets/svg/icon-atom";
import { IconX } from "@/public/assets/svg/icon-x";
import colorImage from "@/public/image/colored_bg.svg";
import whiteImage from "@/public/image/white_bg.svg";
import Image from "next/image";

import {
  Box,
  Button,
  Divider,
  Flex,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Lottie from "lottie-react";

export const AskDianaBtn = () => {
  const {
    setShowAskDiana,
    showAskDiana,
    showAskDianaIntro,
    setShowAskDianaIntro,
  } = useUiStore();
  const { shouldShowAskDiana } = useAskDiana();
  const { data } = useFetchAnimation("/assets/askDiana.json");

  return (
    <>
      {shouldShowAskDiana && (
        <Flex className="items-center">
          <Box className="mx-2">
            <Divider
              orientation="vertical"
              className="border-[#D1D5DB] h-[14px]"
            />
          </Box>
          <Popover
            transitionProps={{ transition: "fade-down", duration: 300 }}
            withArrow
            width={276}
            arrowSize={24}
            opened={showAskDianaIntro}
          >
            <Popover.Target>
              <UnstyledButton
                onClick={() => {
                  setShowAskDianaIntro(false);
                  setShowAskDiana(!showAskDiana);
                }}
                className={`size-[32px] ${showAskDiana
                    ? "bg-[#E2F0D9] border-[1px] border-solid border-gray-300"
                    : "bg-white shadow-sm "
                  }    rounded-[6px] transition-all relative`}
              >
                {!showAskDiana && (
                  <Box className="absolute bottom-0 right-0">
                    <span className="relative flex size-[8px]">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vibrantgreen opacity-75"></span>
                      <span className="relative inline-flex size-[8px] rounded-full  bg-vibrantgreen"></span>
                    </span>{" "}
                  </Box>
                )}

                <IconAtom />
              </UnstyledButton>
            </Popover.Target>

            <Popover.Dropdown
              className="border-[1px]  border-gray-200 border-solid shadow-sm rounded-[12px]"
              p={0}
            >
              <Flex className="px-[10px] justify-between py-[6px]">
                <Text className="text-gray-800 text-base font-[650]  leading-normal">
                  🎉 Introducing AskDiana
                </Text>
                <UnstyledButton onClick={() => setShowAskDianaIntro(false)}>
                  <IconX />
                </UnstyledButton>
              </Flex>

              <Box className="bg-[#F3F4F6] relative overflow-hidden">
                <Image
                  alt=""
                  className="size-[100px] absolute top-0 left-0"
                  src={colorImage}
                />
                <Image
                  alt=""
                  className="size-[110px] absolute top-0 right-0"
                  src={whiteImage}
                />
                {data && (
                  <Lottie animationData={data} loop={true} autoplay={true} />
                )}
              </Box>

              <Box className="px-[10px] bg-white  rounded-[12px] py-[16px]">
                <Text className=" text-gray-600 mb-[14px] text-[14px] font-[350] leading-tight">
                  Quickly ask questions about your transactions, find relevant
                  information, and get instant insights without ever leaving
                  your workflow. Give it a try now.
                </Text>
                <Button
                  size="xs"
                  onClick={() => setShowAskDianaIntro(false)}
                  className="px-[16px] text-[14px]"
                >
                  Dismiss
                </Button>
              </Box>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      )}
    </>
  );
};
