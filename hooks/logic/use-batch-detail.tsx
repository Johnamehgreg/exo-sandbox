import { IconCompleted } from "@/public/assets/svg/icon-completed";
import { IconFailed } from "@/public/assets/svg/icon-failed";
import { IconProcessing } from "@/public/assets/svg/icon-processing";
import { search } from "@/types/general";
import {
  ArrowsLeftRight,
  Folder,
  ShieldWarning,
  WarningDiamond,
} from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useGetSingleBatchAnalysis } from "../query/batch";


export const useBatchDetail = () => {

  const params = useParams();
  const id = params.batchId as string;
  const { batchAnalysisDetail, isLoading, refetch, isError, isFetching, error, status } =
    useGetSingleBatchAnalysis({
      id: id as string,
    });
  const failed = batchAnalysisDetail?.projects_by_state?.failed.length ?? 0;
  const running = batchAnalysisDetail?.projects_by_state?.running.length ?? 0;
  const successful =
    batchAnalysisDetail?.projects_by_state?.completed.length ?? 0;
  const unknown = batchAnalysisDetail?.projects_by_state?.pending.length ?? 0;
  const totalProject = failed + running + successful + unknown;

  const topSectionList = useMemo(() => [
    {
      label: "Active Analysis",
      value: successful,
      icon: <Folder weight="duotone" size={18} />,
    },
    {
      label: "Total Transactions",
      value: totalProject,
      icon: <ArrowsLeftRight weight="duotone" size={18} />,
    },
    {
      label: "Transactions Processing",
      value: running + unknown,
      icon: <WarningDiamond weight="duotone" size={18} />,
    },
    {
      label: "Failed Analysis",
      value: `${failed}/${totalProject}`,
      icon: <ShieldWarning weight="duotone" size={18} />,
    },
  ], [successful, totalProject, running, unknown, failed]);

  const tabs = useMemo(() => [
    {
      label: "Completed",
      value: "completed",
      list: batchAnalysisDetail?.projects_by_state.completed || [],
      icon: <IconCompleted />,
    },
    {
      label: "Processing",
      value: "processing",
      list: [
        ...(batchAnalysisDetail?.projects_by_state.pending || []),
        ...(batchAnalysisDetail?.projects_by_state.running || []),
      ],
      icon: <IconProcessing />,
    },
    {
      label: "Failed",
      value: "failed",
      list: batchAnalysisDetail?.projects_by_state.failed || [],
      icon: <IconFailed />,
    },
  ], [batchAnalysisDetail]);

  const [activeTab, setActiveTab] = useState<string | null>(tabs[0].value);

  const filteredProjects = () => {
    const filterList = tabs.find((item) => item.value === activeTab);
    const list = filterList?.list?.map((item) => {
      return {
        ...item,
        status: filterList.value,
        riskLevel: item.risk_score[1],
      };
    });
    const searchList = search('', list || [], [
      "project_name",
    ]);
    const risk_scoreList = search('', searchList || [], [
      "riskLevel",
    ]);
    return risk_scoreList;
  };

  const projects = filteredProjects() || [];

  return {
    projects,
    activeTab,
    setActiveTab,
    isLoading,
    refetch,
    isFetching,
    error,
    status,
    batchAnalysisDetail,
    topSectionList,
    tabs,
    isError,
  };
};
