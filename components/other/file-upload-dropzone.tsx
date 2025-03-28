import BlacklistUploadValidationMessage from "@/app/app/(main-app)/fibonacci/blacklist/components/upload-blacklist/blacklist-upload-validation-message";
import { IconTrashSimple } from "@/public/assets/svg/icon-trash-simple";
import IconUploadCloud from "@/public/assets/svg/icon-upload-cloud";
import { PdfIcon } from "@/public/assets/svg/pdfIcon";
import { Box, Flex, Loader, Text, Transition } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useCallback, useState } from "react";

interface FileUploadDropzoneProps {
  acceptedTypes?: string[];
  acceptedExtensions?: string[];
  maxSize?: number;
  uploadText?: string;
  subText?: string;
  onFileUpload?: (file: File) => void;
  className?: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading?:boolean;
  isError?:boolean;
  error?: Error | null
}

interface FileValidationState {
  isValid: boolean;
  message: string;
  variant: "error" | "success";
}

const FileUploadDropzone = ({
  acceptedTypes,
  maxSize,
  uploadText,
  subText,
  onFileUpload,
  className,
  file,
  setFile,
  isLoading,
  isError,
  error
}: FileUploadDropzoneProps) => {
  const [validation, setValidation] = useState<FileValidationState | null>(
    null
  );

  const validateFile = useCallback(
    (file: FileWithPath | null, acceptedTypes: string[] = [], acceptedExtensions: string[] = []) => {
      if (!file) return;
  
      if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.type)) {
        setValidation({
          isValid: false,
          message: `Invalid file type. Supported types: ${acceptedTypes.join(", ")}`,
          variant: "error",
        });
        return;
      }
  
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (acceptedExtensions.length > 0 && (!fileExtension || !acceptedExtensions.includes(fileExtension))) {
        setValidation({
          isValid: false,
          message: `Invalid file format. Supported extensions: ${acceptedExtensions.join(", ")}`,
          variant: "error",
        });
        return;
      }
  
      setValidation({
        isValid: true,
        message: "File is valid and ready for upload.",
        variant: "success",
      });
  
      setFile(file);
      onFileUpload?.(file);
    },
    [setFile, onFileUpload]
  );
  

  const handleRemoveFile = () => {
    setValidation(null);
    setFile(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFileUpload?.(null as any);
  };

  return (
    <Box className={className}>
      <Dropzone
      disabled={isLoading}
        enablePointerEvents
        multiple={false}
        accept={acceptedTypes?.reduce(
          (acc, type) => ({ ...acc, [type]: [] }),
          {}
        )}
        maxSize={maxSize}
        onDrop={files => validateFile(files[0] || null)}
        className="w-full rounded-[4px] bg-white hover::!bg-white shadow-[0_1px_2px_0px_rgba(0,0,0,0.05)] border-gray-400"
      >
        <Flex className="cursor-pointer pt-14 pb-2.5 w-full px-6 flex-col items-center">
          <IconUploadCloud />
          <Box className="space-y-[6px] text-[14px] text-gray-600 font-normal leading-normal mt-3 mb-[26px]">
            <Text inherit className="font-plus text-center">
              <Text inherit span className="text-vibrantgreen font-twk">
                {uploadText}
              </Text>{" "}
              or drag and drop
            </Text>
            <Text inherit className="text-center italic text-[#4B5563] text-[14px] ">
              {subText}
            </Text>
          </Box>
        </Flex>
      </Dropzone>

      <Transition
        mounted={!!validation}
        transition="fade-left"
        duration={400}
        timingFunction="ease"
      >
        {styles => (
          <Box style={styles} className="w-full mt-2">
            {validation?.isValid && file && (
              <Flex className="items-center w-full justify-between rounded-xl bg-gray-50 py-4 pl-4 pr-[26px]">
                <Flex className="items-center gap-x-3">
                  <PdfIcon />
                  <Box>
                    <Text className="text-gray-700 font-medium leading-5 text-[14px]">
                      {file.name}
                    </Text>
                    <Text className={`${isError ? "text-red-400" : "text-gray-600"}  text-[13px] leading-5 font-normal`}>
                      {isError ? error?.message : validation?.message}
                     
                    </Text>
                  </Box>
                </Flex>
                {isLoading ? <Loader /> : <button
                  onClick={event => {
                    event.stopPropagation();
                    handleRemoveFile();
                  }}
                  className="cursor-pointer pointer-events-auto"
                >
                  <IconTrashSimple />
                </button> }
              </Flex>
            )}
            {!validation?.isValid && (
              <BlacklistUploadValidationMessage
                variant="error"
                message={validation?.message as string}
              />
            )}
          </Box>
        )}
      </Transition>
    </Box>
  );
};

export default FileUploadDropzone;
