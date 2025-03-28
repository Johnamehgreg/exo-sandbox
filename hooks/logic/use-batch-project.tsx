'use client';

import {
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */
import batteryCharging from "@/public/image/battery-charging.svg";
import { BatchMediaModel, BatchProjectModelTest, BatchUpdateProjectTestType, SectionBatchModel } from "@/types/general";
import { NumberInput } from "@mantine/core";
import { useUpload } from "../mutate/use-upload";

const derList = [
  {
    label: "Behind the meter Solar",
    value: "solar",
  },
  {
    label: "Behind the meter Storage",
    value: "storage",
  },
  {
    label: "Behind the meter Solar + Storage",
    value: "solar & storage",
  },
];

const wholeSaleList = [
  {
    label: "Front of meter Solar",
    value: "solar",
  },
  {
    label: "Front of meter Storage",
    value: "storage",
  },
];


const getAssetList = (assetType: string) => {
  switch (assetType) {
    case "solar":
      return [{ id: "solar", unit: "MW", value: 0, asset: "solar" }];
    case "storage":
      return [
        { id: "storageMw", unit: "MW", value: 0, asset: "storage" },
        { id: "storageMWH", unit: "MWh", value: 0, asset: "storage" },
      ];
    case "solar & storage":
      return [
        { id: "solar", unit: "MW", value: 0, asset: "solar" },
        { id: "storageMw", unit: "MW", value: 0, asset: "storage" },
        { id: "storageMWH", unit: "MWh", value: 0, asset: "storage" },
      ];
    default:
      return [];
  }
};


export const useBatchProject = ({
  currentProject,
  setProjectList,
  projectList,
}: {
  currentProject?: BatchProjectModelTest;
  setProjectList?: React.Dispatch<React.SetStateAction<BatchProjectModelTest[]>>,
  projectList: BatchProjectModelTest[],
}) => {
  const [activeId, setActiveId] = useState<string | number>(0);
  const getBooleanValue = (val: boolean | null | undefined) => {
    if (val === undefined || val === null)
      return ''
    return val ? 'Yes' : 'No';
  }

  const { onUploadFile } = useUpload();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id && projectList) {
        const oldIndex = projectList.findIndex((item) => item.id === active.id);
        const newIndex = projectList.findIndex((item) => item.id === over!.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          setProjectList?.(arrayMove(projectList, oldIndex, newIndex));
        }
      }
      setActiveId(0);
    },
    [projectList, setProjectList]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(0);
  }, []);

  const onAddProject = () => {
    const newProject = {
      id: uuidv4(),
    } as BatchProjectModelTest;
    setProjectList?.((prev) => [...(prev || []), newProject]);
  };

  const activeItem = projectList?.find((item) => item.id === activeId) || null;

  const onDelete = (id: string) => {
    setProjectList?.(projectList?.filter((item) => item.id !== id) || []);
  };

  const onEdit =
    ({
      value,
      id,
      type,
    }: {
      value: unknown;
      id: string;
      type: keyof BatchProjectModelTest;
    }) => {
      setProjectList?.((prevBatchList) =>
        prevBatchList.map((item) =>
          item.id === id ? { ...item, [type]: value } : item
        )
      );
    }

  const getCurrentFileCategory = useCallback(
    (category: string) => {
      switch (category) {
        case "load_shape_data":
          return currentProject?.load_shape_data || [];
        case "tarrif_data":
          return currentProject?.tarrif_data || [];
        case "regulatory_data":
          return currentProject?.regulatory_data || [];
        case "company_financials_url":
          return currentProject?.company_financials_url || [];
        default:
          return [];
      }
    },
    [currentProject]
  );
  const getFileCategory = (category: string, item: BatchProjectModelTest) => {
    switch (category) {
      case "load_shape_data":
        return item?.load_shape_data || [];
      case "tarrif_data":
        return item?.tarrif_data || [];
      case "regulatory_data":
        return item?.regulatory_data || [];
      case "company_financials_url":
        return item?.company_financials_url || [];
      default:
        return [];
    }
  }
  const handleMediaDelete = (fileDetail: BatchMediaModel) => {
    if (!fileDetail.file_category) {
      return null;
    }
    setProjectList?.((prev) =>
      prev.map((item) =>
        item.id === currentProject?.id
          ? {
            ...item,
            [fileDetail.file_category as keyof BatchProjectModelTest]:
              getFileCategory(fileDetail.file_category as string, item).filter((item) => item.id !== fileDetail.id),
          }
          : item
      )
    );
  };

  const onUploadDataFileTwo = ({
    type,
    files,
  }: {
    type: BatchUpdateProjectTestType["type"];
    files: File[] | null;
  }) => {
    // Early return if no files are provided
    if (!files || files.length === 0) return;

    // Map files to a new list with additional metadata
    const newList = files.map((fileItem) => ({
      file: fileItem,
      id: uuidv4(),
      name: fileItem.name,
      type: fileItem.type,
      isUploaded: false,
      isUploading: true,
      isErrored: false,
      file_category: type,
    }));

    // Determine the current data list based on the type
    const currentDataList = getCurrentFileCategory(type as string);

    // Combine the current data list with the new list
    const updatedList = [...currentDataList, ...newList];

    // Call the onEdit function with the updated list
    onEdit({
      value: updatedList,
      id: currentProject?.id as string,
      type: type as keyof BatchProjectModelTest,
    });

    // Upload each file in the new list
    newList.forEach((obj) => {
      onUploadFile({
        file: obj.file,
        fileId: obj.id,
        cb(uri, id) {
          setProjectList?.((prev) =>
            prev.map((item) =>
              item.id === currentProject?.id
                ? {
                  ...item,
                  [type as keyof BatchProjectModelTest]:
                    getFileCategory(type as string, item).map((dataItem) =>
                      dataItem.id === id
                        ? {
                          ...dataItem,
                          isUploaded: true,
                          url: uri,
                          isUploading: false,
                          isErrored: false,
                        }
                        : dataItem
                    ),
                }
                : item
            )
          );
        },
        errorCb({ id }) {
          setProjectList?.((prev) =>
            prev.map((item) =>
              item.id === currentProject?.id
                ? {
                  ...item,
                  regulatory_data: item.regulatory_data.map((dataItem) =>
                    dataItem.id === id
                      ? {
                        ...dataItem,
                        isUploading: false,
                        isErrored: true,
                      }
                      : dataItem
                  ),
                }
                : item
            )
          );
        },
      });
    });
  };

  const getAssetSizeValue = (id: string) => {
    return currentProject?.analysis_case?.asset?.size?.find((assetItem) => assetItem.id === id)?.value;
  };

  const solarList = [
    {
      icon: batteryCharging,
      value: getAssetSizeValue("solar"),
      label: (
        <div>
          <span className="text-gray-700 text-[12px] font-['TWK Lausanne'] leading-[14px]">
            MW
          </span>
          <span className="text-gray-500 text-sm font-['TWK Lausanne'] leading-[14px]">
            {" "}
            of Solar
          </span>
        </div>
      ),
      wrapperClassName: "ml-4",
      component: (
        <>
          <NumberInput
            value={getAssetSizeValue("solar")}
            thousandSeparator=","
            onChange={(e) => {
              onSizeChanges(e as number, 'solar')
            }}
            hideControls
            size="xs"
            placeholder="0"
            classNames={{
              root: "w-full",
              input:
                "h-9 !text-[14px] text-end text-gray-800 bg-transparent placeholder:font-thin placeholder:text-gray-400 border-none rounded-none italic",
            }}
          />
        </>
      ),
    },
  ] as SectionBatchModel[];


  const storageList = [
    {
      icon: batteryCharging,
      value: getAssetSizeValue("storageMw"),
      label: (
        <div>
          <span className="text-gray-700 text-sm font-['TWK Lausanne'] leading-[14px]">
            MW
          </span>
          <span className="text-gray-500 text-sm font-['TWK Lausanne'] leading-[14px]">
            {" "}
            of Storage
          </span>
        </div>
      ),
      wrapperClassName: "ml-4",
      component: (
        <>
          <NumberInput
            value={getAssetSizeValue("storageMw")}
            thousandSeparator=","
            onChange={(e) => {
              onSizeChanges(e as number, 'storageMw')
            }}
            hideControls
            size="xs"
            placeholder="0"
            classNames={{
              root: "w-full",
              input:
                "h-9 !text-[14px] text-end text-gray-800 bg-transparent placeholder:font-thin placeholder:text-gray-400 border-none rounded-none italic",
            }}
          />
        </>
      ),
    },
    {
      icon: batteryCharging,
      value: getAssetSizeValue("storageMWH"),
      label: (
        <div>
          <span className="text-gray-700 text-sm font-['TWK Lausanne'] leading-[14px]">
            MWh
          </span>
          <span className="text-gray-500 text-sm font-['TWK Lausanne'] leading-[14px]">
            {" "}
            of Storage
          </span>
        </div>
      ),
      wrapperClassName: "ml-4",
      component: (
        <>
          <NumberInput
            value={getAssetSizeValue("storageMWH")}
            thousandSeparator=","
            onChange={(e) => {
              onSizeChanges(e as number, 'storageMWH')
            }}
            hideControls
            size="xs"
            placeholder="0"
            classNames={{
              root: "w-full",
              input:
                "h-9 !text-[14px] text-end text-gray-800 bg-transparent placeholder:font-thin placeholder:text-gray-400 border-none rounded-none italic",
            }}
          />
        </>
      ),
    },
  ] as SectionBatchModel[];



  const assetTypeList = (error: string) => {
    const solarSizeList = solarList.map((item) => {
      return {
        ...item,
        error: !item.value ? error : "",
      };
    });
    const storageSizeList = storageList.map((item) => {
      return { ...item, error: !item.value ? error : "" };
    });
    const assetType =
      currentProject?.analysis_case?.asset?.asset_type?.toLowerCase();
    if (assetType === "solar") {
      return solarSizeList;
    }
    if (assetType === "storage") {
      return storageSizeList;
    }
    if (assetType === "solar & storage") {
      return [...solarSizeList, ...storageSizeList];
    }
    return [];
  };

  const getErrorValue = (value: any, error: string) => {
    return !value ? error : "";
  };

  const getAssetTypeList =
    currentProject?.analysis_case?.analysis_case === "DER for Bill Reduction"
      ? derList
      : currentProject?.analysis_case?.analysis_case === "Wholesale"
        ? wholeSaleList
        : [];


  const handleTypeChange = useCallback(
    (val: string) => {
      setProjectList?.((prev) =>
        prev.map((item) =>
          item.id === currentProject?.id
            ? {
              ...item,
              is_tarrif_data: null,
              is_load_shape_data: null,
              load_shape_data: [],
              company_financials_url: [],
              tarrif_data: [],
              load_shape_site_type: [],
              tarrif_building_type: [],
              o_and_m_cost: {},
              analysis_case: {
                ...item.analysis_case,
                asset: {
                  ...item.analysis_case.asset,
                  asset_type: "",
                },
                analysis_case: val as string,
                use_cases:
                  val === "DER for Bill Reduction"
                    ? [
                      {
                        analysis_case: "DER for Bill Reduction",
                        case: "estimating_financials_for_EBR",
                      },
                    ]
                    : [],
              },
            }
            : item
        )
      );
    },
    [setProjectList, currentProject] // Dependencies array
  );


  const isDER =
    currentProject?.analysis_case?.analysis_case === "DER for Bill Reduction";

  const handleAssetType = (asset_type: string) => {
    setProjectList?.((prev) =>
      prev.map((item) =>
        item.id === currentProject?.id
          ? {
            ...item,
            ppa_cost: {},
            o_and_m_cost: {},
            is_treating_pvc: '', //
            analysis_case: {
              ...item.analysis_case,
              asset: {
                ...item.analysis_case.asset,
                asset_type: asset_type,
                size: getAssetList(asset_type),
              },
            }
          }
          : item
      )
    );
  }

  const onSizeChanges = (value: number, id: string) => {

    const sizeList = currentProject?.analysis_case?.asset?.size || []
    const updatedSizeList = sizeList?.map((item) =>
      item.id === id ? { ...item, value: Number(value) } : item
    );
    setProjectList?.((prev) =>
      prev.map((item) =>
        item.id === currentProject?.id
          ? {
            ...item,
            analysis_case: {
              ...item.analysis_case,
              asset: {
                ...item.analysis_case.asset,
                size: updatedSizeList,
              },
            }
          }
          : item
      )
    );
  }

  return {
    handleTypeChange,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    onDelete,
    onAddProject,
    assetTypeList,
    activeItem,
    sensors,
    activeId,
    onEdit,
    onUploadDataFile: onUploadDataFileTwo,
    getAssetTypeList,
    getErrorValue,
    isDER,
    getBooleanValue,
    handleAssetType,
    getCurrentFileCategory,
    handleMediaDelete
  };
};
