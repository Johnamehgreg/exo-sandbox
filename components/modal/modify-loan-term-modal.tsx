import { editAnalysisSchema } from "@/lib/validator/auth";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import naira from "@/public/assets/svg/naira.svg";
import {
    Box,
    Button,
    Flex,
    Modal,
    Text,
    TextInput,
    UnstyledButton,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Image from "next/image";
import { useState } from "react";
  
  const initialValues = {
 loanType:"",
 loanAmount:"",
 loanDuration:"",
  
  };
  interface Props {
    isVisible: boolean;
    onClose: () => void;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export const ModifyLoanTermModal: React.FC<Props> = ({
    isVisible,
    onClose,
    setShowModal,
  }) => {
    const [opened, setOpened] = useState(false);
    const [durationOpened, setDurationOpened] = useState(false);
    const [loanType, setLoanType] = useState<string>("");
    const [durationType, setDurationType] = useState<string>("Months");
  
    const form = useForm({
      initialValues,
      validate: yupResolver(editAnalysisSchema),
    });
  
    
    const onSubmit = () => {
     
    };
   
    return (
      <Modal
        style={{ backgroundColor: "#F9FAFB" }}
        onClick={e => {
          e.stopPropagation();
        }}
        shadow="md"
        classNames={{
          title: "text-[16px] font-medium !font-sans  ", 
        }}
        opened={isVisible}
        onClose={onClose}
        title={`Modify Loan Preference`}
        centered
      >
        <form className="w-full    " onSubmit={form.onSubmit(onSubmit)}>
          <Box className="w-full">
              <div className="relative">
                <TextInput
                  {...form.getInputProps("loanType")}
                  placeholder=""
                  label="Loan Type"
                  readOnly
                  value={loanType}
                />
                <UnstyledButton
                  onClick={() => setOpened(!opened)}
                  className="absolute right-3 top-10"
                >
                  <IconDropDown
                    className={`${opened && "rotate-180"} transition-all`}
                  />
                </UnstyledButton>
                {opened && (
                  <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                    {["Personal","Mortgage", "Business"].map(value => (
                      <li
                        key={value}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-[12px] "
                        onClick={() => {
                          setOpened(false);
                          setLoanType(value);
                          setLoanType(value);
                          form.setFieldValue("loanType", value);
                        }}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <TextInput
                {...form.getInputProps("loanAmount")}
                placeholder=" 0.00"
                type="number"
                label="Loan Amount"
                leftSection={
                  <Image src={naira} alt="checked" width={8} height={8} /> }
              />
            <div className="relative">
                <TextInput
                  {...form.getInputProps("loanDuration")}
                  placeholder="0"
                  label="Loan Duration"
                  type="number"
                />
  
                <UnstyledButton
                  onClick={() => setDurationOpened(!durationOpened)}
                  className="absolute right-3 top-10 flex items-center"
                >
                  <Text className=" text-[12px] ">{durationType}</Text>
                  <IconDropDown
                    className={`${durationOpened && "rotate-180"} transition-all`}
                  />
                </UnstyledButton>
                {durationOpened && (
                  <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                    {["Months", "Year"].map(value => (
                      <li
                        key={value}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-[12px] "
                        onClick={() => {
                          setDurationOpened(false);
                          setDurationType(value);
                        }}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            <Flex className="justify-between mt-10 ">
              <button onClick={() => {
                form.reset();
                form.setErrors({});
                setShowModal(false)
                }} className="border border-[#D2CFE2] rounded-[6px] px-3 ">
                Cancel
              </button>
              <Button  type="submit" size="xs">
                Rerun Analysis
              </Button>
            </Flex>
          </Box>
        </form>
      </Modal>
    );
  };
  