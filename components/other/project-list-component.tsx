import { Button, Center, ScrollArea, useMantineTheme } from "@mantine/core";

import { useChat } from "@/hooks/mutate/use-chat";
import { useProject } from "@/hooks/query/chat";
import { getSortedProject } from "@/lib/helper";
import { routes } from "@/lib/routes";
import { IconTCheck } from "@/public/assets/svg/transaction/icon-t-check";
import { DianaProjectModel } from "@/types/general";
import { Box, Flex, Text, UnstyledButton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "nextjs-toploader/app";
import React, { startTransition, useState } from "react";
import { ActionModal } from "../modal/action-modal";
import { ProjectDeleteModal } from "../modal/project-delete-modal";
import { SideNavListLoader } from "../ui/sidenav-list-loader";


interface Props {
  onProjectSelect?: (project: DianaProjectModel) => void;
  session?: Session | null;

}

export const ProjectListComponent: React.FC<Props> = ({ onProjectSelect, session }) => {
  const searchParams = useSearchParams();
  const theme = useMantineTheme();

  const [showProjectDelete, setShowProjectDelete] = useState(false);
  const [selectedProjectDelete] = useState<
    DianaProjectModel["description"]
  >({});
  const project_id = searchParams.get("project_id");

  const { projects, isLoading, refetch } = useProject({
    userId: session?.user?._id || ''
  });

  const { onDeleteProject, isLoading: isDeleting } = useChat();
  const router = useRouter();

  const projectList = getSortedProject(projects);

  const onProjectClick = (link: DianaProjectModel) => {
    onProjectSelect?.(link);
    startTransition(() => {
      if (!link.completed) {
        return router.push(
          routes.diana.onboardingId(link?.description?.project_id as string)
        );
      }

      router.push(
        `${routes.diana}?diana_tab=overview&project_id=${link?.description?.project_id as string
        }`
      );
    });
  };

  if (isLoading) {
    return <SideNavListLoader />;
  }

  const ProjectItems = (link: DianaProjectModel) => {
    const isActive = project_id === link?.description?.project_id;
    return (
      <UnstyledButton
        key={link._id}
        c={isActive ? theme.colors[theme.primaryColor][3] : ""}
        className={`transition-all relative group/edit  ${isActive ? "side-nav-project-btn" : "side-nav-project-btn-inactive"
          }
           ${isActive ? `font-400 ` : "text-[#374151]"} `}
        onClick={() => {
          onProjectClick(link);
        }}
      >
        <ProjectDeleteModal
          projectDetail={link.description}
        />
        <Flex className="flex-col">
          <Text className="text-[14px]">{link?.description?.project_name}</Text>
          {!link?.completed && (
            <Text className="text-[12px] text-gray-400">Incomplete</Text>
          )}
        </Flex>
        {isActive && <IconTCheck fill={theme.colors[theme.primaryColor][3]} />}
      </UnstyledButton>
    );
  };



  return (
    <>
      {projectList.length > 0 && (
        <ScrollArea mah={300} className="overflow-scroll custom-scrollbar">
          <Box className="px-1">
            {projectList?.map((link) => {
              return ProjectItems(link);
            })}
          </Box>
          <ActionModal
            isProcessing={isDeleting}
            buttonText={"Delete Transaction"}
            message={`Deleting this transaction will result in the permanent \nloss of all associated data`}
            title={`Are you sure you want to delete ${upperFirst(
              selectedProjectDelete?.project_name as string
            )}`}
            isVisible={showProjectDelete}
            onSubmit={() => {
              onDeleteProject({
                product_id: selectedProjectDelete.project_id as string,
                cb() {
                  refetch();
                  router.push(
                    routes.diana.overview(projectList[0]?.description?.project_id as string)
                  );
                  setShowProjectDelete(false);
                },
              });
            }}
            onClose={() => {
              setShowProjectDelete(false);
            }}
          />
        </ScrollArea>
      )}
      {projectList.length === 0 && (
        <Center>
          <Flex className="flex-col py-3 gap-2">
            <Text>No Transaction</Text>
            <Button
              onClick={() => {
                router.push(routes.diana.onboarding);
              }}
              size="xs"
              variant="default"
              className="w-full !border-gray-300 shadow-sm text-gray-800 flex justify-center items-center space-x-2 gap-x-2"
            >
              {" "}
              Add New Transaction
            </Button>
          </Flex>
        </Center>
      )}
    </>
  );
};
