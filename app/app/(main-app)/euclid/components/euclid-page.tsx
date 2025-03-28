"use client"
import { useEuclidStore } from "@/app/store/euclidCreditAnalysis.store";
import { NewCreditAnalysisModal } from "@/components/modal/new-credit-analysis-modal";
import { useUploadBankStatement } from "@/hooks/mutate/use-upload-credit-analysis";
import arrowLeftRight from "@/public/assets/svg/ArrowsLeftRight.svg";
import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import SavedAnalysis from "./saved-analysis";
import UploadStatement from "./upload-statment";

const EuclidPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const {setFileUrl} = useEuclidStore()
  const {
      mutate: uploadStatement,
      isPending,
      data,
      isError,
      error
    } = useUploadBankStatement({ onSuccess: () => setShowModal(true) });

    const handleFileUpload = (file: File | null) => {
      if(!file) return
      uploadStatement(file)
    };
    
    useEffect(() => {
      setFileUrl(data?.file_url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPending,data])
    
  return (
    <Box className="overflow-y-auto bg-white mt-[70px]">
      <Box className="px-4 pb-4 ">
        <UploadStatement
          file={file}
          setFile={setFile}
          handleFileUpload={handleFileUpload}
          isPending={isPending}
          isError={isError}
          error={error}
        />
        <Flex className=" gap-1 items-center mt-10 mb-5  ">
          <Image
            src={arrowLeftRight}
            alt="analysis"
            className="w-3 h-3"
          />
          <Text className="text-[14px] font-[550] ">Saved Analysis</Text>
        </Flex>
        <SavedAnalysis />
      </Box>
      <NewCreditAnalysisModal
        isVisible={showModal}
        setShowModal={setShowModal}
        onClose={() => setShowModal(false)}
        file={file}
        setFile={setFile}
      />
    </Box>
  );
};

export default EuclidPage;
