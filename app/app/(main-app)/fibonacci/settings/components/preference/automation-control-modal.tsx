import { useUpdateScreeningSettings } from '@/hooks/mutate/use-update-screening-settings';
import { cn } from '@/lib/utils';
import { ScreeningData } from '@/types/general';
import { Box, Button, Divider, Flex, Loader, Modal, Text } from '@mantine/core';

type Props = {
  opened: boolean;
  onClose: VoidFunction;
  screeningData: ScreeningData | null;
};

const AutomationControlModal = ({ opened, onClose, screeningData }: Props) => {
  const successCallback = () => {
    onClose()
  }
  const { mutate, isPending } = useUpdateScreeningSettings(successCallback)

  const handleDisable = () => {
    mutate({
      id: screeningData?.id as string,
      data: {
        status: screeningData?.status === "active" ? "inactive" : "active",
        frequency: screeningData?.frequency || "",
        newCustomerCheck: screeningData?.newCustomerCheck || false
      }
    })
  }

  const getToggleLabel = (screeningData: ScreeningData) => {
    return screeningData?.status === "active" ? "disable" : "enable";
  }

  const handleClose = () => {
    if (isPending) return;
    onClose()
  }
  return (
    <Modal
      {...{
        opened,
        onClose: handleClose,
        withCloseButton: false,
      }}
      classNames={{
        body: "px-0 ",
      }}
      centered
    >
      <Box className="w-full">
        {
          isPending ? (
            <>
              <Flex className="px-4 flex-col items-center md:px-[32px] py-[24px]">
                <Loader mb={"md"} size={"sm"} />
                <Text
                  className="text-[14px] font-medium leading-normal text-green-600">
                  Processing
                </Text>

                <Text
                  className="text-[13px] font-medium leading-5 text-gray-600">
                  This should only take a few moments…
                </Text>
              </Flex>
            </>
          ) : (
            <>
              <Box className="px-8 py-6">
                <Text className="text-base leading-6 font-medium text-gray-800">Are you sure you want <>{getToggleLabel(screeningData!)}</>?</Text>
                <Text className="text-sm leading-[18px] font-extralight text-gray-600">{screeningData?.status === "active" ? "Disabling" : "Enabling"} this automation might likely impact your decision <Box component="span" className="block">making ability</Box></Text>
              </Box>
              <Divider className="mb-4" />
              <Flex className="justify-between items-center mx-6">
                <Button disabled={isPending} variant="default" onClick={handleClose}>Cancel</Button>
                <Button disabled={isPending} onClick={handleDisable} className={cn(" !text-white capitalize", {
                  "text-green-600": screeningData?.status === "inactive",
                  "text-error-600 hover:bg-error-600 bg-error-600": screeningData?.status === "active",
                })}>{
                    getToggleLabel(screeningData!)
                  }</Button>
              </Flex>
            </>
          )
        }
      </Box>
    </Modal>
  );
};

export default AutomationControlModal;
