import { RiskBadge } from "@/components/diana/overview/risk-badge";
import { ActionModal } from "@/components/modal/action-modal";
import { useBatchTable } from "@/hooks/logic/use-diana-side-hook";
import { getProjectLink } from "@/lib/helper";
import { IconArrowSlant } from "@/public/assets/svg/icon-arrow-slant";
import { IconFailedRed } from "@/public/assets/svg/icon-failed-red";
import { IconVerticalStack } from "@/public/assets/svg/icon-vertical-stack";
import { Project } from "@/types/general";
import { ActionIcon, Anchor, Box, Flex, Menu, Text } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { BuildingApartment, Lightning } from "@phosphor-icons/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { ProjectStatusCard } from "./project-status-card";

interface Props {
  projectList: Project[];
}

const ProjectListTable: React.FC<Props> = ({ projectList }) => {
  const columns: ColumnDef<Project>[] = useMemo(
    () => [
      {
        header: "Transaction id",
        accessorKey: "project_id",
        cell: ({ row }) => {
          const projectId = row.original.project_id;
          const status = row.original.status;
          const link = getProjectLink({ projectId: projectId, completed: status === 'completed' });

          if (status === "completed")
            return (
              <Anchor target="_blank" href={link}>
                <Text className="text-gray-800 text-[14px] font-[450] hover:underline leading-[18px]">
                  {projectId}
                </Text>
              </Anchor>
            );
          return (
            <Text className="text-gray-800 text-[14px] font-[450] leading-[18px]">
              {projectId}
            </Text>
          );
        },
      },
      {
        header: "Transaction",
        accessorKey: "project_name",
        cell: ({ getValue }) => {
          const projectName = getValue() as Project["project_name"];
          return (
            <Text className="text-gray-800 text-[14px] font-[450] leading-[18px]">
              {projectName}
            </Text>
          );
        },
      },
      {
        header: "sector",
        accessorKey: "sector",
        cell: ({ getValue }) => {
          const sector = (getValue() as Project["sector"]).toLowerCase();
          return (
            <Box>
              {sector == "realestate" && (
                <span className="inline-flex gap-x-1 items-center px-1 h-5 rounded-[4px] border border-gray-300 bg-fuchsia-100 text-fuchsia-600 font-medium capitalize">
                  <BuildingApartment weight="fill" /> Real Estate
                </span>
              )}
              {sector == "energy" && (
                <span className="inline-flex gap-x-1 items-center px-1 h5 rounded-[4px] border border-gray-300 bg-green-100 text-green-600 font-medium capitalize">
                  <Lightning weight="fill" /> Energy
                </span>
              )}

              {!sector && "-"}
            </Box>
          );
        },
      },
      {
        header: "investment size",
        accessorKey: "investment_size",
        cell: ({ getValue }) => {
          const investment_size = (getValue() as Project["investment_size"]).toLowerCase();
          return (
            <Text className="text-gray-800 text-[14px] font-[450] leading-[18px]">
              {investment_size}
            </Text>
          );
        },
      },
      {
        header: "irr",
        accessorKey: "irr",
        cell: ({ getValue }) => {
          const irr = (getValue() as Project["irr"])?.toLowerCase();
          return (
            <>
              {irr ? (
                <Text className="text-gray-800 text-[14px] font-[450] leading-[18px]">
                  {irr}
                </Text>
              ) : (
                "_"
              )}
            </>
          );
        },
      },
      {
        header: "risk score",
        accessorKey: "risk_score",
        cell: ({ getValue }) => {
          const risk_score = getValue() as Project["risk_score"];
          const rating = typeof risk_score[0] === "number" ? risk_score[0].toFixed(2) : "-";
          return (
            <>
              {typeof risk_score !== "string" && risk_score !== null ? (
                <RiskBadge rating={rating} isDot riskLevel={risk_score[1]} />
              ) : (
                "-"
              )}
            </>
          );
        },
      },
      {
        header: "status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue() as Project["status"];
          return <ProjectStatusCard status={status} />;
        },
      },
      {
        header: "Action",
        accessorKey: "status",
        cell: ({ row }) => {
          const projectId = row.original.project_id;
          const status = row.original.status;
          const projectName = row.original.project_name;
          const link = getProjectLink({ projectId: projectId, completed: status === 'completed' });

          return (
            <ProjectActions
              projectId={projectId}
              projectName={projectName}
              status={status}
              link={link}
            />
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: projectList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-[8px] shadow">
      <table>
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 h-10 bg-gray-50 text-left text-[12px] min-w-[150px] font-semibold text-gray-600 uppercase"
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
            <tr key={row.id} className="text-sm ">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-t border-gray-100 min-w-[150px] h-16 text-[14px]"
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

export default React.memo(ProjectListTable);

interface ProjectActionsProps {
  projectId: string;
  projectName: string;
  status: string;
  link: string;
}

const ProjectActions: React.FC<ProjectActionsProps> = React.memo(({
  projectId,
  projectName,
  status,
  link,
}) => {
  const { setShowDelete, showDelete, onDeleteBatchProject, batchId, isLoading, refetch } =
    useBatchTable({ projectId });

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
          {status === "completed" && (
            <Menu.Item
              leftSection={<IconArrowSlant />}
              onClick={(e) => {
                e.stopPropagation();
              }}
              component="a"
              target="_blank"
              href={link}
              className="text-[12px] font-normal min-w-[130px]"
            >
              Open Transaction
            </Menu.Item>
          )}

          <Menu.Item
            leftSection={<IconFailedRed />}
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              setShowDelete(true);
            }}
            className="text-[12px] font-normal min-w-[130px]"
          >
            Delete Transaction
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <ActionModal
        isProcessing={isLoading}
        buttonText={"Delete Transaction"}
        message={`Deleting this transaction will result in the permanent \nloss of all associated data`}
        title={`Are you sure you want to delete ${upperFirst(projectName)}`}
        isVisible={showDelete}
        onSubmit={() => {
          onDeleteBatchProject({
            projectId: projectId,
            batchId: batchId as string,
            cb() {
              refetch();
              setShowDelete(false);
            },
          });
        }}
        onClose={() => {
          setShowDelete(false);
        }}
      />
    </Flex>
  );
});

ProjectActions.displayName = "ProjectActions";
