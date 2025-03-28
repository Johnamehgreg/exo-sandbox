import circularBg from "@/public/image/CircularPattern.svg";
import AnalysisPath from "@/public/image/analysis-steps.svg";
import Fader from "@/public/image/fader.svg";
import { ActionIcon, Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Image from 'next/image';

import { ActionModal } from "@/components/modal/action-modal";
import { BatchGrid } from "@/components/other/dnd/batch-grid";
import { useBatchAnalysis } from "@/hooks/logic/use-batch";
import { routes } from "@/lib/routes";
import { Session } from 'next-auth';
import { useRouter } from "nextjs-toploader/app";


type Props = {
  session: Session | null;
};

const PageContent = ({ session, }: Props) => {


  const {
    step,
    setQueryParams,
    queryParams,
    batchList,
    setBatchList,
    setBatchTitle,
    handleCreateBatch,
    isLoading,
    projectErrors,
    batchTitle,
    setStep,
    nameError,
    setNameError,
    projectList,
    setProjectList,
    showExitModal,
    setShowExitModal,
    onLeave,
    setBatchName,
  } = useBatchAnalysis({ session: session });

  const router = useRouter()

  return (
    <>
      {step === 1 && (
        <Box className="flex flex-col md:flex-row bg-gray-100">
          <Box className="hidden md:block w-[356px] h-screen ">
            <Box className="px-6 pb-4 flex flex-col justify-between h-full">
              <Box>
                <Box className=" h-[60px] flex items-center pt-10">
                  <Text className="text-gray-800 mb-[6px] font-semibold text-[20px] font-twk leading-[24px]">
                    ExoFinance
                  </Text>
                </Box>

                <Box className="pt-16 pr-8">
                  <Text className="text-gray-800 mb-[6px] font-[400] text-base font-twk leading-[24px]">
                    New Diana Batch
                  </Text>
                  <Text className="text-gray-600 mb-[50px] font-[250] text-[15px] font-twk leading-[20px]">
                    Create a new batch to run multiple transactions for smarter
                    investment decisions.
                  </Text>
                </Box>
              </Box>

              <Box className="gap-x-3 flex items-center ">
                <Button
                  onClick={() => {
                    if (projectList.length > 0)
                      return setShowExitModal(true)
                    onLeave()
                  }}
                  variant="default"
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  onClick={() => {
                    handleCreateBatch();
                  }}
                  className="w-full"
                >
                  Start Analysis
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="flex-1 flex flex-col  pt-2.5 pr-2.5 h-screen">
            <Box className="bg-white h-full flex-1 rounded-t-[10px] shdadow-sm border border-gray-300 border-b-transparent w-full  overflow-scroll">
              <Box className="min-h-12 py-2.5 bg-gray-50 pl-3 pr-4 flex justify-between items-center z-20 sticky top-0">
                <Box className="flex  flex-col gap-1">
                  <input
                    value={batchTitle}
                    placeholder="Enter batch name"
                    onChange={(e) => {
                      setBatchTitle(e.target.value);
                      setBatchName(e.target.value)
                      setNameError(e.target.value.trim().length === 0);
                    }}
                    className="w-[215px] outline-none ext-gray-800 text-[14px] font-twk leading-[14px] h-7 px-2 bg-white rounded-md border border-gray-200 justify-start items-center gap-3 inline-flex"
                  />
                  {
                    nameError && (
                      <Text className="text-red-500 text-sm font-medium">
                        Batch name is required
                      </Text>
                    )}
                </Box>
                <Flex className="gap-x-3 items-center">
                  <Text className="text-gray-800 font-semibold text-base left-al">
                    {batchList?.length || 0} {(batchList?.length || 0) === 1 ? 'Transaction' : 'Transactions'}
                  </Text>
                  <Box className="h-3.5 w-px border-r border-gray-200"></Box>
                  <TextInput
                    size="xs"
                    value={queryParams?.batch_query}
                    classNames={{
                      input:
                        "pl-7 pr-3 !h-6 !text-[12px] text-gray-800  placeholder:font-thin w-[180px] focus:border-vibrant-green ring-offset-1 focus:ring-2 ring-vibrant-green/20 focus-visible:outline-none ",
                    }}
                    placeholder="Find transaction"
                    leftSection={<MagnifyingGlass />}
                    onChange={(e) => {
                      setQueryParams({ batch_query: e.target.value });
                    }}
                    rightSection={
                      <ActionIcon
                        onClick={() => {
                          setQueryParams({ batch_query: "" });
                        }}
                        variant="transparent"
                        className="px-2 "
                      >
                        <X
                          color="#000"
                          className="!text-black fill-black"
                          size={18}
                        />
                      </ActionIcon>
                    }
                  />
                </Flex>
              </Box>
              <BatchGrid
                setProjectList={setProjectList}
                projectList={projectList}
                projectErrors={projectErrors} />
            </Box>
            <Box className="gap-x-3 flex bg-white md:hidden   sticky bottom-[0px] h-[50px]  items-center ">
              <Button
                onClick={() => {
                  router.push(routes.diana.dianaOverview);
                  setBatchList([]);
                }}
                variant="default"
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                loading={isLoading}
                onClick={() => {
                  handleCreateBatch();
                }}
                className="w-full"
              >
                Start Analysis
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      {step === 2 && (
        <Box className="bg-white">
          <Box className="w-[700px] absolute left-1/2 -translate-x-1/2 top-0">
            <Image className="" alt="" src={circularBg} />
          </Box>
          <Box className="w-full absolute left-1/2 -translate-x-1/2 top-[270px] flex items-center flex-col gap-y-6">
            <Image
              className="absolute w-32 h-32 -top-10 -translate-y-1/2 left-[45%] -translate-x-1/2 animate-circle -z-10"
              alt=""
              src={Fader}
            />
            <Image className="" alt="" src={AnalysisPath} />
            <Text className="relative z-10 bg-white text-gray-600 border border-gray-300 px-2 rounded-md shadow overflow-hidden">
              Creating batch
              <Image
                className="absolute w-40 h-40 -top-20 -translate-y-1/2 -left-10 animate-slide -z-10"
                alt=""
                src={Fader}
              />
            </Text>
          </Box>
          <div className="flex flex-col items-center gap-4 absolute left-1/2 -translate-x-1/2 bottom-10">
            <Text className="text-center leading-5 text-gray-600 font-normal">
              Fantastic! The batch analysis is now underway. <br />
              You can track the progress from your dashboard.
            </Text>
            <Box className="gap-x-3 w-[300px] flex items-center ">
              <Button
                onClick={() => setStep(1)}
                variant="default"
                className="w-full"
              >
                Cancel Analysis
              </Button>
              <Button
                // onClick={() => navigation(`${routes.dianaBatchDetail}/1`)}
                className="w-full"
              >
                Dashboard
              </Button>
            </Box>
          </div>
        </Box>
      )}
      <ActionModal
        cancelBtnText={'Yes'}
        buttonText={"No "}
        title={`Would you like to save all changes?`}
        isVisible={showExitModal}
        leftClassName="w-full"
        rightClassName="w-full"
        onSubmit={() => {
          onLeave()
          setBatchList([]);
        }}
        onClose={() => {
          onLeave()
        }}
      />
    </>
  )
}

export default PageContent