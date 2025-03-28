import React, { useState } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Progress, Text, Menu, Anchor, Flex,  ActionIcon } from "@mantine/core";
import { ClockCountdown } from "@phosphor-icons/react";
import { BatchAnalysis } from "@/types/general";
import { BatchStatusCard } from "./batch-status-card";
import { ActionModal } from "@/components/modal/action-modal";
import { IconFailedRed } from "@/public/assets/svg/icon-failed-red";
import { IconArrowSlant } from "@/public/assets/svg/icon-arrow-slant";
import { IconVerticalStack } from "@/public/assets/svg/icon-vertical-stack";
import { upperFirst } from "@mantine/hooks";
import { useBatch } from "@/hooks/mutate/use-batch";
import { useRouter } from "nextjs-toploader/app";
import { routes } from "@/lib/routes";

// Define the types for the data

const getStatusColor = (status: BatchAnalysis["status"]) => {
  switch (status) {
    case "failed":
      return "#dc2626";
    case "completed":
      return "#16A34A";
    case "ongoing":
      return "#0284c7";
    case "paused":
      return "#EA580C";
    default:
      return "gray";
  }
};

const getEstimatedTime = (status: BatchAnalysis["status"], value: string) => {
  const time = parseInt(value, 10);
  const estimate = `${value} min${time > 1 ? "s" : ""}`;
  switch (status) {
    case "completed":
      return `${estimate} ago`;
    case "ongoing":
      return estimate;
    case "paused":
      return estimate;
    case "failed":
      return "-";
    default:
      return estimate;
  }
};

// Define the columns for the table
const columns: ColumnDef<BatchAnalysis>[] = [
  {
    header: "Batch",
    accessorFn: (row) => ({
      name: row?.batch_name,
      date: format(new Date(`${row?.date_created}`), "MMM dd, yyyy @ h:mm a"),
    }),
    cell: ({ getValue }) => {
      const value = getValue() as { name: string; date: Date };
      return (
        <div>
          <span className="text-gray-700 font-semibold">{value.name}</span>
          <div className="text-[13px] text-gray-500 font-normal">
            {format(value.date, "MMM dd, yyyy '@'h:mm a")}
          </div>
        </div>
      );
    },
  },
  {
    header: "Progress",
    accessorKey: "progress",
    cell: ({ row }) => {
      const progress = row?.original?.progress || 0;
      const status = row?.original?.status;
      const color = getStatusColor(status);
      const completed = row?.original?.completed_projects || 0;
      const total = row?.original?.total_projects || 0;
      return (
        <div className="flex items-center h-fit">
          <div className="w-[160px] mr-2">
            <Progress value={progress} color={color} size="sm" />
          </div>
          <div className="flex items-center gap-x-1">
            <span className=" text-gray-700 font-semibold">
              {progress}%
            </span>
            <span className=" font-normal text-gray-600 text-[13px]">
              ({completed}/{total})
            </span>
          </div>
        </div>
      );
    },
  },

  {
    header: "Failed Analyses",
    accessorKey: "failed_analyses",
    cell: ({ row }) => {
      const failed_analyses = row?.original?.failed_projects || 0;
      return (
        <div>
          <span className="text-gray-700">{failed_analyses}</span>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const status = getValue() as BatchAnalysis["status"];
      return (
        <>
          <BatchStatusCard status={status} />
        </>
      );
    },
  },
  {
    header: "Est. Completion Time",
    accessorKey: "estimated_completion_time",
    cell: ({ row }) => {
      const status = row?.original?.status;
      const estimated_completion_time =
        row?.original?.estimated_completion_time;

      return (
        <Text className="flex w-fit items-center gap-1 px-2 h-6 rounded-full text-[14px] bg-white border border-gray200 text-gray-700">
        {" "}
        <ClockCountdown weight="regular" />{" "}
        {getEstimatedTime(status, estimated_completion_time)}
      </Text>
      );
    },
  },
  {
    header: "Action",
    accessorKey: "status",
    cell: ({ row }) => {
      return (
        <ProjectActions
          batchDetail={row.original}
        />
      );
    },
  },
];

// Sample data

interface Props {
  batchList: BatchAnalysis[];
}

const BatchAnalysisTable: React.FC<Props> = ({ batchList }) => {
  // const navigate = useNavigate();
  const table = useReactTable({
    data: batchList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


 

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-[8px] shadow">
      <table className="min-w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 h-10  bg-gray-50 text-left min-w-[150px] text-[12px] font-semibold text-gray-600 uppercase"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="text-sm "
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4  py-2 border-t border-gray-100 min-w-[150px] h-16 text-[14px]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatchAnalysisTable;



interface BatchActionsProps {
  batchDetail: BatchAnalysis;
}

const ProjectActions: React.FC<BatchActionsProps> = React.memo(({
  batchDetail
}) => {
  const router = useRouter()
  const [showBatchDelete, setShowBatchDelete] = useState(false);
  const { onDeleteBatch, isLoading: isDeleting } = useBatch();

  return (
    <Flex>
      <Menu withArrow>
        <Menu.Target>
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
            bg={"transparent"}
          >
            <IconVerticalStack fill="#98A2B3" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
        <Menu.Item
              leftSection={<IconArrowSlant />}
              onClick={(e) => {
                e.stopPropagation();
                router.push(routes.diana.batchDetail(batchDetail.batch_id))
              }}
              component="a"
              target="_blank"
              className="text-[12px] font-normal min-w-[130px]"
            >
              Open Batch
            </Menu.Item>


          <Menu.Item
            leftSection={<IconFailedRed />}
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              setShowBatchDelete(true);
            }}
            className="text-[12px] font-normal min-w-[130px]"
          >
            Delete Batch
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <ActionModal
        isProcessing={isDeleting}
        buttonText={"Delete Batch"}
        message={`Deleting this batch will result in the permanent \nloss of all associated data`}
        title={`Are you sure you want to delete ${upperFirst(
          batchDetail?.batch_name as string
        )}`}
        isVisible={showBatchDelete}
        onSubmit={() => {
          onDeleteBatch({
            batch_id: batchDetail?.batch_id as string,
            cb() {
              setShowBatchDelete(false);
            },
          });
        }}
        onClose={() => {
          setShowBatchDelete(false);
        }}
      />
    </Flex>
  );
});

ProjectActions.displayName = "ProjectActions";
