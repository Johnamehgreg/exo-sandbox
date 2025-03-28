import { useBatchOverview } from "@/hooks/logic/use-batch-overview";
import EmptyProject from "@/public/image/empty-project.svg";
import Energy from "@/public/image/energy.webp";
import RealEstate from "@/public/image/realestate.webp";
import { Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Buildings, ClockCountdown, Plus, Sun } from "@phosphor-icons/react";


import { getTimeAgo } from "@/lib/helper";
import { routes } from "@/lib/routes";
import Star from "@/public/image/star.svg";
import { ErrorDetails } from "@/types/general";
import { Session } from 'next-auth';
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import Error from "../../error";
import Loading from "../../loading";


type Props = {
  session: Session | null;
};

const PageContent = ({ session, }: Props) => {

  const {
    recentProjects,
    totalProject,
    topSectionList,
    isFetching,
    isError,
    error,
    refetch,
    isLoading,
  } = useBatchOverview()

  const router = useRouter();


  if (isError)
    return <Error
      reset={refetch}
      error={error as ErrorDetails}
      isFetching={isFetching} />

  if (isLoading || isFetching){
    return <Loading />}
  return (
    <Box className="h-full relative" style={{ scrollbarGutter: "stable" }}>
      <Box className="h-12 flex items-center p-4 bg-gray-50 sticky top-0 z-30">
        <Text className="font-semibold text-gray-800 text-[18px]">
          Diana Overview
        </Text>
      </Box>
      <Flex className=" flex-wrap justify-between gap-4 pt-6 px-4">
        <Box className="">
          <Box>
            <Text className="text-lg text-gray-700">
              Hello {upperFirst(session?.user.firstName || "")},
            </Text>
            <Box className="mt-3">
              <Text className="text-[32px] leading-tight font-semibold text-gray-800">
                Welcome to Diana
              </Text>
              <Text className="text-[16px] text-gray-500 font-thin">
                AI agent designed to support transaction financing decisions
              </Text>
              <Text className="text-[14px] text-vibrantgreen font-bold transform">
                Now Offering Analysis for Transactions in California! 
              </Text>
              
              <Text className="text-[14px] text-vibrantgreen font-bold transform italic">
                ***Analysis for New York and Texas - Coming Soon!
              </Text>
            </Box>
          </Box>
        </Box>
        {totalProject > 0 && (
          <Box className="gap-x-3 flex items-center mt-4 w-80">
            <Button
              onClick={() => {
                router.push(routes.diana.onboarding);
              }}
              variant="default"
              className="w-full !border-gray-300 shadow-sm text-gray-800 flex justify-center items-center space-x-2 gap-x-2"
              leftSection={<Plus className="text-p1" />}
            >
              {" "}
              Single Transaction
            </Button>
            <Button
              onClick={() => router.push(routes.diana.batchOnboarding)}
              className="w-full"
              leftSection={<Plus className="text-palegreen" />}
            >
              Batch Analysis
            </Button>
          </Box>
        )}
      </Flex>

      {totalProject > 0 && (
        <>
          <Box className="px-4 my-7">
            <Box className=" mt-6 p-1 bg-gray-100 rounded-[10px]">
              <Box className="h-8 flex items-center px-2">
                <Text className="text-gray-800 text-[14px] font-bold">
                  Here is a brief summary of your current transactions
                </Text>
              </Box>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 bg-white border py-2.5 px-5 border-gray-200 rounded-lg">
                {topSectionList.map((section, index) => {
                  return (
                    <Flex key={index} className="flex-col space-y-4 justify-center h-[170px] border-b px-5 relative border-r border-gray-100">
                      <div className="size-7 bg-white shadow-sm flex items-center justify-center rounded-md border border-gray-300">
                        {section.icon}
                      </div>
                      <div className="flex items-center-justify-center absolute -right-2 -bottom-1.5 z-10">
                        <Image alt="" src={Star} />
                      </div>
                      <Box className="space-y-1">
                        <Text className="text-[14px] text-gray-500">
                          {section.label}
                        </Text>
                        <Text className="text-[32px] leading-7 text-gray-800">
                          {section.value}
                        </Text>
                      </Box>
                    </Flex>
                  );
                })}
              </div>
            </Box>
          </Box>
          {recentProjects.length > 0 && (
            <Box className=" px-4">
              <Box className="">
                <Text className="text-gray-800 font-semibold">
                  Recent Activities
                </Text>
              </Box>
              <Box className="grid grid-cols-1 md:grid-cols-2  pb-8 gap-4 mt-2">
                {recentProjects?.map((project, index) => {
                  const { batch_id, batch_name, completed_projects, failed_projects, date_created } = project;
                  const isEnergyBatch =  index % 2 === 0;
                  return (
                    <UnstyledButton
                      key={batch_id}
                      onClick={() => router.push(routes.diana.batchDetail(batch_id))}
                    >
                      <Box
                        key={batch_id}
                        className=" bg-gray-100 rounded-[10px] borde border-gray-200 p-5 relative overflow-hidden"
                      >
                        <Box className="absolute -right-14 top-10 scale-75 -z-1">

                          {isEnergyBatch ? <Image alt="" src={Energy} /> : <Image alt="" src={RealEstate} />}
                        </Box>
                        <Box className=" sticky z-10">
                          <Flex className="justify-between">
                            <Flex className="sm:justify-center gap-x-1 flex-wrap">
                              {
                                isEnergyBatch ?
                                <Text className="flex items-center gap-1 px-2 h-6 rounded-full text-[14px] bg-fuchsia-100 border border-gray-200 text-fuchsia-700">
                                {" "}
                                <Sun weight="fill" /> Energy{" "}
                                  </Text> :
                                  <Text className="flex items-center gap-1 px-2 h-6 rounded-full text-[14px] bg-green-50 border border-gray-200 text-green-600">
                                {" "}
                                <Buildings weight="fill" /> Real Estate{" "}
                                  </Text>
                              }


                              <Text className="flex items-center line-clamp-1 gap-1 px-2 h-6 rounded-full text-[14px] bg-white border border-gray200 text-gray-700">
                                {" "}
                                <ClockCountdown weight="regular" />{" "}
                                {getTimeAgo(date_created)}
                              </Text>
                            </Flex>

                          </Flex>
                          <Text className="mt-5 text-2xl font-bold text-gray-800">
                            {batch_name}
                          </Text>
                          <Flex className="mt-9 gap-x-6 relative z-1">
                            <Box>
                              <Text className="text-[14px] text-gray-600">
                                {completed_projects > failed_projects ? 'Completed' : 'Failed'}
                              </Text>
                            </Box>

                          </Flex>
                        </Box>
                      </Box>
                    </UnstyledButton>
                  );
                })}
              </Box>
            </Box>
          )}
        </>
      )}

      {totalProject === 0 && (
        <Box className="py-6 min-h-[70%] flex flex-col items-center justify-center ">
          <Box className="flex items-center justify-center">
            <Image alt="" src={EmptyProject} />
          </Box>
          <Box className="flex flex-col items-center justify-center gap-y-1 mt-4">
            <Text className="text-gray-800 font-semibold">
              No transactions created yet
            </Text>
            <Text className="text-center text-[14px] text-gray-600 font-thin leading-4">
              Start using Diana for smarter analysis <br /> and better
              decisions
            </Text>
            <Box className="gap-x-3 flex items-center mt-4 w-80">
              <Button
                variant="default"
                className="w-full !border-gray-300 shadow-sm text-gray-800 flex justify-center items-center space-x-2 gap-x-2"
                leftSection={<Plus className="text-p1" />}
                onClick={() => {
                  router.push(routes.diana.onboarding)
                }}
              >
                {" "}
                Single Transaction
              </Button>
              <Button
                onClick={() => {
                  router.push(routes.diana.batchOnboarding)
                }}
                className="w-full"
                leftSection={<Plus className="text-palegreen" />}
              >
                Batch Analysis
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PageContent