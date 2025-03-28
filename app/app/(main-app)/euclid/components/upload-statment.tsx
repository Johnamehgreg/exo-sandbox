import FileUploadDropzone from "@/components/other/file-upload-dropzone";
import uploadBankStatement from "@/public/assets/svg/euclid/uploadBankStatement.svg";
import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

interface UploadStatementProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleFileUpload:(File:File | null) => void;
  isPending:boolean;
  isError:boolean;
  error:Error | null
}
const UploadStatement: React.FC<UploadStatementProps> = ({
  handleFileUpload,
  file,
  setFile,
  isPending,
  isError,
  error
}) => {
  
  return (
    <Box>
      <Text className="text-[#1F2937] font-[550] py-5 ">
        Start a new analysis
      </Text>
      <Box className="bg-[#f3f4f6] p-2 rounded-[8px] ">
        <Flex className="flex items-center gap-2">
          <Image src={uploadBankStatement} alt="upload" />
          <Text className="text-[14px]">
            Upload Bank Statement to start a new Credit Analysis
          </Text>
        </Flex>
        <FileUploadDropzone
          acceptedTypes={["application/pdf"]}
          acceptedExtensions={["pdf"]}
          uploadText="Click to upload"
          subText="Supports only PDF files. Make sure files are unlocked."
          onFileUpload={handleFileUpload}
          className="mt-2"
          file={file}
          setFile={setFile}
          isLoading={isPending}
          isError={isError}
          error={error}
        />
      </Box>
    </Box>
  );
};

export default UploadStatement;
