import { useChat } from "@/hooks/mutate/use-chat";
import { IconCloseCircle } from "@/public/assets/svg/icon-close-circle";
import { BatchAnalysis, DianaProjectModel } from "@/types/general";
import { ActionIcon } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { startTransition, useState } from "react";
import { ActionModal } from "./action-modal";
import { useBatch } from "@/hooks/mutate/use-batch";

export const BatchDeleteModal = ({
  batchDetail,
  onSuccess,
}: {
  batchDetail: BatchAnalysis;
  onSuccess?: () => void;
}) => {
  const [showBatchDelete, setShowBatchDelete] = useState(false);
  const [selectedBatchDelete, setSelectedBatchDelete] = useState<
    BatchAnalysis | null
  >(null);
  const { onDeleteBatch, isLoading: isDeleting } = useBatch();
  return (
    <>
      <ActionIcon
        onClick={(e) => {
          startTransition(() => {
            e.stopPropagation();
            setShowBatchDelete(true);
            setSelectedBatchDelete(batchDetail);
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
        buttonText={"Delete Batch"}
        message={`Deleting this batch will result in the permanent \nloss of all associated data`}
        title={`Are you sure you want to delete ${upperFirst(
          selectedBatchDelete?.batch_name as string
        )}`}
        isVisible={showBatchDelete}
        onSubmit={() => {
          onDeleteBatch({
            batch_id: selectedBatchDelete?.batch_id as string,
            cb() {
              onSuccess?.();
              setShowBatchDelete(false);
            },
          });
        }}
        onClose={() => {
          setShowBatchDelete(false);
        }}
      />
    </>
  );
};
