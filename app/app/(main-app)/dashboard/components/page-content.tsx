'use client';

import AccessAgentChecker from '@/components/other/access-agent-checker';
import { formatTimeWithTimezone } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { hasAccess } from '@/lib/utils';
import { IconArrowUpRight } from '@/public/assets/svg/icon-arrow-up-right';
import { IconDianaGreen } from '@/public/assets/svg/icon-diana-green';
import { IconFibonacciGreen } from '@/public/assets/svg/icon-fibonacci-green';
import { IconPlus } from '@/public/assets/svg/icon-plus';
import { DianaProjectModel, TimeZoneModel } from '@/types/general';
import { Box, Button, Container, Divider } from '@mantine/core';
import { Session } from 'next-auth';
import { useRouter } from 'nextjs-toploader/app';
import DianaProject from './diana-project';
import DianaProjectStats from './diana-project-stats';
import { dianaProjects } from './extras';
import FlagActionRequired from './flag-action-required';
import ProjectDropdownMenu from './project-dropdown-menu';
import FibonacciTransactionSummaryCard from './transaction-summary';

type Props = {
  session: Session | null;
  timeZoneData: TimeZoneModel | null;
  projects?: DianaProjectModel[];
  totalCompletedProjects: number;
  totalFailedProjects: number;
  isLoadingProjects: boolean;
};

const PageContent = ({
  session,
  timeZoneData,
  projects,
  totalCompletedProjects,
  totalFailedProjects,
  isLoadingProjects,
}: Props) => {
  const router = useRouter();
  const handleNavigation = (route: string) =>
    router.push(route, {
      scroll: false,
    });
  return (
    <Box className="dashboard-container-wrapper">
      <main className="flex w-full justify-center transition-all">
        <Box mx={0} className="mx-0 min-h-[100vh] w-full">
          <section className="mb-6 mt-3 min-h-[100vh] flex-grow">
            <Container size={'lg'}>
              <div className="mt-[30px] flex w-full items-center justify-between">
                <div className="grid gap-2.5">
                  <p className="text-[40px] font-medium leading-8 text-primary">
                    Hi {session?.user?.firstName}
                  </p>
                  <p className="text-[16px] text-gray-500">
                    Here are your key platform metrics for today.
                  </p>
                </div>

                {/* header */}
                {timeZoneData && (
                  <div className="flex items-end justify-end text-gray-800">
                    <p className="text-body text-[20px] font-medium">
                      {formatTimeWithTimezone(timeZoneData?.timezone)}
                    </p>
                    <span className="ml-1 text-[16px] capitalize">
                      {timeZoneData?.city || 'California'}
                    </span>
                  </div>
                )}
              </div>

              <Box className="mt-4 h-96 w-full border-l border-gray-200">
                <AccessAgentChecker
                  hasAccess={!!hasAccess('fibonacci', session)}
                >
                  <div className="relative flex h-full w-full">
                    <span className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white ring-8 ring-white">
                      <IconFibonacciGreen />
                    </span>
                    <Box className="ml-10 h-max w-full flex-1 flex-col">
                      <div className="mb-8 flex h-full w-full justify-between gap-8">
                        <div className="flex w-full justify-between">
                          <div className="w-full">
                            <div className="mb-[50px] flex items-center justify-between gap-2">
                              <div className="grid w-full gap-1">
                                <p className="text-[20px] font-bold">
                                  Fibonacci
                                </p>
                                <span className="max-w-[250px] text-[14px] leading-[20px] text-gray-600">
                                  Your AI companion for real-time operational
                                  risk monitoring
                                </span>
                              </div>
                              <Button
                                onClick={() =>
                                  handleNavigation(routes.fibonacci.overview)
                                }
                                className="block w-[230px] font-semibold capitalize text-green-pale"
                              >
                                Go to Fibonacci
                                <IconArrowUpRight className="ml-1" />
                              </Button>
                            </div>
                            <FlagActionRequired />
                          </div>
                        </div>
                        <FibonacciTransactionSummaryCard />
                      </div>
                    </Box>
                  </div>
                </AccessAgentChecker>

                <AccessAgentChecker hasAccess={!!hasAccess('diana', session)}>
                  <div className="-ml-[1px] flex h-[70px] w-full items-center border-l border-gray-200 pb-[32px]">
                    <Divider className="w-full" variant="dashed" />
                  </div>
                  <div className="w-full">
                    <div className="relative flex w-full">
                      <span className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white ring-8 ring-white">
                        <IconDianaGreen />
                      </span>
                    </div>
                    <div className="ml-10 flex items-center">
                      <div className="flex w-full items-start justify-between gap-10">
                        <div className="mb-[50px] flex w-full items-center justify-between gap-2">
                          <div className="grid w-full gap-1">
                            <p className="text-[20px] font-bold">Diana</p>
                            <span className="max-w-[250px] text-[14px] leading-[20px] text-gray-600">
                              Your AI Companion for Complex Transaction
                              Diligence.
                            </span>
                          </div>
                          <ProjectDropdownMenu
                            {...{ isLoadingProjects, projects }}
                          />
                        </div>

                        <DianaProjectStats
                          {...{
                            totalCompletedProjects,
                            totalFailedProjects,
                            isLoadingProjects,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </AccessAgentChecker>
              </Box>
              {/* projects */}
              <AccessAgentChecker hasAccess={!!hasAccess('diana', session)}>
                <Box className="mt-60 grid w-full gap-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-[20px] font-bold text-gray-800">
                      Most Recent Transactions
                    </p>

                    <Button
                      variant="transparent"
                      onClick={() => {
                        router.push(routes.diana.onboarding);
                      }}
                      className="text-vibrant-green"
                    >
                      <IconPlus className="mr-2 h-4 w-4 stroke-vibrant-green hover:bg-vibrant-green" />
                      New Transaction
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {dianaProjects?.map((project, index) => (
                      <DianaProject key={index} {...project} />
                    ))}
                  </div>
                </Box>
              </AccessAgentChecker>
            </Container>
          </section>
        </Box>
      </main>
    </Box>
  );
};

export default PageContent;
