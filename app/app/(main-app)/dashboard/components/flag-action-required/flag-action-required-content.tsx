import MarkdownWithLatex from '@/components/other/mark-down-with-latex';
import { routes } from '@/lib/routes';
import { ExoBackgroundSide } from '@/public/assets/svg/exo-background-side';
import { IconArrowRightIos } from '@/public/assets/svg/icon-right-arrow-ios';
import { Box, Button, Card, Flex, Transition } from '@mantine/core';
import { useRouter } from 'nextjs-toploader/app';
import pluralize from 'pluralize';

type Props = {
  isLoading: boolean;
  flaggedTransactionsLast24HrsCount?: number;
};

const FlagActionRequiredContent = ({
  isLoading,
  flaggedTransactionsLast24HrsCount,
}: Props) => {
  const router = useRouter();
  const handleNavigation = (route: string) => router.push(route);

  if (flaggedTransactionsLast24HrsCount! < 1) return null
  
  return (
    <Box>
      <Transition
        mounted={!isLoading && !!flaggedTransactionsLast24HrsCount}
        transition="fade-left"
        duration={400}
        timingFunction="ease"
        enterDelay={500}
      >
        {(styles) => (
          <Box style={styles}>
            <div className="w-full flex-1">
              <p className="mb-2 text-[14px] font-medium text-gray-600">
                Requires Action
              </p>
              <div className="grid gap-2">
                <Flex className="gap-2">
                  <Card
                    p={0}
                    className="relative w-full overflow-hidden rounded-[12px] border-[1px] border-solid border-gray-300"
                  >
                    <ExoBackgroundSide className="absolute left-0 top-5" />
                    <Box className="!border-l-[4px] border-vibrant-green bg-gray-50 !p-[10px]">
                      <div className="grid grid-cols-[11fr_3fr] items-start justify-between">
                        <Box className="text-color-l markdown-format mb-[11px] break-words text-[14px] leading-[18px]">
                          <MarkdownWithLatex
                            content={`${flaggedTransactionsLast24HrsCount} ${pluralize('transaction', flaggedTransactionsLast24HrsCount)} flagged for review in the last 24 hours.`}
                          />
                        </Box>
                      </div>

                      <Button
                        rightSection={<IconArrowRightIos fill="#0CAE5C" />}
                        className="rounded-[4px] border-gray-300 !text-vibrant-green hover:!text-vibrant-green"
                        onClick={() =>
                          handleNavigation(routes.fibonacci.transactions)
                        }
                        variant="default"
                        size="xs"
                      >
                        Review Transactions
                      </Button>
                    </Box>
                  </Card>
                </Flex>
              </div>
            </div>
          </Box>
        )}
      </Transition>
    </Box>
  );
};

export default FlagActionRequiredContent;
