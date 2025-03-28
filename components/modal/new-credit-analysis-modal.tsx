import { useEuclidStore } from "@/app/store/euclidCreditAnalysis.store";
import { PasswordInputCustom } from "@/components/input/password-input";
import { useTeam } from "@/hooks/mutate/use-team";
import { useSubmitCreditAnalysisRequest, useUploadBankStatement } from "@/hooks/mutate/use-upload-credit-analysis";
import { formatFileSize } from "@/lib/helper";
import { creditAnalysisSchema } from "@/lib/validator/auth";
import { Busniess } from "@/public/assets/svg/business";
import checkedCircle from "@/public/assets/svg/checkCircle.svg";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { IconPdfIcon } from "@/public/assets/svg/icon-pdf-icon";
import { IconTrashSimple } from "@/public/assets/svg/icon-trash-simple";
import IconUploadCloud from "@/public/assets/svg/icon-upload-cloud";
import { Individual } from "@/public/assets/svg/individual";
import individual from "@/public/assets/svg/individual.svg";
import naira from "@/public/assets/svg/naira.svg";
import { CreditAnalysisFormModel, TeamMemberModel } from "@/types/general";
import {
  Box,
  Button,
  Flex,
  Loader,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Image from "next/image";
import { useEffect, useState } from "react";
  
  interface Props {
    isVisible: boolean;
    onClose: () => void;
    member?: TeamMemberModel;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export const NewCreditAnalysisModal: React.FC<Props> = ({
    isVisible,
    onClose,
    file,
    setFile,
    setShowModal,
  }) => {
    const initialValues: CreditAnalysisFormModel = {
      firstName: "",
   lastName: "",
   password: "",
   file: null,
  bvn:0,
  loanType:"",
  loanAmount:0,
  loanDurationInMonths:0,
  loanDurationInYears:0,
  recipientType:"",
   
   };
    const { isLoading } = useTeam();
    const [opened, setOpened] = useState(false);
    const [loanType, setLoanType] = useState<string>("");
    const [loanDuration, setLoanDuration] = useState<number>(0);
    const {fileUrl, setFileUrl} = useEuclidStore()
  const {
        mutate: uploadForm,
        isPending,
        isError,
        error
      } = useSubmitCreditAnalysisRequest({ onSuccess: () => setShowModal(true) });
        const {
            mutate: uploadStatement,
            isPending:uploadStatementLoading,
            data,
            isError:uploadStatementIsError,
            error:uploadStatementError,
          } = useUploadBankStatement({ onError: () => setFile(null) });
      
          const handleFileUpload = (file: File | null) => {
            if(!file) return
            uploadStatement(file)
          };
          
          useEffect(() => {
            setFileUrl(data?.file_url)
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [uploadStatementLoading,data])

    const form = useForm({
      initialValues,
      validate: yupResolver(creditAnalysisSchema),
    });
  
    useEffect(() => {
      form.setFieldValue("file", file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    useEffect(() => {
      setLoanDuration( Number(form.values.loanDurationInMonths) + (12 * Number(form.values.loanDurationInYears)))
    }, [form.values.loanDurationInMonths, form.values.loanDurationInYears])
    
    const onSubmit = () => {
      uploadForm({
        loan_type: form.values.loanType, 
        loan_amount: form.values.loanAmount, 
        loan_currency: "NGN", 
        loan_duration_in_months: loanDuration, 
        first_name: form.values.firstName,
        last_name: form.values.lastName,
        bvn: form.values.bvn,
        recipient_type: form.values.recipientType as "individual" | "business", 
        password: form.values.password,
        file_url: fileUrl ? fileUrl: "", 
      });
    };
   
    return (
      <Modal
        style={{ backgroundColor: "#0CAE5C" }}
        onClick={e => {
          e.stopPropagation();
        }}
        shadow="md"
        classNames={{
          title: "text-[16px] font-medium font-twk  ",
        }}
        opened={isVisible}
        onClose={onClose}
        title={`New Credit Analysis`}
      >
        <form className="w-full    " onSubmit={form.onSubmit(onSubmit)}>
          <Text className="font-[550] font-twk">Uploaded Bank Statement</Text>
          <span className="text-[14px] font-[250] text-[#6B7280] flex items-center gap-1 ">
            Supports only{" "}
            <Text className="font-[550] text-[14px] text-[#1F2937] ">PDF files only, 25MB Max</Text>
          </span>
          <Box className="w-full">
            <Box className="w-full mt-2">
            <Flex className="items-center w-full justify-between rounded-xl bg-gray-50 py-2 pl-4 pr-[26px]">
                  <Flex className="items-center gap-x-3">
                    {file &&  <IconPdfIcon />}
                   
                    <Box>
                      <Text className="text-gray-700 font-[300] leading-5 text-[12px]">
                        {file ? file?.name : "No file selected"}
                      </Text>
                      <Text className="text-gray-700 font-[300] leading-5 text-[10px]">
                        {formatFileSize(file ? file?.size :0, 1)}
                      </Text>
                    </Box>
                  </Flex>
                  <div
  onClick={(event) => {
    event.stopPropagation();
    document.getElementById("fileInput")?.click();
  }}
  className="cursor-pointer pointer-events-auto"
>
   {uploadStatementLoading ? <Loader size={"12px"} /> : !file ? <IconUploadCloud /> : <IconTrashSimple /> }
  <input
    id="fileInput"
    type="file"
    accept="application/pdf"
    className="hidden"
    onChange={(e) => {
      const selectedFile = e.target.files?.[0] || null;
      handleFileUpload(selectedFile)
      if(data?.file_url !== "" ) {
        setFile(selectedFile);
      } 
    }}
  />
</div>


                </Flex>
               <Text className="text-[#9e2b33] mt-3 " size="xs">
      {uploadStatementIsError && uploadStatementError?.message }
    
  </Text>
               {form.errors.file && (
  <Text className="text-[#9e2b33] mt-3 " size="xs">
      {form.errors.file}
    
  </Text>
)}
              <SimpleGrid mb={"md"} mt={"xs"} cols={{ base: 2, sm: 2 }}>
               
                <PasswordInputCustom  {...form.getInputProps("password")}
                  placeholder="**********************"
                  label="PDF Password (If PDF is Locked)" mb={`0rem`}  />
              </SimpleGrid>
            </Box>
           
  
            <Text className="font-[550] mt-6 ">Loan Preference</Text>
            <Text className="text-[14px] font-[250] text-[#6B7280] flex items-center gap-1 ">
              Provide your personal details
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
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
                          form.setFieldValue("loanType", value === "Mortgage" ? "mortgage" : value === "Business" ? "business" : "personal");
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
            </SimpleGrid>
            <Text className=" text-[12px] mt-4 font-[500] mb-1 ">Loan duration</Text>
            <Flex className="items-center justify-between w-[48%]  h-10 ">
              
             <div className="w-[48%] h-full relative">
             <input
        {...form.getInputProps("loanDurationInYears")}
        type="number"
        name="loanDurationInYears"
       
          className="border outline-none border-gray-30 rounded-[6px] text-[14px] px-3 h-10 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
      />
      <Text className="absolute top-[11px] right-3 text-[12px] text-[#4B5563] ">{form.values.loanDurationInYears > 1 ? "Years" : "Year"}</Text>
      
             </div>
             <div className="w-[48%] h-full relative ">
              
      <input
        {...form.getInputProps("loanDurationInMonths")}
        type="number"
        name="loanDurationInMonths"
        
        
           className="border outline-none border-gray-30 rounded-[6px] text-[14px] px-3 h-10 w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
      />
       <Text className="absolute top-[11px] right-3 text-[12px] text-[#4B5563] ">{form.values.loanDurationInMonths > 1 ? "Months" : "Month"} </Text>
      
             
              </div>
            </Flex>
            {form.errors.loanDurationInYears && (
  <Text className="text-[#9e2b33] mt-3 " size="xs">
    {form.errors.loanDurationInYears}
  </Text>)}
  {form.errors.loanDurationInMonths && (
  <Text className="text-[#9e2b33] mt-3 " size="xs">
    {form.errors.loanDurationInMonths}
  </Text>)}
           
            <Text className="font-[550] mt-6 ">Recipient Information</Text>
            <Text className="text-[14px] font-[250] text-[#6B7280] flex items-center gap-1 ">
            Provide customer personal details
            </Text>
            <SimpleGrid className="mb-4" cols={{ base: 1, sm: 2 }}>  
              <TextInput
                {...form.getInputProps("firstName")}
                placeholder="John"
                label="First name"
                className=""
                leftSection={
                  <Image src={individual} alt="individual" width={15} height={15} />
                }
              />
              <TextInput
                {...form.getInputProps("lastName")}
                placeholder="Doe"
                label="Last name"
              />
            </SimpleGrid>
  
            <TextInput
  {...form.getInputProps("bvn")}
  placeholder="11 digits"
  label="BVN"
  mb="md"
  type="number"
  rightSectionWidth={80}
  styles={{
    input: {
      backgroundColor: form.getInputProps("bvn").value.length === 11 ? "#F1FFF8" : "white",
    },
  }}
  rightSection={
    form.getInputProps("bvn").value.length === 11 && (
      <Flex className="items-center ">
        <Image src={checkedCircle} alt="checked" width={15} height={15} />
        <Text className="text-[#07BF62] text-sm">Verified</Text>
      </Flex>
    )
  }
/>
<Text className="text-[12px] ">Recipient Type</Text>
  <Box>
  <Flex className="w-[70%] justify-between items-center">
   
    <Box
      className={`border rounded-[8px] w-[48%] h-10 flex items-center gap-2 justify-center cursor-pointer border-gray-300 ${
        form.values.recipientType === "individual" ? "bg-[#F1FFF8] " : ""
      }`}
      onClick={() => {
        form.setFieldValue("recipientType", "individual");
        form.validateField("recipientType"); 
      }}
    >
      <Individual />
      <Text className="text-[#4B5563] text-[12px]">Individual</Text>
      <input
       {...form.getInputProps("recipientType")}
        type="radio"
        name="recipientType"
        value="individual"
        checked={form.values.recipientType === "individual"}
        className="cursor-pointer hidden"
        onChange={() => form.setFieldValue("recipientType", "individual")}
      />
      {form.values.recipientType === "individual" ? <Image src={checkedCircle} alt="checked" width={15} height={15} /> : <div className="rounded-full border-[#9CA3AF] w-3 h-3 border "></div> }
    </Box>

    <Box
      className={`border rounded-[8px] w-[48%] h-10 flex items-center gap-2 justify-center cursor-pointer border-gray-300 ${
        form.values.recipientType === "business" ? "bg-[#F1FFF8]" : ""
      }`}
      onClick={() =>{
         form.setFieldValue("recipientType", "business")
         form.validateField("recipientType"); 
        }}
    >
      <Busniess />
      <Text className="text-[#4B5563] text-[12px]">Business</Text>
      <input
      {...form.getInputProps("recipientType")}
        type="radio"
        name="recipientType"
        value="business"
        checked={form.values.recipientType === "business"}
        className="cursor-pointer hidden"
        onChange={() => form.setFieldValue("recipientType", "business")}
      />
        {form.values.recipientType === "business" ? <Image src={checkedCircle} alt="checked" width={15} height={15} /> : <div className="rounded-full border-[#9CA3AF] w-3 h-3 border "></div> }
    </Box>
  </Flex>
  {form.errors.recipientType && (
  <Text className="text-[#9e2b33] mt-3 " size="xs">
    {form.errors.recipientType}
  </Text>
)}
{isError &&  <Text className="text-[#9e2b33] mt-3 " size="xs">
    {error.message}
  </Text>}
  </Box>
            <Flex className="justify-between mt-10 ">
              <button onClick={() => {
                form.reset();
                setFile(null);
                form.setErrors({});
                setShowModal(false)
                }} className="border border-[#D2CFE2] rounded-[6px] px-3 ">
                Cancel
              </button>
              <Button disabled={isPending || uploadStatementLoading} loading={isLoading} type="submit" size="xs" className="w-[122px] " >
                {isPending ? <Loader size={"12px"}/>  : " Start Analysis"}
               
              </Button>
            </Flex>
          </Box>
        </form>
      </Modal>
    );
  };
  