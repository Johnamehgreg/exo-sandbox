import DataNotFound from "@/components/other/DataNotFound";
import { useBatchDetail } from "@/hooks/logic/use-batch-detail";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import Star from "@/public/image/star.svg";
import { Box, Center, Flex, Loader, Select, Tabs, Text, TextInput, UnstyledButton } from "@mantine/core";
import { CaretRight, MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { format } from "date-fns";



import { useQueryParams } from "@/hooks/logic/use-query-parems";
import { routes } from "@/lib/routes";
import { ErrorDetails } from "@/types/general";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import Error from "../../../error";
import Loading from "../../../loading";
import ProjectListTable from "./project-list-table";



const PageContent = () => {

  const {
    projects,
    activeTab,
    setActiveTab,
    isLoading,
    isFetching,
    batchAnalysisDetail,
    topSectionList,
    tabs,
    error,
    refetch,
    isError,
  } = useBatchDetail();
  const router = useRouter();
  const { setQueryParams, queryParams } = useQueryParams()

  if (isError)
    return <Error
      reset={refetch}
      error={error as ErrorDetails}
      isFetching={isFetching} />

  if (isLoading)
    return <Loading />

  return (
    <Box className="relative">
      {
        isFetching && (
          <Center className="absolute top-[100px] w-full">
            <Loader type="bars" />
          </Center>
        )
      }
      <div className="h-12 flex items-center gap-x-2 p-4 bg-gray-50 sticky top-0 z-20">
        <Text className="text-gray-600">Batch Analysis</Text>
        <CaretRight />
        <Text className="font-semibold capitalize text-gray-800 text-[18px]">
          {batchAnalysisDetail?.batch_name}
        </Text>
      </div>
      <div className="px-4 my-7">
        <div className="flex items-center flex-wrap justify-between mt-6">
          <Text className="text-xl">{batchAnalysisDetail?.batch_name}</Text>
          {batchAnalysisDetail?.date_created && (
            <div className="flex items-center gap-x-1">
              <span className="text-[14px] font-normal text-gray-500">
                Date Started:
              </span>
              <Text className="text-[14px] text-gray-800">
                {format(
                  new Date(`${batchAnalysisDetail?.date_created}`),
                  "MMM dd, yyyy @ h:mm a"
                )}
              </Text>
            </div>
          )}
        </div>
        <Box className=" mt-4 p-1 bg-gray-100 rounded-[10px]">
          <div className="min-h-8 flex items-center px-2">
            <Text className="text-gray-800 text-[14px] font-bold">
              Here is a brief summary of your current transactions
            </Text>
          </div>
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
      </div>

      <Box className="px-4 my-5">
        <Tabs
          className="mb-3"
          value={activeTab}
          onChange={(val) => {
            setActiveTab(val);
            setQueryParams({
              riskLevel: "",
              search: "",
            });
          }}
        >
          <Flex
            className={
              "justify-between flex-col sm:flex-row border-b-[1px] border-gray-200 py-2 sm:items-center flex-wrap"
            }
          >
            <Tabs.List className="overflow-x-scroll w-full sm:w-fit custom-scrollbar flex-nowrap ">
              {tabs.map((tabValue, index) => {
                const active = activeTab === tabValue.value;
                return (
                  <Tabs.Tab
                    key={index}
                    leftSection={tabValue.icon}
                    value={tabValue.value}
                  >
                    <Text
                      className={`text-p1 ${!active && "text-[#6B7280]"
                        } text-[14px] font-[550] leading-[21px]`}
                      component="p"
                    >
                      {tabValue.label}{" "}
                      <Text
                        className="text-[14px] text-p1 font-[550] leading-[21px]"
                        component="span"
                      >
                        {tabValue.list?.length}
                      </Text>
                    </Text>
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
            <UnstyledButton
              onClick={() => router.push(routes.diana.batchOnboarding)}
              className="!text-vibrantgreen text-[14px] font-bold  leading-[14px] flex items-center gap-2"
            >
              <Plus className="!text-vibrantgreen" />
              Add Transaction
            </UnstyledButton>
          </Flex>
        </Tabs>
        <div className="flex items-center justify-between mt-[16px] mb-[8px] ">
          <Box className=" gap-x-3 flex flex-wrap gap-4 items-center">
            <TextInput
              size="xs"
              onChange={(e) => {
                setQueryParams({
                  search: e.target.value,
                });
              }}
              value={queryParams?.search}
              classNames={{
                input:
                  "pl-7 pr-3 !h-9 !text-[14px] !w-[200px] text-gray-800 border-gray-300 placeholder:font-thin  focus:border-vibrant-green ring-offset-1 focus:ring-2 ring-vibrant-green/20 focus-visible:outline-none ",
              }}
              placeholder="Find transaction"
              leftSection={<MagnifyingGlass />}
            />
            {activeTab === "completed" && (
              <Select
                placeholder="Risk Level"
                data={["High", "Low"]}
                value={queryParams.riskLevel}
                rightSection={<IconDropDown />}
                onChange={(e) => {
                  setQueryParams({
                    riskLevel: e as string,
                  });
                }}
                classNames={{
                  input:
                    "px-3 !h-9 !text-[14px] text-gray-800 border-gray-300 rounded-[6px] placeholder:text-gray-500 focus:border-vibrant-green ring-offset-1 focus:ring-2 ring-vibrant-green/20 focus-visible:outline-none ",
                  dropdown: "shadow-sm border-gray-200 -mt-1",
                  option: "text-[14px] font-thin !rounded-1",
                  label:
                    "absolute left-7 top-1/2 -translate-y-1/2 text-gray-500 block !text-[14px] !font-thin",
                }}
              />
            )}
          </Box>
        </div>
        {projects.length === 0 && <DataNotFound message="No Transaction Found" />}
        {projects.length > 0 && <ProjectListTable projectList={projects} />}
      </Box>
    </Box>
  )
}

export default PageContent