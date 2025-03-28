import { useUpdateScreeningSettings } from '@/hooks/mutate/use-update-screening-settings';
import { IconChevronDown } from '@/public/assets/svg/icon-chevron-down';
import { ScreeningData } from '@/types/general';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Loader,
  Modal,
  Select,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

type Props = {
  opened: boolean;
  onClose: VoidFunction;
  screeningData: ScreeningData | null;
};

const frequencyOptions = [
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Monthly',
    value: 'monthly',
  }
]

const EditFrequencyModal = ({ opened, onClose, screeningData }: Props) => {
  const successCallback = () => {
    onClose()
  }
  const { mutate, isPending } = useUpdateScreeningSettings(successCallback)
  const form = useForm({
    initialValues: {
      frequency: screeningData?.frequency,
      newCustomerCheck: screeningData?.newCustomerCheck
    }
  })

  const handleSubmit = (values: {
    frequency: string;
    newCustomerCheck: boolean;
  }) => {
    mutate({
      id: screeningData?.id as string,
      data: {
        frequency: values?.frequency,
        status: screeningData?.status as string,
        newCustomerCheck: values?.newCustomerCheck
      }
    })

  }

  useEffect(() => {
    if (!opened) {
      form.reset();
    }

    if (screeningData) {
      form.setValues({
        frequency: screeningData.frequency || '',
        newCustomerCheck: screeningData.newCustomerCheck || false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, screeningData]);
  return (
    <Modal
      {...{ opened, onClose }}
      withCloseButton={false}
      classNames={{
        body: "px-0 ",
      }}
      centered
    >
      <form className="w-full" onSubmit={form.onSubmit((values) => {
        handleSubmit({
          frequency: values.frequency || '',
          newCustomerCheck: values.newCustomerCheck || false
        });
      })}>
        {
          isPending ? (
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
          ) : (
            <>
              <Box className="pt-3 py-6 px-8 space-y-3">
                <Text className="text-base leading-6 font-medium text-gray-800">Edit Screening Frequency</Text>
                <Select
                  label="Frequency"
                  data={frequencyOptions}
                  className="text-[14px] font-normal leading-[21px] text-gray-800 -tracking-[0.28px]"
                  classNames={{
                    label: "text-sm leading-[18px] font-normal text-gray-800",
                    input: "text-[14px] rounded-[8px] leading-normal font-normal text-gray-500 -tracking-[0.28px] border-gray-200",
                    option: "text-[14px] font-normal leading-[21px] text-gray-800 -tracking-[0.28px]",
                  }}
                  rightSection={<IconChevronDown />}
                  withCheckIcon={false}
                  key={form.key('frequency')}
                  {...form.getInputProps("frequency")}
                />
                <Checkbox
                  key={form.key('newCustomerCheck')}
                  {...form.getInputProps("newCustomerCheck", { type: 'checkbox' })}
                  label="Run check for new customers"
                  classNames={{
                    label: "pl-1.5 text-sm leading-[18px] font-extralight text-gray-600"
                  }}
                />
              </Box>
              <Divider className="mb-4" />
              <Flex className="justify-between items-center mx-6">
                <Button variant="default" onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </Flex>
            </>
          )
        }
      </form>

    </Modal>
  );
};

export default EditFrequencyModal;
