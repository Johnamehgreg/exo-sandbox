import DataNotFound from "@/components/other/DataNotFound";
import { useBatchHome } from "@/hooks/logic/use-batch-home";
import { Box, Button, Center, Loader, Text, TextInput } from "@mantine/core";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";

import { useQueryParams } from "@/hooks/logic/use-query-parems";
import { routes } from "@/lib/routes";
import { ErrorDetails } from "@/types/general";
import { Session } from 'next-auth';
import { useRouter } from "nextjs-toploader/app";
import Error from "../../error";
import Loading from "../../loading";
import BatchAnalysisTable from "./batch-table";


type Props = {
  session: Session | null;
};

const PageContent = ({ session, }: Props) => {

  const {
    batchAnalysisList,
    isFetching,
    isError,
    refetch,
    isLoading,
    error,
  } = useBatchHome({ session: session })

  const { setQueryParams, queryParams } = useQueryParams()
  const router = useRouter()

  if (isError)
    return <Error
      reset={refetch}
      error={error as ErrorDetails}
      isFetching={isFetching} />

  if (isLoading)
    return <Loading />

  return (
    <>
      <Box className="relative">
        {
          isFetching && (
            <Center className="absolute top-[100px] w-full">
              <Loader type="bars" />
            </Center>
          )
        }
        <div className="h-12 flex justify-between w-full items-center p-4 bg-gray-50 sticky top-0 z-20">
          <Text className="font-semibold text-gray-800 text-[18px]">
            Batch Analysis
          </Text>
          <Button
            onClick={() => {
              router.push(routes.diana.batchOnboarding);
            }}
            classNames={{
              root: " flex justify-center gap-x-2 items-center !text-palegreen ",
            }}
            leftSection={<Plus className="!text-palegreen" />}
          >
            Start New
          </Button>
        </div>

        <div className=" flex  flex-wrap gap-3 items-center mt-[20px] mb-2 justify-between px-[15px]">
          <Box className=" h-full">
            <Text className="text-gray-800  font-bold">
              Batches ({batchAnalysisList.length})
            </Text>
          </Box>
          <TextInput
            onChange={(e) => {
              setQueryParams({
                search: e.target.value,
              });
            }}
            value={queryParams?.search}
            size="xs"
            classNames={{
              input:
                "pr-3 !h-9 !text-[14px] w-full sm:w-[200px] text-gray-800 border-gray-300 placeholder:font-thin placeholder:text-gray-500  focus:border-vibrant-green ring-offset-1 focus:ring-2 ring-vibrant-green/20 focus-visible:outline-none ",
            }}
            placeholder="Find batch"
            leftSection={<MagnifyingGlass />}
          />
        </div>
        <Box className="px-4 pb-8">
          {batchAnalysisList.length === 0 && (
            <DataNotFound message="No Transaction Found" />
          )}
          {batchAnalysisList.length > 0 && (
            <BatchAnalysisTable batchList={batchAnalysisList} />
          )}
        </Box>
      </Box>
    </>
  )
}

export default PageContent