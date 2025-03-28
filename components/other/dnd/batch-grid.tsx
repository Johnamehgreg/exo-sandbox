import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { useBatchProject } from "@/hooks/logic/use-batch-project";
import { IconPlus } from "@/public/assets/svg/icon-plus";
import { BatchProjectModelTest, ProjectErrors } from "@/types/general";
import { Center, Container, UnstyledButton } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import DataNotFound from "../DataNotFound";
import SortableItem from "./SortableItem";

export const BatchGrid = ({
  projectErrors,
  projectList,
  setProjectList,
}: {
  projectErrors: { [key: number]: ProjectErrors };
  projectList: BatchProjectModelTest[],
  setProjectList: React.Dispatch<React.SetStateAction<BatchProjectModelTest[]>>
}) => {
  const {
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    onAddProject,
    activeItem,
    activeId,
    sensors,
    onDelete,
  } = useBatchProject({ setProjectList, projectList });
  const searchParams = useSearchParams()

  const batch_query = searchParams.get('batch_query') || ''
  const filteredItems = projectList?.filter((item) =>
    (item?.project_name || "")
      ?.toLowerCase()
      .includes((batch_query || "").toLowerCase())
  );
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <Container
          fluid
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xxl:grid-cols-4 p-4 gap-4  overflow-y-auto"
        >
          <SortableContext
            items={projectList?.map((item) => item.id) || []}
            strategy={rectSortingStrategy}
          >
            {filteredItems?.map((item, index) => (
              <SortableItem
                projectList={projectList}
                setProjectList={setProjectList}
                index={index}
                onDelete={onDelete}
                item={item}
                key={item.id}
                projectErrors={projectErrors}
              />
            ))}
            <DragOverlay>
              {activeId ? (
                <SortableItem
                  projectList={projectList}
                  projectErrors={projectErrors}
                  item={activeItem as BatchProjectModelTest}
                  isOverlay
                />
              ) : null}
            </DragOverlay>
          </SortableContext>
          {
            batch_query?.trim().length > 0 || !batch_query && (
              <UnstyledButton
                onClick={onAddProject}
                className="batch-project-add-card"
              >
                <IconPlus />
                Add Transaction
              </UnstyledButton>
            )
          }


        </Container>
        {
          projectList?.length === 0 && batch_query?.trim().length > 0 && (
            <Center className=" w-full min-h-[50vh]">
              <DataNotFound message="No Transaction Found" />
            </Center>
          )
        }
      </DndContext>
    </>
  );
};
