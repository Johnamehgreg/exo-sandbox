import { Center, Loader, Paper } from "@mantine/core";

export default function Loading() {
  return  (
    <Paper p="sm" className="h-[calc(100vh_-_100px)]">
    <Center style={{ height: '100%' }}>
      <Loader />
    </Center>
  </Paper>
  )
}