"use client";
import { CreditAnalysisCheckDropdown, CreditAnalysisCheckItem } from "@/components/euclid/credit-analysis-check-dropdown";
import { toast } from "@/components/ui/toast";
import { handleCopy, truncateString } from "@/lib/helper";
import back from "@/public/assets/svg/arrow-left-line.svg";
import { IconBvnCheck } from "@/public/assets/svg/bvn-check";
import checked from "@/public/assets/svg/checkCircle.svg";
import { IconCreditBureau } from "@/public/assets/svg/credit-bureau";
import { IconDocAnalysis } from "@/public/assets/svg/docAnalysis";
import warning from "@/public/assets/svg/errorWarning.svg";
import { FilterIcon } from "@/public/assets/svg/filter-icon";
import { IconArchiveBox } from "@/public/assets/svg/icon-archive-box";
import { IconCopy } from "@/public/assets/svg/icon-copy";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { OptionsIcon } from "@/public/assets/svg/optionsIcon";
import { ReurunIcon } from "@/public/assets/svg/rerun";
import { IconTransactionCategory } from "@/public/assets/svg/transaction-category";
import { Box, Flex, Loader, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface HeaderProps {
  status: "Processing" | "Completed" | "Analysis Failed"
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditAnalysisHeader: React.FC<HeaderProps> = ({ status, setShowModal }) => {
  const requestId = "E8baeb9c-E563-11ed-B5ea-0242ac120002";
  const [copied, setCopied] = useState(false);
  const [showChecks, setShowChecks] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const creditAnalysisChecks: CreditAnalysisCheckItem[] = useMemo(
    () => [
      { name: "Document Analysis", icon: IconDocAnalysis, status: "Completed" },
      { name: "Transaction Categorization", icon: IconTransactionCategory, status: "In-progress" },
      { name: "Credit Bureau Summary", icon: IconCreditBureau, status: "Not-started" },
      { name: "BVN Check", icon: IconBvnCheck, status: "Not-started" },
    ],
    []
  );

  const handleCopyText = useCallback(() => {
    handleCopy(requestId, setCopied);
  }, [requestId]);

  const toggleDropdown = useCallback(() => {
    setShowChecks((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowChecks(false);
      }
    };
    const handleClickEscape = (event: KeyboardEvent) => {
      if(event.key === "Escape") {
        setShowChecks(false)
      }
    }

    if (showChecks) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleClickEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickEscape);
    };
  }, [showChecks]);

  useEffect(() => {
    if(status === "Completed") {
      toast({
        message: 'Analysis 4/4 Complete',
        variant: "success",
      });
    }
  }, [status])
  

  return (
    <Box className="pt-[74px] p-[10px] bg-white  ">
      <Flex className="items-center justify-between">
        <Flex className="items-center gap-4">
          <button
            onClick={() => router.push("/app/euclid")}
            className="border border-[#D2CFE2] rounded-[6px] text-[14px] px-3 h-[26px] flex items-center gap-1"
          >
            <Image src={back} alt="back" />
            Back
          </button>
          <Flex className="text-[#4B5563] font-[350] text-[14px] items-center">
            Request ID:
            <Flex className="text-[#1F2937] font-[550] text-[14px] ml-2 items-center">
              {truncateString(requestId, 20)}
              <button
                onClick={handleCopyText}
                className="flex items-center gap-2 justify-center border border-[#D1D5DB] px-2 h-[26px] rounded-[8px]"
              >
                <IconCopy fill="black" />
              </button>
              {copied && <span className="ml-2 text-green-600 text-sm">Copied!</span>}
            </Flex>
          </Flex>
          <span
            ref={dropdownRef}
            className={`relative text-[12px] flex items-center gap-2 justify-center border border-[#D1D5DB] font-[450] px-3 h-[26px] rounded-[8px] ${
              status === "Completed"
                ? "bg-completed-bg text-[#00964A] "
                : status === "Processing"
                ? "bg-processing-bg text-[#2C5C80]"
                : "bg-failed-bg text-[#A63418]"
            }`}
          >
            {status === "Processing" ? <Loader className="ml-2" size={"12px"} /> : status === "Analysis Failed" ? <Image src={warning} alt="checked" /> : <Image src={checked} alt="checked" />}
            <Text className="text-[14px] ">{status}</Text>
            <div className="border border-[#D1D5DB] h-3 w-[1px]"></div>
            <Text className="text-[14px] ">1/4</Text>
            <UnstyledButton onClick={toggleDropdown}>
              <IconDropDown fill="#2C5C80" className={`${showChecks && "rotate-180"} transition-all`} />
            </UnstyledButton>
            {showChecks && (
              <div className="absolute left-0 top-8 py-2 rounded-[6px] bg-white shadow-lg border border-[#F3F4F6] w-[140%] z-[30]">
                {creditAnalysisChecks.map((item, index) => (
                  <CreditAnalysisCheckDropdown
                    key={index}
                    item={item}
                    index={index}
                    creditAnalysisChecks={creditAnalysisChecks}
                  />
                ))}
              </div>
            )}
          </span>
          {status === "Analysis Failed" && 
            <button className="text-[#00964A] flex items-center gap-1 text-[14px]">
            <ReurunIcon />
            Rerun Analysis
          </button>
          }
        </Flex>
        <Flex className="gap-5 items-center">
          <button className="text-[#00964A] flex items-center gap-1 text-[14px]">
            <IconArchiveBox fill="#00964A" />
            Download Analysis
          </button>
          <Flex className="items-center gap-4">
            <div className="border border-[#D1D5DB] h-3 w-[1px]"></div>
            <button
              onClick={() => setShowModal(true)}
              className="text-[#77FF9E] px-3 py-2 flex items-center gap-1 bg-[#0C3932] text-[14px] rounded-[6px]"
            >
              <FilterIcon fill="#77FF9E" />
              Modify Loan Terms
            </button>
          </Flex>
          <UnstyledButton>
            <OptionsIcon />
          </UnstyledButton>
        </Flex>
      </Flex>
      
    </Box>
  );
};

export default CreditAnalysisHeader;
