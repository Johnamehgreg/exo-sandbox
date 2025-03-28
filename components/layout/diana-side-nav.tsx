'use client';
import { useUiStore } from '@/app/store/ui.store';
import { useDianaSide } from '@/hooks/logic/use-diana-side-hook';
import { colors } from '@/lib/app-config';
import { getProjectAbbreviation } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { IconDropDown } from '@/public/assets/svg/icon-drop-down';
import { IconArrowLeftIos } from '@/public/assets/svg/icon-left-arrow-ios';
import { IconPlus } from '@/public/assets/svg/icon-plus';
import {
  Box,
  Card,
  Collapse,
  Divider,
  Flex,
  Menu,
  MenuDropdown,
  MenuTarget, Text,
  UnstyledButton
} from '@mantine/core';
import { Session } from 'next-auth';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { TooltipNavIcon } from '../dashboard/tooltip-nav-icon';
import { CustomTab } from '../other/custom-tab';
import { ProjectListComponent } from '../other/project-list-component';
import { dianaLinks } from './extras';

interface Prop {
  onBackClick?: () => void;
  session: Session | null;

}

export const DianaSideNav = ({ onBackClick, session, }: Prop) => {
  const router = useRouter();
  const { isNavCollapse } = useUiStore();

  const {
    projectList,
    opened,
    setOpened,
    selectedProject,
    setSelectedProject,
  } = useDianaSide();
  const searchParams = useSearchParams();
  const project_name = searchParams.get('project_name')
  const pathname = usePathname();

  const segments = pathname.split('/');

  const segmentValue = segments[segments.length - 1];

  const handleNavigation = (route: string) => router.push(route);


  const projectName =
    project_name || selectedProject?.description?.project_name;

  const { projectId } = useParams();

  const headerCard = () => {
    return (
      <>
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
              >
                <TooltipNavIcon label={projectName}>
                  <div className="border-[1px] border-gray-200 bg-white border-solid shadow-sm w-12 h-12  rounded-md justify-center items-center gap-2.5 inline-flex">
                    <Text className="text-gray-800 text-base tracking-widest leading-[14px]">
                      {getProjectAbbreviation(projectName || "")}
                    </Text>
                  </div>
                </TooltipNavIcon>
              </UnstyledButton>
            </MenuTarget>
            <MenuDropdown className="pr-0 mr-0">
              <ProjectListComponent
                session={session}
                onProjectSelect={(project) => {
                  setSelectedProject(project);
                }}
              />
            </MenuDropdown>
          </Menu>
        )}

        {!isNavCollapse && (
          <Box className="side-diana-card-btn justify-between gap-1 p-[2px]">
            <Card className="w-[42px] mr-2 h-[42px]  bg-gray-100 rounded-md justify-center items-center gap-2.5 inline-flex">
              <div className="text-gray-800 text-base tracking-widest leading-[14px]">
                {getProjectAbbreviation(projectName || "")}
              </div>
            </Card>
            <Flex className="flex-col  w-full  gap-[2px] nav-collapse-item">
              <Text
                className="text-[14px] text-[#1F2937] font-[650] leading-[14px]"
                lineClamp={1}
              >
                {projectName}
              </Text>
              <Text className="text-[13px] text-[#4B5563] font-[250] leading-[14px]">
                Diana
              </Text>
            </Flex>
            <UnstyledButton
              onClick={() => setOpened(!opened)}
              className="px-[10px] h-full hover:bg-gray-50  nav-collapse-item"
            >
              <IconDropDown
                className={`${opened && "rotate-180"} transition-all`}
              />
            </UnstyledButton>
          </Box>
        )}
      </>
    );
  };
  return (
    <>
      <Box className="bg-[#F3F4F6] mb-10 rounded-[10px] px-[2px]">
        {projectList.length > 0 && (
          <Box className="relative">
            <Box
              className="absolute w-full side-project-card "
              style={{
                borderWidth: opened ? "1px" : "0px",
              }}
              mx="auto"
            >
              {headerCard()}
              <Collapse
                className="px-[0px] z-[444] bg-[#F8F9FB] rounded-lg overflow-hidden shadow-sm sticky pt-[14px] nav-collapse-item"
                in={opened}
              >
                <Box className="px-1 ">
                  <UnstyledButton
                    onClick={() => {
                      router.push(routes.diana.onboarding);
                    }}
                    className=" flex items-center gap-1"
                  >
                    <IconPlus />
                    <Text
                      className="text-[14px] text-[#1F2937] font-[650] leading-[14px] "
                      lineClamp={1}
                    >
                      New Transaction
                    </Text>
                  </UnstyledButton>
                  <Divider color="#E5E7EB" className="mt-[10px]" />
                  <Divider color="#fff" className="mb-[10px]" />
                  <Text className="text-[#9CA3AF] mb-[12px] text-[13px]">
                    Diana Transactions
                  </Text>
                </Box>

                <ProjectListComponent
                  onProjectSelect={(project) => {
                    setSelectedProject(project);
                    setOpened(!opened);
                  }}
                />
              </Collapse>
            </Box>
            {headerCard()}
          </Box>
        )}
        <Box className="px-1 my-4 pb-4">
          <UnstyledButton
            onClick={() => {
              router.push(routes.diana.onboarding);
            }}
            className={`flex items-center  w-full gap-1 ${isNavCollapse && 'justify-center'}`}
          >
            <IconPlus />
            <Text
              className="text-[14px] text-[#1F2937] font-[650] leading-[14px] nav-collapse-item"
              lineClamp={1}
            >
              New Transaction
            </Text>
          </UnstyledButton>
        </Box>
      </Box>
      <TooltipNavIcon disabled={!isNavCollapse} label={"Diana Menu"}>
        <UnstyledButton
          onClick={() => {
            onBackClick?.();
          }}
          className={`my-[10px] w-full  items-center gap-[4px] ${isNavCollapse ? "justify-center" : "justify-start"
            } j flex`}
        >
          <IconArrowLeftIos fill={colors.p1} />
          <Text className="text-[14px] nav-collapse-item font-[550]  text-gray-600   leading-[14px] tracking-widest">
            Menu{" "}
          </Text>
        </UnstyledButton>
      </TooltipNavIcon>

      <Flex className="flex-col  ">
        {selectedProject && (
          <CustomTab
            showTooltip={isNavCollapse}
            value={segmentValue}
            textClassName="nav-collapse-item "
            activeIconColor={colors.vibrantgreen}
            indicatorClassName="side-nav-link-btn"
            activeClassNameText="text-vibrantgreen"
            inactiveClassNameText="text-gray-600 font-[350] text-[14px]"
            iconWrapperClassName=" h-[25px] z-20 sticky dashboard-gray-bg w-[25px]"
            onChange={(value: string | ((val: string) => string)) => {
              if (value) {
                const route = dianaLinks.find((obj) => obj.value === value)
                handleNavigation(route?.route(projectId as string) as string)
              }
            }}
            sectionList={dianaLinks}
          />
        )}
      </Flex>
    </>
  );
};
