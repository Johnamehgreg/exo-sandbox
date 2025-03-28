'use client';
import { env } from '@/env';
import { useChat } from '@/hooks/mutate/use-chat';
import { useProject } from '@/hooks/query/chat';
import { colors } from '@/lib/app-config';
import { routes } from '@/lib/routes';
import { IconArrowLeft } from '@/public/assets/svg/icon-arrow-left';
import { IconCloseCircle } from '@/public/assets/svg/icon-close-circle';
import { IconCritical } from '@/public/assets/svg/icon-critical';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { IconPlus } from '@/public/assets/svg/icon-plus';
import { IconTCheck } from '@/public/assets/svg/transaction/icon-t-check';
import { DianaProjectModel } from '@/types/general';
import {
  Box,
  Collapse,
  Divider,
  Flex,
  ScrollArea,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { upperFirst, useClickOutside } from '@mantine/hooks';
import { Session } from 'next-auth';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState, useTransition } from 'react';
import { ActionModal } from '../modal/action-modal';
import { CustomTab } from '../other/custom-tab';
import { dianaLinks } from './extras';

interface Prop {
  onBackClick?: () => void;
  session: Session | null;
}

export const DianaSideNav = ({ onBackClick, session }: Prop) => {
  const { projectId } = useParams();
  const router = useRouter();
  const theme = useMantineTheme();
  const [selectedProject, setSelectedProject] = useState<
    DianaProjectModel | undefined | null
  >(null);
  const { onDeleteProject, isLoading } = useChat();
  const [showProjectDelete, setShowProjectDelete] = useState(false);
  const [selectedProjectDelete, setSelectedProjectDelete] = useState<
    DianaProjectModel['description']
  >({});
  const [opened, setOpened] = useState(false);

  const { projects, refetch } = useProject({ userId: session?.user?._id || '' });
  const projectList = projects
    ?.filter((fItem) => fItem?.description)
    ?.sort((a, b) => {
      const aCompleted = a.completed ? 1 : 0;
      const bCompleted = b.completed ? 1 : 0;
      return bCompleted - aCompleted;
    });
  const ref = useClickOutside(() => setOpened(false));
  const [, startTransition] = useTransition();
  const pathname = usePathname();

  const handleNavigation = (route: string) => router.push(route);

  useEffect(() => {
    if (projectList && !selectedProject && !projectId) {
      setSelectedProject(projectList.filter((fItem) => fItem?.description)[0]);
    } else if (projectId && !selectedProject) {
      const searchProject = projectList?.find(
        (obj) => obj?.description?.project_id === projectId
      );
      if (searchProject)
        return setSelectedProject(searchProject as DianaProjectModel);
      setSelectedProject(projectList?.filter((fItem) => fItem?.description)[0]);
    } else if (!projectId && projectList?.length) {
      setSelectedProject(projectList?.[0]);
      handleNavigation(
        routes.diana.overview(
          projectList?.[0]?.description?.project_id as string
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectList]);
  return (
    <>
      {env.NEXT_PUBLIC_ENABLE_BATCH_ANALYSIS && (
        <UnstyledButton
          onClick={() => {
            onBackClick?.();
          }}
          className="mb-4 flex items-center gap-[14px]"
        >
          <IconArrowLeft fill={colors.p1} />
          <Text className="text-[14px] font-[550] text-p1">Diana Menu </Text>
        </UnstyledButton>
      )}
      <Box className="mb-10 rounded-[10px] bg-[#F3F4F6] px-[2px]">
        {projectList?.length && (
          <Box className="relative">
            <Box
              ref={ref}
              className="side-project-card absolute w-full"
              style={{
                borderWidth: opened ? '1px' : '0px',
              }}
              mx="auto"
            >
              <UnstyledButton
                onClick={() => setOpened(!opened)}
                className="side-diana-card-btn px-[12px]"
              >
                <Box className="pr-2">
                  <IconCritical
                    fill={opened ? theme.colors[theme.primaryColor][3] : ''}
                  />
                </Box>
                <Flex className="w-full flex-col gap-[2px]">
                  <Text
                    className="text-[14px] font-[650] leading-[14px] text-[#1F2937]"
                    lineClamp={1}
                  >
                    {selectedProject?.description?.project_name}
                  </Text>
                  <Text className="text-[13px] font-[250] leading-[14px] text-[#4B5563]">
                    Diana
                  </Text>
                </Flex>
                <Box className="pl-2">
                  <IconDropDown
                    className={`${opened && 'rotate-180'} transition-all`}
                  />
                </Box>
              </UnstyledButton>

              <Collapse
                className="sticky z-[444] overflow-hidden rounded-lg bg-[#F8F9FB] px-[0px] pt-[14px] shadow-sm"
                in={opened}
              >
                <Box className="px-1">
                  <UnstyledButton
                    onClick={() => {
                      handleNavigation(routes.diana.onboarding);
                    }}
                    className="flex items-center gap-1"
                  >
                    <IconPlus />
                    <Text
                      className="text-[14px] font-[650] leading-[14px] text-[#1F2937]"
                      lineClamp={1}
                    >
                      New Transaction
                    </Text>
                  </UnstyledButton>
                  <Divider color="#E5E7EB" className="mt-[10px]" />
                  <Divider color="#fff" className="mb-[10px]" />
                  <Text className="mb-[12px] text-[13px] text-[#9CA3AF]">
                    Diana Transactions
                  </Text>
                </Box>

                <ScrollArea
                  scrollbarSize={0}
                  className="custom-scrollbar overflow-y-scroll pb-2"
                  mah={300}
                >
                  <Box className="px-1">
                    {projectList?.map((link) => {
                      const isActive =
                        projectId === link?.description?.project_id;
                      return (
                        <UnstyledButton
                          key={link?.description?.project_id}
                          c={
                            isActive ? theme.colors[theme.primaryColor][3] : ''
                          }
                          className={`group/edit relative transition-all ${isActive
                            ? 'side-nav-project-btn'
                            : 'side-nav-project-btn-inactive'
                            } ${isActive ? `font-400` : 'text-[#374151]'} `}
                          onClick={() => {
                            startTransition(() => {
                              setSelectedProject(link as DianaProjectModel);
                              if (!link.completed)
                                return handleNavigation(
                                  routes.diana.onboardingId(
                                    link?.description?.project_id as string
                                  )
                                );
                              handleNavigation(
                                routes.diana.overview(
                                  link?.description?.project_id as string
                                )
                              );
                            });
                          }}
                        >
                          <Box
                            onClick={(e) => {
                              startTransition(() => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowProjectDelete(true);
                                setSelectedProjectDelete(link?.description);
                              });
                            }}
                            className="absolute right-[0px] top-[50%] z-20 translate-y-[-50%] transition-all group-hover/edit:block md:hidden"
                          >
                            <IconCloseCircle
                              style={{
                                transform: 'scale(1.1)',
                              }}
                              fill="#9E2B25"
                            />
                          </Box>
                          <Flex className="flex-col">
                            <Text className="text-[14px]">
                              {link?.description?.project_name}
                            </Text>
                            {!link?.completed && (
                              <Text className="text-[12px] text-gray-400">
                                Incomplete
                              </Text>
                            )}
                          </Flex>
                          {isActive && (
                            <IconTCheck
                              fill={theme.colors[theme.primaryColor][3]}
                            />
                          )}
                        </UnstyledButton>
                      );
                    })}
                  </Box>
                </ScrollArea>
              </Collapse>
            </Box>
            <UnstyledButton
              onClick={() => setOpened(true)}
              className="side-diana-card-btn px-[12px]"
            >
              <Box className="pr-2">
                <IconCritical />
              </Box>
              <Flex className="w-full flex-col gap-[2px]">
                <Text
                  className="text-[14px] font-[650] leading-[14px] text-[#1F2937]"
                  lineClamp={1}
                >
                  {selectedProject?.description?.project_name}
                </Text>
                <Text className="text-[13px] font-[250] leading-[14px] text-[#4B5563]">
                  Diana
                </Text>
              </Flex>
              <Box className="pl-2">
                <IconDropDown />
              </Box>
            </UnstyledButton>
          </Box>
        )}
        <Flex className="h-[50px] items-center justify-center">
          <UnstyledButton
            onClick={() => {
              handleNavigation(routes.diana.onboarding);
            }}
            className="flex items-center justify-center gap-[6px]"
          >
            <IconPlus />
            <Text
              className="text-[14px] font-[650] leading-[14px] text-[#1F2937]"
              lineClamp={1}
            >
              Add Transaction
            </Text>
          </UnstyledButton>
        </Flex>
      </Box>

      <Flex className="flex-col">
        <CustomTab
          value={pathname}
          activeIconColor={colors.vibrantgreen}
          indicatorClassName="side-nav-link-btn"
          activeClassNameText="text-vibrantgreen"
          inactiveClassNameText="text-gray-600 font-[350] text-[14px]"
          iconWrapperClassName="h-[25px] z-20 sticky dashboard-gray-bg w-[25px]"
          onChange={(value: string | ((val: string) => string)) => {
            if (typeof value === 'function') {
              return handleNavigation(value(projectId as string));
            }
            return handleNavigation(value);
          }}
          sectionList={dianaLinks}
        />
      </Flex>

      <ActionModal
        isProcessing={isLoading}
        buttonText={'Delete Transaction'}
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
              handleNavigation(
                routes.diana.overview(
                  projectList?.[0]?.description?.project_id as string
                )
              );
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
