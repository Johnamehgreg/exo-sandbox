'use client';

import { useUiStore } from '@/app/store/ui.store';
import { useGetBatchAnalysis } from '@/hooks/query/batch';
import { useProject } from '@/hooks/query/chat';
import { routes } from '@/lib/routes';
import { IconAtom } from '@/public/assets/svg/icon-atom';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import Fader from "@/public/image/fader.svg";
import { Box, Divider, Flex, Menu, MenuDropdown, MenuTarget, ScrollArea, Text, Transition, UnstyledButton } from '@mantine/core';
import { AlignBottomSimple, Folder, GearFine, ListChecks, ProjectorScreen, Stack } from '@phosphor-icons/react';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from "nextjs-toploader/app";
import { TooltipNavIcon } from '../dashboard/tooltip-nav-icon';
import { ProjectDeleteModal } from '../modal/project-delete-modal';
import { DianaSidenavItem } from '../nav/batch-sidenav-item';
import { ProjectListComponent } from '../other/project-list-component';
import { SideNavListLoader } from '../ui/sidenav-list-loader';


interface Props {
  onSingleProjectClick?: () => void;
  session: Session | null;
}

export const BatchNav: React.FC<Props> = ({ onSingleProjectClick, session }) => {
  const { projectId } = useParams();
  const { projects, isLoading } = useProject({ userId: session?.user?._id || '' });
  const projectList = projects
    ?.filter((fItem) => fItem?.description)
    ?.map((project) => {
      const projectId = project?.description?.project_id;
      const link = project.completed
        ? routes.diana.overview(projectId as string)
        : routes.diana.onboardingId(projectId as string);
      return {
        label: project?.description?.project_name,
        url: link,
        projectId: projectId as string,
        completed: project.completed,
      };
    });

  const currentProject = projectList?.find(
    (project) => projectId === project?.projectId
  );

  const { setIsNavCollapse, isNavCollapse } = useUiStore();

  const router = useRouter();
  const { batchId } = useParams()

  const { batchAnalysisList, isLoading: isBatchLoading } =
    useGetBatchAnalysis();
  const pathname = usePathname(); // Use `usePathname` instead of `useRouter` in Next.js 13+



  return (
    <Box className="w-full h-screen bg-gray-50 flex-col ">
      <Flex
        className={
          "items-center gap-x-2 rounded-lg bg-white border border-gray-300 min-h-[46px] shadow-sm p-0.5 mb-[20px]"
        }
      >
        <div
          className={`size-[44px] h-full items-center justify-center flex ${isNavCollapse ? "bg-white" : "bg-gray-100"
            } rounded-md flex items-center justify-center`}
        >
          <IconAtom />
        </div>
        <div className="nav-collapse-item">
          <Text className="leading-5 text-p1 font-semibold ">Diana</Text>
          <Text className="text-sm text-gray-500 font-thin">
            AI for Transaction Due Diligence
          </Text>
        </div>
      </Flex>

      <TooltipNavIcon label="Expand" disabled={!isNavCollapse}>
        <UnstyledButton
          onClick={() => {
            setIsNavCollapse(!isNavCollapse);
          }}
          className="h-[35px] nav-collapse-icon-wrapper  py-2.5 justify-start items-center gap-1 inline-flex"
        >
          <Text className="text-[#0cae5c] nav-collapse-item text-[12px]  leading-[14px] tracking-widest">
            Collapse
          </Text>

          <IconArrowRightIos className="size-[15px]" />
        </UnstyledButton>
      </TooltipNavIcon>

      <Transition
        mounted={currentProject ? true : false}
        transition="fade-left"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Text className="text-sm nav-collapse-item font-[350]  text-gray-500 mb-1">
              CURRENT TRANSACTION
            </Text>
            <Box className="pl-[16px] pr-6 space-y-0.5 nav-collapse-current ">
              <div className="flex  gap-3 nav-collapse-icon-wrapper">
                <div className="min-h-full w-px border-gray-200 nav-collapse-item border-r"></div>{" "}
                {/* Ensure this takes full height */}
                <div className="py-1">
                  <TooltipNavIcon
                    disabled={!isNavCollapse}
                    label={currentProject?.label}
                  >
                    <UnstyledButton
                      onClick={() => {
                        onSingleProjectClick?.();
                      }}
                      className="batch-collapse-link-item items-center text-green-600 "
                    >
                      <ProjectorScreen size={18} />
                      <Box className="nav-collapse-item">
                        {currentProject?.label}
                        {!currentProject?.completed && (
                          <Text className="text-[12px] text-gray-400">
                            Incomplete
                          </Text>
                        )}
                      </Box>
                    </UnstyledButton>
                  </TooltipNavIcon>
                </div>
              </div>
            </Box>
          </div>
        )}
      </Transition>
      <Divider className="my-[10px] border-gray-100 nav-collapse-item" />
      <ScrollArea
        scrollbarSize={4}
        className="flex-1 custom-scrollbar gap-4 "
      >


        <TooltipNavIcon disabled={!isNavCollapse} label={"Overview"}>
          <Link
            href={routes.diana.dianaOverview}
            className="batch-collapse-link justify-start"
            data-is-active={pathname.startsWith(routes.diana.dianaOverview)}
          >
            <>
              <Stack weight="duotone" size={18} />
              {pathname.startsWith(routes.diana.dianaOverview) && (
                <Image alt='' src={Fader} className="absolute -left-24 -z-1" />
              )}
              <Text className="nav-collapse-item text-[14px]">Overview</Text>
            </>
          </Link>
        </TooltipNavIcon>

        <DianaSidenavItem
          url={routes.diana.batchHome}
          label="Batch Analysis"
          count={`${batchAnalysisList?.length}`}
          onClick={() => {
            router.push(routes.diana.batchHome);
          }}
          Icon={<ListChecks weight="duotone" size={18} />}

        >
          <>
            {isBatchLoading && <SideNavListLoader />}
            {batchAnalysisList?.map(({ batch_name, batch_id }) => {
              const isActive = batch_id === batchId;
              return (
                <Link
                  key={batch_id}
                  href={routes.diana.batchDetail(batch_id)}
                  className="batch-collapse-link-item relative w-full"
                  data-is-active={isActive}
                >
                  <Transition
                    mounted={isActive}
                    transition="pop"
                    duration={400}
                    timingFunction="ease"
                  >
                    {(styles) => (
                      <Box style={styles} className="batch-link-indicator" />
                    )}
                  </Transition>
                  <Folder size={18} />
                  <Box>{batch_name}</Box>
                </Link>
              );
            })}
          </>
        </DianaSidenavItem>

        {isNavCollapse && (
          <Menu
            withArrow
            transitionProps={{ transition: "fade-down", duration: 300 }}
            width={200}
          >
            <MenuTarget>
              <UnstyledButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="batch-collapse-link  nav-collapse-icon-wrapper"
              >
                <TooltipNavIcon label={"Single Transactions"}>
                  <Box className="flex flex-1 gap-x-2 nav-collapse-icon-wrapper  items-center text-[14px]">
                    <AlignBottomSimple weight="duotone" size={18} />
                  </Box>
                </TooltipNavIcon>
              </UnstyledButton>
            </MenuTarget>
            <MenuDropdown className="pr-0 mr-0">
              <ProjectListComponent session={session} />
            </MenuDropdown>
          </Menu>
        )}

        {!isNavCollapse && (
          <DianaSidenavItem
            label="Single Transactions"
            onClick={() => { }}
            count={`${projectList.length}`}
            Icon={<AlignBottomSimple weight="duotone" size={18} />}

          >
            <>
              {isLoading && <SideNavListLoader />}
              {!isLoading &&
                projectList?.map(
                  ({ label, url, projectId: project_id, completed }, index) => {
                    const isActive = projectId === project_id;
                    return (
                      <Link
                        key={index}
                        onClick={() => {
                          onSingleProjectClick?.();
                        }}
                        href={url}
                        className="batch-collapse-link-item relative group/edit"
                        data-is-active={isActive}
                      >
                        <ProjectorScreen size={18} />
                        <ProjectDeleteModal
                          projectDetail={{
                            project_name: label,
                            project_id: projectId as string,
                          }}
                        />
                        <Box>
                          {label}
                          {!completed && (
                            <Text className="text-[12px] text-gray-400">
                              Incomplete
                            </Text>
                          )}
                        </Box>
                      </Link>
                    );
                  }
                )}
            </>
          </DianaSidenavItem>
        )}
        <Divider className="my-[10px]" />
        <TooltipNavIcon disabled={!isNavCollapse} label={"Configuration"}>
          <Link
            href={routes.diana.dianaConfiguration}
            className="batch-collapse-link justify-start"
            data-is-active={pathname.startsWith(routes.diana.dianaConfiguration)}
          >
            <>
              <GearFine weight="duotone" size={18} />
              {pathname.startsWith(routes.diana.dianaConfiguration) && (
                <Image alt='' src={Fader} className="absolute -left-24 -z-1" />
              )}
              <Text className="nav-collapse-item text-[14px]">Configuration</Text>
            </>
          </Link>
        </TooltipNavIcon>
      </ScrollArea>
    </Box>
  );
};
