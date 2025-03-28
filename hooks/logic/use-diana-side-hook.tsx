import { routes } from "@/lib/routes";
import { DianaProjectModel } from "@/types/general";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useBatch } from "../mutate/use-batch";
import { useChat } from "../mutate/use-chat";
import { useGetSingleBatchAnalysis } from "../query/batch";
import { useProject } from "../query/chat";

export const useDianaSide = () => {
  const [selectedProject, setSelectedProject] =
    useState<DianaProjectModel | null>(null);
  const { onDeleteProject, isLoading } = useChat();
  const [showProjectDelete, setShowProjectDelete] = useState(false);
  const [selectedProjectDelete, setSelectedProjectDelete] = useState<
    DianaProjectModel["description"]
  >({});
  const [opened, setOpened] = useState(false);
  const router = useRouter()


  const { projects, refetch } = useProject({ userId: '' as string });
  const projectList = projects
    ?.filter((fItem) => fItem?.description)
    ?.sort((a, b) => {
      const aCompleted = a.completed ? 1 : 0;
      const bCompleted = b.completed ? 1 : 0;
      return bCompleted - aCompleted;
    });
  const [, startTransition] = useTransition();
  const { projectId } = useParams()
  const project_id = projectId;

  useEffect(() => {
    if (projectList && !selectedProject && !project_id) {
      setSelectedProject(projectList.filter((fItem) => fItem?.description)[0]);
    } else if (project_id && !selectedProject) {
      const searchProject = projectList?.find(
        (obj) => obj?.description?.project_id === project_id
      );
      if (searchProject)
        return setSelectedProject(searchProject as DianaProjectModel);
      setSelectedProject(projectList.filter((fItem) => fItem?.description)[0]);
    } else if (!project_id && projectList.length > 0) {
      setSelectedProject(projectList[0]);
      router.push(routes.diana.overview(projectList[0]?.description?.project_id as string))
    }
  }, [projectList]);



  return {
    projectList,
    opened,
    setOpened,
    selectedProject,
    project_id,
    startTransition,
    setShowProjectDelete,
    setSelectedProjectDelete,
    isLoading,
    selectedProjectDelete,
    onDeleteProject,
    refetch,
    showProjectDelete,
    setSelectedProject,
  };
};

interface UseProjectActionsProps {
  projectId: string;
}

export const useBatchTable = ({ projectId, }: UseProjectActionsProps) => {
  const param = useParams();
  const batchId = param.batchId;
  const [showDelete, setShowDelete] = useState(false);
  const { onDeleteBatchProject, isLoading } = useBatch();
  const { refetch } = useGetSingleBatchAnalysis({ id: batchId as string, });

  return {
    batchId,
    setShowDelete,
    showDelete,
    onDeleteBatchProject,
    isLoading,
    refetch,
  }
}