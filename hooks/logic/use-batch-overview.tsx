import { ArrowsLeftRight, Folder, ShieldWarning, WarningDiamond } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useGetBatchAnalysisDetail, useGetBatchOverview } from "../query/batch";

export const useBatchOverview = () => {

  const { batchOverview, isLoading, isError, refetch, isFetching, error, status } =
    useGetBatchOverview();
  const { batchAnalysisListDetail } = useGetBatchAnalysisDetail();

  // Memorize the recent projects (first 4 items)
  const recentProjects = useMemo(() => {
    return batchAnalysisListDetail?.slice(0, 4);
  }, [batchAnalysisListDetail]); // Recalculate only if `batchAnalysisListDetail` changes

  // Memorize the total project count
  const totalProject = useMemo(() => {
    return batchOverview?.total_analysis as number;
  }, [batchOverview]);



  const topSectionList = useMemo(() => [
    {
      label: "Active Analysis",
      value: batchOverview?.successful_analysis,
      icon: <Folder weight="duotone" size={18} />,
    },
    {
      label: "Total Transactions",
      value: batchOverview?.total_analysis,
      icon: <ArrowsLeftRight weight="duotone" size={18} />,
    },
    {
      label: "Transactions Processing",
      value: batchOverview?.processing_analysis,
      icon: <WarningDiamond weight="duotone" size={18} />,
    },
    {
      label: "Failed Analysis",
      value: `${batchOverview?.failed_analysis}/${batchOverview?.total_analysis}`,
      icon: <ShieldWarning weight="duotone" size={18} />,
    },
  ], [batchOverview]);

  return {
    recentProjects,
    totalProject,
    topSectionList,
    isLoading,
    refetch,
    isFetching,
    error,
    status,
    isError,
  }
}