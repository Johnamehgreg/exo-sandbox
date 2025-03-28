import { search } from "@/types/general";
import {
  ArrowsLeftRight,
  Folder,
  ShieldWarning,
  WarningDiamond,
} from "@phosphor-icons/react";
import { Session } from 'next-auth';
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useGetBatchAnalysisDetail } from "../query/batch";


export const useBatchHome = ({ }: { session: Session | null; }) => {
  const {
    batchAnalysisListDetail,
    isLoading,
    refetch,
    isFetching,
    error,
    status,
    isError,
  } = useGetBatchAnalysisDetail();

  const topSectionList = useMemo(() => [
    {
      label: "Active Analysis",
      value: " 13",
      icon: <Folder weight="duotone" size={18} />,
    },
    {
      label: "Total Transactions",
      value: " 14",
      icon: <ArrowsLeftRight weight="duotone" size={18} />,
    },
    {
      label: "Transactions Processing",
      value: " 700",
      icon: <WarningDiamond weight="duotone" size={18} />,
    },
    {
      label: "Failed Analysis",
      value: ` 24/300`,
      icon: <ShieldWarning weight="duotone" size={18} />,
    },
  ], []);



  const searchParams = useSearchParams();

  const searchList = search(
    searchParams.get('search') as string,
    batchAnalysisListDetail || [],
    ["batch_name"]
  );

  return {
    batchAnalysisList: searchList,
    isLoading,
    topSectionList,
    refetch,
    isFetching,
    error,
    status,
    isError,
  };
};
