import { Center } from "@mantine/core";

export const SideNavListLoader = () => {
  return (
    <Center>
      <div className="mx-auto w-full max-w-sm rounded-md px-1">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-2 py-1">
              <div className="h-2 rounded bg-gray-200"></div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </Center>
  );
};
