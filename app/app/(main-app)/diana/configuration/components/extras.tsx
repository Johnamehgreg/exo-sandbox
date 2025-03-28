import { useUiStore } from "@/app/store/ui.store"
import { ErrorPageLayout } from "@/components/layout/error-page-layout"
import { routes } from "@/lib/routes"
import { Anchor, Box, Button, Flex, Group, Text } from "@mantine/core"
import { useRouter } from "nextjs-toploader/app"

export const SkeletonLoadingPage = () => {
    return (
        <>
            {
                [0, 0, 0,]?.map((_, index) => (
                    <Box key={index} className="p-[18px]  border-t-[1px] grid-cols-1 grid sm:grid-cols-2 md:grid-cols-3">
                        <Flex className=" h-fit items-center gap-[2px]  min-h-[40px]">
                            <Box className="w-[230px] bg-gray-100  h-2 rounded-lg  animate-pulse" />
                        </Flex>
                        <Box className="">
                            {
                                [0, 0, 0, 0].map((_, index) => (
                                    <Box key={index} className="grid grid-cols-1 sm:grid-cols-2   sm:items-center gap-[10px]"
                                        style={{
                                            marginBottom: 20
                                        }}>
                                        <Flex className=" sm:justify-end">
                                            <Box className="w-[130px] bg-gray-100  h-2 rounded-lg  animate-pulse" />
                                        </Flex>
                                        <Box className="w-[130px] bg-gray-100 h-9  rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-200 justify-start  animate-pulse" />
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                ))
            }
        </>
    )
}
export const ErrorComponent = ({ isFetching, refetch }: { isFetching: boolean, refetch: () => void }) => {
    const router = useRouter()
    const { setDashboardType } = useUiStore();

    return (
        <ErrorPageLayout
            title={'Well! This is embarrassing"'}
            message={
                <Text component="p" className="text-center whitespace-pre-line">
                    {"Error fetching "}{" "}
                    <Anchor href="mailto:support@exoai.tech" target="_blank">
                        support@exoai.tech
                    </Anchor>
                </Text>
            }
        >
            <Group className="gap-3">
                <Button loading={isFetching} onClick={refetch}>
                    {isFetching ? "Fetching..." : "Retry"}
                </Button>

                <Button
                    onClick={() => {
                        setDashboardType("dashboard");
                        router.push(routes.app.dashoard);
                    }}
                >
                    Home
                </Button>
            </Group>
        </ErrorPageLayout>
    )
}