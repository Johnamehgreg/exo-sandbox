"use client"
import { useConfiguration } from "@/hooks/logic/use-configuration";
import { IconHelp } from "@/public/assets/svg/icon-help";
import { IconPencil } from "@/public/assets/svg/icon-pencil";
import { Box, Button, Flex, NumberInput, Text } from "@mantine/core";
import { Session } from 'next-auth';
import { ErrorComponent, SkeletonLoadingPage } from "./extras";


type Props = {
  session: Session | null;
};

const PageContent = ({ session, }: Props) => {

  const {
    configurationList,
    handleInputChanges,
    onResetConfig,
    isEditMode,
    setIsEditMode,
    isUpdating,
    updateType,
    onSaveChange,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useConfiguration({ session })

  if (isError)
    return (
      <ErrorComponent isFetching={isEditMode} refetch={refetch} />
    )

  return (
    <Box>
      <div className="batch-page-header">
        <Text className="font-semibold text-gray-800 text-[18px]"> Configuration</Text>
      </div>

      <Box className="p-[20px]">
        <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-[24px]">
          <div className="w-full]  inline-flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch inline-flex justify-start items-center">
              <Text className="justify-start text-gray-800 text-lg font-twk leading-[18px]">Project Global Preference</Text>
            </div>
            <Text className="self-stretch justify-start text-gray-600 text-sm font-twk leading-[18px]">Set default financial parameters applied automatically to all future projects.</Text>
          </div>
          {
            !isLoading && (
              <div className="flex md:justify-start  md:items-start gap-2.5">
                {
                  !isEditMode && (
                    <Button
                      onClick={() => setIsEditMode(true)}
                      className=" text-[14px] relative font-bold  leading-[14px]"
                      leftSection={<IconPencil />}>
                      Edit Assumptions
                      <div className="w-[66px] h-[54px] left-[39px] top-[-53.50px] absolute bg-[#77ff9e] blur-[47px]" />
                    </Button>
                  )
                }
                {
                  isEditMode && (
                    <>
                      <Button loading={isUpdating && updateType === 'reset'}
                        onClick={onResetConfig}
                        variant="default"
                        className=" text-[14px] font-bold  leading-[14px]">
                        Rollback Changes
                      </Button>
                      <Button onClick={onSaveChange} loading={isUpdating && updateType === 'edit'}
                        className=" text-[14px] font-bold  leading-[14px] relative">
                        Save Changes
                        <div className="w-[66px] h-[54px] left-[39px] top-[-53.50px] absolute bg-[#77ff9e] blur-[47px]" />
                      </Button>
                    </>
                  )
                }
              </div>
            )
          }
        </div>
        {
          isFetching && <SkeletonLoadingPage />
        }
        {
          !isFetching && configurationList?.map(item => (
            <Box key={item?.id} className="p-[18px]  border-t-[1px] grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3">
              <Flex className=" h-fit items-center gap-[4px]  min-h-[40px]">
                <Text className="font-semibold text-[14px] text-gray-800">{item.label}</Text>
                <IconHelp />
              </Flex>
              <Box className="">
                {
                  item?.sectionList?.map((section, index) => (
                    <Box key={section.id} className="grid grid-cols-1 sm:grid-cols-2   sm:items-center gap-[10px]"
                      style={{
                        marginBottom: item?.sectionList?.length !== index + 1 ? 20 : 0
                      }}>
                      <Flex className=" sm:justify-end">
                        <Text className="text-gray-600  text-[14px] w-fit  font-twk leading-tight">{section?.label}</Text>
                      </Flex>
                      <NumberInput
                        value={section?.value}
                        thousandSeparator=","
                        hideControls
                        size="xs"
                        onChange={(val) => {
                          handleInputChanges(
                            item?.id,
                            section?.id,
                            val as number)
                        }}
                        disabled={!isEditMode}
                        suffix={section?.symbol === '%' ? section?.symbol : ''}
                        prefix={section?.symbol !== '%' ? section?.symbol : ''}
                        placeholder="0"
                        classNames={{
                          root: "",
                          input: "w-[130px]  rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-300 justify-start text-gray-800 text-[14px] font-semibold font-twk !text-gray-900 leading-tight"
                        }}
                      />
                    </Box>
                  ))
                }
              </Box>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default PageContent

