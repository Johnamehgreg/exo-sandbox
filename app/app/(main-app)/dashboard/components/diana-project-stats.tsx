import { DianaProjectOverlay } from '@/public/assets/svg/diana-project-overlay';
import { IconUpArrowRight } from '@/public/assets/svg/icon-up-arrow-right';
import { Box, Skeleton, Transition } from '@mantine/core';

type Props = {
  totalCompletedProjects: number;
  totalFailedProjects: number;
  isLoadingProjects: boolean;
};

const DianaProjectStats = ({
  totalCompletedProjects,
  totalFailedProjects,
  isLoadingProjects,
}: Props) => {
  return (
    <Box className="w-full">
      <Transition
        mounted={isLoadingProjects}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
            <div className="flex w-full items-center gap-2.5 lg:justify-end">
              <Skeleton height={136} radius="md" animate />
              <Skeleton height={136} radius="md" animate />
            </div>
          </Box>
        )}
      </Transition>
      <Transition
        mounted={!isLoadingProjects}
        transition="fade-left"
        duration={400}
        timingFunction="ease"
        enterDelay={500}
      >
        {(styles) => (
          <div
            style={styles}
            className="flex w-full items-center gap-2.5 lg:justify-end"
          >
            <div className="w-full rounded-md bg-gray-100 p-4">
              <div className="grid">
                <p className="mb-2 text-[36px] font-bold text-gray-800">
                  {totalCompletedProjects < 10
                    ? `0${totalCompletedProjects}`
                    : totalCompletedProjects}
                </p>
                <p className="text-[14px] text-gray-600">
                  Transactions
                  <br />
                  Created
                </p>
              </div>
            </div>
            <div className="relative w-full rounded-md bg-gray-100 p-4">
              <DianaProjectOverlay className="absolute bottom-0 left-0" />
              <div className="grid">
                <div className="flex w-full items-center justify-between">
                  <p className="mb-2 text-[36px] font-bold text-error-600">
                    {totalFailedProjects < 10
                      ? `0${totalFailedProjects}`
                      : totalFailedProjects}
                  </p>

                  <IconUpArrowRight className="h-8 w-8" />
                </div>

                <p className="text-[14px] text-gray-600">
                  Critical transaction <br /> Insights
                </p>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Box>
  );
};

export default DianaProjectStats;
