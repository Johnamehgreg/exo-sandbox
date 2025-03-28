import { routes } from '@/lib/routes';
import { IconCaretDown } from '@/public/assets/svg/icon-caret-down';
import { DianaProjectModel } from '@/types/general';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuDropdown,
  MenuTarget,
  ScrollArea,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';
import LoadingProjects from './loading-projects';
import NoProjects from './no-projects';

type Props = {
  isLoadingProjects: boolean;
  projects?: DianaProjectModel[];
};

const renderMenuContent = (
  isLoading: boolean,
  projects: DianaProjectModel[] = [],
  navigateTo: (route: string) => void
) => {
  if (isLoading) {
    return <LoadingProjects />;
  }

  if (projects.length === 0) {
    return <NoProjects handleNavigation={navigateTo} />;
  }

  return (
    <ScrollArea mah={300} className="overflow-scroll">
      <Box className="pl-1">
        {projects?.map((link, index) => {
          return (
            <UnstyledButton
              key={index}
              onClick={() => {
                if (!link?.completed) {
                  navigateTo(
                    `${routes.diana.onboardingId(link?.description?.project_id as string)}`
                  );
                }
                navigateTo(
                  `${routes.diana.overview(link?.description?.project_id as string)}`
                );
              }}
              className={`group/edit relative w-full px-[12px] py-[7px] transition-all hover:bg-slate-100`}
            >
              <Flex className="flex-col">
                <Text className="text-[14px]">
                  {link?.description?.project_name}
                </Text>
                {!link?.completed && (
                  <Text className="text-[12px] text-gray-400">Incomplete</Text>
                )}
              </Flex>
            </UnstyledButton>
          );
        })}
      </Box>
    </ScrollArea>
  );
};

const ProjectDropdownMenu = ({ isLoadingProjects, projects }: Props) => {
  const router = useRouter();
  const handleNavigation = (route: string) =>
    router.push(route, {
      scroll: false,
    });
  return (
    <Menu shadow="md" width={200}>
      <MenuTarget>
        <Button className="block w-[230px] font-semibold capitalize text-green-pale">
          Open Transaction
          <IconCaretDown className="ml-1" />
        </Button>
      </MenuTarget>

      <MenuDropdown className="mr-0 pr-0">
        {renderMenuContent(isLoadingProjects, projects, handleNavigation)}
      </MenuDropdown>
    </Menu>
  );
};

export default ProjectDropdownMenu;
