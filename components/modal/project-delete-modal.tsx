import { useChat } from "@/hooks/mutate/use-chat";
import { IconCloseCircle } from "@/public/assets/svg/icon-close-circle";
import { DianaProjectModel } from "@/types/general";
import { ActionIcon } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { startTransition, useState } from "react";
import { ActionModal } from "./action-modal";

export const ProjectDeleteModal = ({
  projectDetail,
  onSuccess,
}: {
  projectDetail: DianaProjectModel["description"];
  onSuccess?: () => void;
}) => {
  const [showProjectDelete, setShowProjectDelete] = useState(false);
  const [selectedProjectDelete, setSelectedProjectDelete] = useState<
    DianaProjectModel["description"]
  >({});
  const { onDeleteProject, isLoading: isDeleting } = useChat();
  return (
    <>
      <ActionIcon
        onClick={(e) => {
          startTransition(() => {
            e.stopPropagation();
            setShowProjectDelete(true);
            setSelectedProjectDelete(projectDetail);
          });
        }}
        className="top-[50%] translate-y-[-50%] right-[0px] hidden  z-40 transition-all group-hover/edit:block absolute "
        variant="transparent"
      >
        <IconCloseCircle
          style={{
            transform: "scale(1.3)",
          }}
          fill="#9E2B25"
        />
      </ActionIcon>
      <ActionModal
        isProcessing={isDeleting}
        buttonText={"Delete Project"}
        message={`Deleting this project will result in the permanent \nloss of all associated data`}
        title={`Are you sure you want to delete ${upperFirst(
          selectedProjectDelete?.project_name as string
        )}`}
        isVisible={showProjectDelete}
        onSubmit={() => {
          onDeleteProject({
            product_id: selectedProjectDelete.project_id as string,
            cb() {
              onSuccess?.();
              setShowProjectDelete(false);
            },
          });
        }}
        onClose={() => {
          setShowProjectDelete(false);
        }}
      />
    </>
  );
};
