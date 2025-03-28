import { useBatchProject } from "@/hooks/logic/use-batch-project";
import { getFileSize } from "@/lib/helper";
import { IconAttach } from "@/public/assets/svg/icon-attach";
import { IconCalender } from "@/public/assets/svg/icon-calender";
import { IconCsvIcon } from "@/public/assets/svg/icon-csv-icon";
import { IconDelete } from "@/public/assets/svg/icon-delete";
import { IconDocument } from "@/public/assets/svg/icon-document";
import { IconDragHandler } from "@/public/assets/svg/icon-drag-handler";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { IconPdfIcon } from "@/public/assets/svg/icon-pdf-icon";
import { IconPercentage } from "@/public/assets/svg/icon-percentage";
import { IconTwoDocument } from "@/public/assets/svg/icon-two-document";
import { IconTwoLeaf } from "@/public/assets/svg/icon-two-leaf";
import { IconX } from "@/public/assets/svg/icon-x";
import assetBox from "@/public/image/asset-box.svg";
import batteryCharging from "@/public/image/battery-charging.svg";
import calender from "@/public/image/calender.svg";
import equalizer from "@/public/image/equalizer.svg";
import mapLine from "@/public/image/mapline.svg";
import {
  BatchMediaModel,
  BatchProjectModelTest,
  BatchUpdateProjectTestType,
  ProjectErrors,
  SectionBatchModel
} from "@/types/general";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ActionIcon,
  Box,
  Button,
  FileButton,
  Flex,
  Input,
  Loader,
  NumberInput,
  Select,
  Text,
  UnstyledButton
} from "@mantine/core";
import { DatePickerInput, YearPickerInput } from "@mantine/dates";
import { MIME_TYPES } from "@mantine/dropzone";
import { MagnifyingGlass, MapPinLine } from "@phosphor-icons/react";
import Image from 'next/image';
import React, { useRef, useState } from "react";
import PlacesAutocomplete from "./auto-complete";


const inputClass =
  "h-9 !px-0 !text-[14px] flex-1 min-w-[40px] text-end text-gray-800 bg-transparent placeholder:font-thin placeholder:text-gray-400 border-none rounded-none italic";
const selectInputClass =
  "h-9 !text-[14px] bg-red-400 text-end text-gray-800 bg-transparent placeholder:font-thin placeholder:text-gray-400 border-none rounded-none italic";




interface SortableItemProps {
  item: BatchProjectModelTest;
  isOverlay?: boolean;
  onDelete?: (id: string) => void;
  projectErrors: { [key: number]: ProjectErrors };
  index?: number;
  setProjectList?: React.Dispatch<React.SetStateAction<BatchProjectModelTest[]>>
  projectList: BatchProjectModelTest[],
}
const fileTypeIcon = (attachmentType: string) => {
  switch (true) {
    case attachmentType.includes("csv"):
      return <IconCsvIcon />;
    case attachmentType.includes("pdf"):
      return <IconPdfIcon />;
    default:
      return <IconDocument />;
  }
};
const SortableItem: React.FC<SortableItemProps> = ({
  item,
  onDelete,
  isOverlay,
  projectErrors,
  index,
  projectList,
  setProjectList,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id as string });
  const [value, setValue] = useState<[Date | null, Date | null]>([
    item?.project_duration?.start_date ? new Date(item?.project_duration?.start_date) : null,
    item?.project_duration?.end_date ? new Date(item?.project_duration?.end_date) : null,
  ]);
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const itemError = projectErrors[index as number];
  const {
    assetTypeList,
    onUploadDataFile,
    onEdit: onEditChange,
    getAssetTypeList,
    getErrorValue,
    handleTypeChange,
    isDER,
    getBooleanValue,
    handleAssetType,
    getCurrentFileCategory,
    handleMediaDelete,
  } = useBatchProject({
    currentProject: item,
    setProjectList,
    projectList
  });



  const itemSection = [
    {
      icon: mapLine,
      innerIcon: <MapPinLine weight="duotone" className="text-gray-500" />,
      rightIcon: <MagnifyingGlass />,
      label: "Transaction location",
      error: getErrorValue(
        item?.project_location?.location,
        itemError?.location as string
      ),
      component: (
        <>
          <PlacesAutocomplete
            value={item?.project_location?.location || ''}
            onSelectLocation={({ lat, lng, address }) => {
              onEditChange?.({
                value: {
                  ...item.project_location,
                  latitude: lat || 0,
                  longitude: lng || 0,
                  location: address,
                },
                id: item.id,
                type: "project_location",
              });
            }}
          />
        </>
      ),
    },
    {
      icon: calender,
      innerIcon: <Image alt="" className="h-[16px] w-[16px]" src={calender} />,
      label: "Transaction duration",
      error: getErrorValue(
        item?.project_duration?.start_date,
        itemError?.startDate as string
      ),
      component: (
        <>
          <DatePickerInput
            minDate={new Date()}
            value={value}
            type="range"
            placeholder="Pick a date"
            size="xs"
            onChange={(e) => {
              setValue(e);
              onEditChange?.({
                value: {
                  ...item.project_duration,
                  start_date: e[0],
                  end_date: e[1],
                },
                id: item.id,
                type: "project_duration",
              });
            }}
            valueFormat="YYYY-MM-DD"
            className="w-full"
            classNames={{
              input: inputClass,
            }}
          />
        </>
      ),
    },

    {
      icon: assetBox,
      label: "Choose a use case",
      error: getErrorValue(
        item?.analysis_case?.analysis_case,
        itemError?.analysis_case as string
      ),
      topComponent: (
        <div className="pt-2.5 justify-center items-center gap-1.5 inline-flex">
          <Image alt="" className="h-[16px] w-[16px]" src={assetBox} />
          <div className="text-gray-800 text-[12px] font-['TWK Lausanne'] uppercase leading-[14px] tracking-wide">
            Use case
          </div>
        </div>
      ),
      component: (
        <>
          <Select
            value={item?.analysis_case?.analysis_case || ''}
            onChange={(e) => {
              onEditChange({
                value: {
                  ...item.analysis_case,
                  analysis_case: e as string,
                },
                id: item.id,
                type: "analysis_case",
              })
              handleTypeChange(e as string);
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={[
              {
                label: "Calculate Bill Savings",
                value: "DER for Bill Reduction",
              },
              { label: "Projected Wholesale Revenue", value: "Wholesale" },
            ]}
          />
        </>
      ),
    },
    {
      hide: item?.analysis_case?.analysis_case === undefined,
      label: "Asset Type",
      error: getErrorValue(
        item?.analysis_case?.asset.asset_type,
        itemError?.assetType as string
      ),

      component: (
        <>
          <Select
            value={item?.analysis_case?.asset?.asset_type || ""}
            onChange={(e) => {
              handleAssetType(e as string)
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm border-gray-200 !w-[250px] border-t-0 !rounded-t-none",
              option: "text-[14px] font-thin capitalize !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={getAssetTypeList}
          />
        </>
      ),
    },
    ...assetTypeList(itemError?.assetSize as string),
    {
      icon: batteryCharging,
      hide: item?.analysis_case?.asset?.asset_type !== "solar",
      label: "Treating PV cost as a PPA?",
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      component: (
        <>
          <Select
            value={item?.is_treating_pvc}
            onChange={(e) => {
              onEditChange?.({
                value: e,
                id: item.id,
                type: "is_treating_pvc",
              });
              onEditChange?.({
                value: {},
                id: item.id,
                type: "ppa_cost",
              });
              onEditChange?.({
                value: {},
                id: item.id,
                type: "o_and_m_cost",
              });
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm !w-[100px] border-gray-200 border-t-0 !w-[70px] !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={["Yes", "No"]}
          />
        </>
      ),
    },
    {
      hide: item?.is_treating_pvc === "No" || !item?.is_treating_pvc,
      icon: batteryCharging,
      label: "PPA cost",
      wrapperClassName: "",
      rightIcon: (
        <Text className="text-gray-500 text-[12px] font-['TWK Lausanne'] leading-[14px]">
          $/kWh
        </Text>
      ),
      component: (
        <>
          <NumberInput
            value={item?.ppa_cost?.value}
            thousandSeparator=","
            onChange={(e) =>
              onEditChange?.({
                value: {
                  value: e,
                },
                id: item.id,
                type: "ppa_cost",
              })
            }
            hideControls
            size="xs"
            placeholder="0"
            classNames={{
              root: "w-full",
              input: inputClass,
            }}
          />
        </>
      ),
    },
    {
      label: "O &M cost",
      hide: item?.is_treating_pvc === "Yes" || !item?.is_treating_pvc || !isDER,
      rightIcon: (
        <Text className="text-gray-500 w-[45px] text-[12px] font-['TWK Lausanne'] leading-[14px]">
          $/kW-yr
        </Text>
      ),
      component: (
        <>
          <NumberInput
            value={item?.o_and_m_cost?.value}
            onChange={(e) =>
              onEditChange?.({
                value: {
                  value: e,
                },
                id: item.id,
                type: "o_and_m_cost",
              })
            }
            thousandSeparator=","
            hideControls
            size="xs"
            placeholder="0.0"
            classNames={{
              root: "w-full !m-0",
              input: inputClass,
            }}
          />
        </>
      ),
    },
    {
      hide: !isDER,
      label: "Is frequency regulation service necessary?",
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      component: (
        <>
          <Select
            value={getBooleanValue(item?.frequency_regulation_service_choice)}
            onChange={(e) => {
              onEditChange?.({
                value: e == 'Yes' ? true : false,
                id: item.id,
                type: "frequency_regulation_service_choice",
              });
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm border-gray-200 border-t-0 !w-[70px] !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={["Yes", "No"]}
          />
        </>
      ),
    },
    {
      icon: batteryCharging,
      wrapperClassName: "grid-cols-[1fr_minmax(59px,60px)]",
      label: isDER && "Do you have the Load Shape Data",
      topComponent: (
        <>
          <Flex className="items-center py-2.5 justify-between">
            <Flex className="  justify-center  items-center gap-1.5 inline-flex">
              <IconTwoDocument />
              <Text className="text-gray-800 text-[12px] font-twk uppercase leading-[14px] tracking-wide">
                document upload
              </Text>
            </Flex>
            <div>
              <span className="text-gray-600 text-[12px]  leading-[14px]">
                CSV,
              </span>
              <span className="text-gray-600 text-[12px]  uppercase leading-[14px]">
                {" "}
                xlxs, pdfs{" "}
              </span>
              <span className="text-gray-600 text-[12px]  capitalize leading-[14px]">
                Formats
              </span>
            </div>
          </Flex>

          {isDER && (
            <MediaSection
              fileCategory="company_financials_url"
              onUploadDataFile={(value) => {
                onUploadDataFile(value);
              }}
              label="financial data"
              handleMediaDelete={(fileItem) => {
                handleMediaDelete(fileItem);
              }}
              fileList={getCurrentFileCategory('company_financials_url')} />
          )}
        </>
      ),

      component: (
        <>
          {isDER && (
            <Select
              value={getBooleanValue(item?.is_load_shape_data)}
              onChange={(e) => {
                onEditChange?.({
                  value: e === "Yes" ? true : false,
                  id: item.id,
                  type: "is_load_shape_data",
                });

                if (e !== "Yes") {
                  onEditChange?.({
                    value: [],
                    id: item.id,
                    type: "load_shape_data",
                  });
                }
              }}
              size="xs"
              classNames={{
                root: "w-full",
                input: selectInputClass,
                dropdown:
                  "shadow-sm !w-[80px] border-gray-200 border-t-0 !rounded-t-none -mt-2",
                option: "text-[14px] font-thin !rounded-1",
              }}
              rightSection={<IconDropDown />}
              data={["Yes", "No"]}
            />
          )}
        </>
      ),

      bottomComponent: (
        <>
          {item?.is_load_shape_data && isDER && (
            <MediaSection
              fileCategory="load_shape_data"
              onUploadDataFile={(value) => {
                onUploadDataFile(value);
              }}
              label="Shape Data"
              handleMediaDelete={(fileItem) => {
                handleMediaDelete(fileItem);
              }}
              fileList={getCurrentFileCategory('load_shape_data',)}
            />
          )}
        </>
      ),
    },
    {
      hide: item?.is_load_shape_data || !isDER,
      label: "Add Site type",
      component: (
        <>
          <Select
            size="xs"
            onChange={(e) => {
              onEditChange?.({
                value: [e],
                id: item.id,
                type: "load_shape_site_type",
              });
            }}
            classNames={{
              root: "w-full",
              input: `${selectInputClass} overflow-scroll h-fit`,
              dropdown:
                "shadow-sm border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={[
              "Office Building",
              "Warehouse",
              "Grocery Storage",
              "Hospital",
              "Restaurant",
              "Data Center",
              "Other",
            ]}
          />
        </>
      ),
    },

    {
      hide: !isDER,
      icon: batteryCharging,
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      label: "Do you have Utility Rate",
      component: (
        <>
          {isDER && (
            <Select
              value={getBooleanValue(item?.is_tarrif_data)}
              onChange={(e) => {
                onEditChange?.({
                  value: e === "Yes" ? true : false,
                  id: item.id,
                  type: "is_tarrif_data",
                });

                if (e !== "Yes") {
                  onEditChange?.({
                    value: [],
                    id: item.id,
                    type: "tarrif_data",
                  });
                }
              }}
              size="xs"
              classNames={{
                root: "w-full",
                input: selectInputClass,
                dropdown:
                  "shadow-sm !w-[100px] border-gray-200 border-t-0 !rounded-t-none -mt-2",
                option: "text-[14px] font-thin !rounded-1",
              }}
              rightSection={<IconDropDown />}
              data={["Yes", "No"]}
            />
          )}
        </>
      ),
      bottomComponent: (
        <>
          {item?.is_tarrif_data && isDER && (
            <MediaSection
              fileCategory="tarrif_data"
              onUploadDataFile={(value) => {
                onUploadDataFile(value);
              }}
              label=""
              handleMediaDelete={(fileItem) => {
                handleMediaDelete(fileItem);
              }}
              fileList={getCurrentFileCategory('tarrif_data')}
            />
          )}
        </>
      ),
    },
    {
      hide: item?.is_tarrif_data || !isDER,
      label: "Add building type",
      component: (
        <>
          <Select
            size="xs"
            classNames={{
              root: "w-full",
              input: `${selectInputClass} overflow-scroll`,
              dropdown:
                "shadow-sm border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            onChange={(e) => {
              onEditChange?.({
                value: [e],
                id: item.id,
                type: "tarrif_building_type",
              });
            }}
            rightSection={<IconDropDown />}
            data={["Commercial", "Industrial", "Residential"]}
          />
        </>
      ),
    },
    {
      icon: batteryCharging,
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      topComponent: (
        <>
          <MediaSection
            fileCategory="regulatory_data"
            onUploadDataFile={(value) => {
              onUploadDataFile(value);
            }}
            label={
              <div className="justify-center items-center gap-1 flex-1 w-full flex">
                <div className="text-gray-800 w-full text-[12px] font-twk uppercase leading-[14px]">
                  Regulatory Data
                  <span className="text-gray-500 text-[12px] font-light font-twk leading-[14px]">
                    (Optional)
                  </span>
                </div>
              </div>
            }
            handleMediaDelete={(fileItem) => {
              handleMediaDelete(fileItem);
            }}
            fileList={getCurrentFileCategory('regulatory_data')}
          />
        </>
      ),
    },

    {
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      icon: equalizer,
      label: "Interested in Frequency Regulation",
      topComponent: (
        <div className="pt-2.5 justify-center items-center gap-1.5 inline-flex">
          <Image alt="" className="h-[16px] w-[16px]" src={equalizer} />
          <div className="text-gray-800 text-[12px] font-['TWK Lausanne'] uppercase leading-[14px] tracking-wide">
            frequency regulation
          </div>
        </div>
      ),
      component: (
        <>
          <Select
            value={getBooleanValue(item?.frequency_regulation?.user_is_interested)}
            onChange={(e) => {
              onEditChange?.({
                value: {
                  ...item?.frequency_regulation, // Copy existing frequency_regulation properties
                  user_is_interested: e === "Yes", // Set user_is_interested based on the value of e
                },
                id: item.id, // Pass the item ID
                type: "frequency_regulation", // Specify the type of change
              });
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm !min-w-[100px] border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={["Yes", "No"]}
          />
        </>
      ),
    },

    {
      icon: batteryCharging,
      label: "Inflation rate (%)",
      rightIcon: <IconPercentage className="size-[15px]" />,
      component: (
        <>
          <NumberInput
            value={item?.inflation_rate?.value}
            onChange={(e) =>
              onEditChange?.({
                value: {
                  ...item?.inflation_rate,
                  value: e,
                },
                id: item.id,
                type: "inflation_rate",
              })
            }
            hideControls
            size="xs"
            placeholder="0.0"
            classNames={{
              root: "w-full",
              input: inputClass,
            }}
          />
        </>
      ),
    },
    {
      icon: batteryCharging,
      label: "Decommissioning cost",
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]  pr-2",
      component: (
        <>
          <NumberInput
            value={item?.decomissioning_cost?.value}
            prefix="$"
            thousandSeparator=","
            onChange={(e) =>
              onEditChange?.({
                value: {
                  ...item?.decomissioning_cost,
                  value: e,
                },
                id: item.id,
                type: "decomissioning_cost",
              })
            }
            hideControls
            size="xs"
            placeholder="0"
            classNames={{
              root: "w-full",
              input: inputClass,
            }}
          />
        </>
      ),
    },
    {
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      icon: batteryCharging,
      label: "Is the technology replaceable?",
      component: (
        <>
          <Select
            value={getBooleanValue(item?.is_replaceable)}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm min-w-[80px] border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            onChange={(e) => {
              onEditChange?.({
                value: {
                  ...item,
                  is_replaceable: e === "Yes" ? true : false,
                },
                id: item.id,
                type: "is_replaceable",
              });
              if (e !== "Yes") {
                onEditChange?.({
                  value: {
                    ...item,
                    replacement_info: {},
                  },
                  id: item.id,
                  type: "replacement_info",
                });
                return;
              }
            }}
            rightSection={<IconDropDown />}
            data={["Yes", "No"]}
          />
        </>
      ),
    },
    {
      hide: !item?.is_replaceable,
      icon: batteryCharging,
      label: "Replacement year",
      component: (
        <>
          <YearPickerInput
            value={item?.replacement_info?.construction_time?.value ? new Date(item?.replacement_info?.construction_time?.value) : null}
            minDate={new Date(item?.project_duration?.start_date)}
            onChange={(e) => {
              onEditChange?.({
                value: {
                  ...item?.replacement_info,
                  construction_time: {
                    value: e,
                  },
                },
                id: item.id,
                type: "replacement_info",
              });
            }}
            placeholder="YYYY"
            classNames={{
              root: "w-full",
              input: selectInputClass,
            }}
            rightSection={<IconCalender className="size-[15px]" />}
          />
        </>
      ),
    },
    {
      hide: !item?.is_replaceable,
      icon: batteryCharging,
      label: "Replacement cost",
      rightIcon: (
        <Text className="text-gray-500 text-[14px] font-['TWK Lausanne'] leading-[14px]">
          $/kW
        </Text>
      ),
      component: (
        <>
          <NumberInput
            value={item?.replacement_info?.replacement_cost?.value}
            onChange={(e) =>
              onEditChange?.({
                value: {
                  ...item?.replacement_info,
                  replacement_cost: {
                    ...item?.replacement_info?.replacement_cost,
                    value: e,
                  },
                },
                id: item.id,
                type: "replacement_info",
              })
            }
            thousandSeparator=","
            hideControls
            size="xs"
            placeholder="0"
            classNames={{
              root: "w-full",
              input: inputClass,
            }}
          />
        </>
      ),
    },
    {
      icon: <IconTwoLeaf />,
      error: getErrorValue(
        item?.tax_credits?.employs_registered_apprentice !== undefined && true,
        itemError?.employs_registered_apprentice as string
      ),
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      label: "Employ registered apprentices",
      topComponent: (
        <div className="pt-2.5 justify-center items-center gap-1.5 inline-flex">
          <IconTwoLeaf />
          <div className="text-gray-800 text-[12px] font-['TWK Lausanne'] uppercase leading-[14px] tracking-wide">
            Tax Credit
          </div>
        </div>
      ),
      component: (
        <>
          <Select
            value={getBooleanValue(item?.tax_credits?.employs_registered_apprentice)}
            onChange={(e) => {
              onEditChange?.({
                value: {
                  ...item?.tax_credits,
                  employs_registered_apprentice: e === "Yes" ? true : false,
                },
                id: item.id,
                type: "tax_credits",
              });
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm !w-[100px] border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={["Yes", "No"]}
          />
        </>
      ),
    },
    {
      icon: <IconTwoLeaf />,
      label: "Meet recommended wages",
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      error: getErrorValue(
        item?.tax_credits?.meet_recommended_wages !== undefined && true,
        itemError?.meet_recommended_wages as string
      ),
      component: (
        <>
          <Select
            value={getBooleanValue(item?.tax_credits?.meet_recommended_wages)}
            onChange={(e) => {
              onEditChange?.({
                value: {
                  ...item?.tax_credits,
                  meet_recommended_wages: e === "Yes" ? true : false,
                },
                id: item.id,
                type: "tax_credits",
              });
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm !w-[100px] border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={["Yes", "No"]}
          />
        </>
      ),
    },
    {
      wrapperClassName: "grid-cols-[1fr_minmax(65px,65px)]",
      icon: <IconTwoLeaf />,
      label: "Materials & manufacturing in the U.S.?",
      error: getErrorValue(
        item?.tax_credits?.materials_and_manufacturing_in_the_us !==
        undefined && true,
        itemError?.materials_and_manufacturing_in_the_us as string
      ),
      component: (
        <>
          <Select
            value={getBooleanValue(item?.tax_credits?.materials_and_manufacturing_in_the_us)}
            onChange={(e) => {
              onEditChange?.({
                value: {
                  ...item?.tax_credits,
                  materials_and_manufacturing_in_the_us:
                    e === "Yes" ? true : false,
                },
                id: item.id,
                type: "tax_credits",
              });
            }}
            size="xs"
            classNames={{
              root: "w-full",
              input: selectInputClass,
              dropdown:
                "shadow-sm !w-[100px] border-gray-200 border-t-0 !rounded-t-none -mt-2",
              option: "text-[14px] font-thin !rounded-1",
            }}
            rightSection={<IconDropDown />}
            data={["Yes", "No"]}
          />
        </>
      ),
    },
  ] as SectionBatchModel[];

  return (
    <Box>
      <Flex
        className="batch-project-card"
        data-is_dragging={isDragging && !isOverlay}
        ref={setNodeRef}
        style={style}
      >
        <Flex className="min-h-[36px] px-[10px] items-center justify-between ">
          <Flex>
            <button {...listeners} {...attributes}>
              <IconDragHandler />
            </button>
            <Input
              size="xs"
              value={item?.project_name}
              onChange={(e) => {
                onEditChange?.({
                  value: e.target.value,
                  id: item.id,
                  type: "project_name",
                });
              }}
              classNames={{
                input:
                  "px-2 border-none border-transparent bg-transparent !h-6 !text-base font-bold text-gray-800 min-w-[10px] text-left placeholder:font-thin hover:bg-gray-200/70",
              }}
              style={{
                textAlign: "left",
                minWidth: "10px",
              }}
              placeholder="Transaction name"
            />
          </Flex>
          <Flex>
            <ActionIcon
              onClick={() => onDelete?.(item?.id)}
              variant="transparent"
            >
              <IconDelete />
            </ActionIcon>
          </Flex>
        </Flex>

        <Text className="text-red-400 text-[12px] px-4">
          {getErrorValue(item.project_name, itemError?.projectName as string)}
        </Text>

        <Box
          className="px-[10px] pb-3 bg-white border-[#E5E5E5] flex-grow border-[1px] rounded-md  custom-scrollbar "
        >
          <Box
            className="section-wrapper"
          >
            {itemSection?.map((item, index) => {
              if (!item.hide)
                return (
                  <Box key={index}>
                    <Box className="border-transparent px-1  border-b-gray-100 border-b-[1px]">
                      {item.topComponent}
                      <Box
                        className={`grid grid-cols-2  items-center ${item.wrapperClassName}`}
                      >
                        <Flex className="gap-2">
                          {item.innerIcon}
                          <Text className="batch-label-card">{item.label}</Text>
                        </Flex>
                        <Flex className="items-center flex justify-end gap-[5px]">
                          {item.component}
                          {item.rightIcon && (
                            <Box className="">{item.rightIcon}</Box>
                          )}
                        </Flex>
                      </Box>
                      <Text className="text-red-400 text-[12px]">
                        {" "}
                        {item.error}
                      </Text>
                      {item.bottomComponent}
                    </Box>
                  </Box>
                );
            })}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SortableItem;

const UploadDataCard = ({
  label,
  onChange,
}: {
  label: React.ReactNode;
  onChange?: (files: File[]) => void;
}) => {
  const resetRef = useRef<() => void>(null);

  return (
    <Flex className=" mt-[4px] items-center py-[6px] rounded-[4px]">
      {typeof label === "string" ? (
        <Text className="text-gray-800 text-[12px] flex-1 line-clamp-1 font-twk mt-[10px] uppercase leading-[14px]">
          {label}
        </Text>
      ) : (
        label
      )}

      <Flex className="justify-end  ">
        <FileButton
          accept={`${MIME_TYPES.csv}, ${MIME_TYPES.csv}, ${MIME_TYPES.pdf}, ${MIME_TYPES.xls}, ${MIME_TYPES.xlsx}`}
          multiple
          onChange={(file) => {
            onChange?.(file as File[]);
            resetRef.current?.();
          }}
        >
          {(props) => (
            <Button
              {...props}
              variant="white"
              classNames={{
                section: "mr-1",
              }}
              leftSection={<IconAttach />}
              className="h-full text-[12px] px-0   text-vibrantgreen hover:text-vibrantgreen"
            >
              {" "}
              Upload File
            </Button>
          )}
        </FileButton>
      </Flex>
    </Flex>
  );
};
const UploadedMedia = ({
  fileItem,
  handFileDelete,
}: {
  fileItem?: BatchMediaModel;
  handFileDelete?: (file?: BatchMediaModel) => void;
}) => {
  return (
    <div className="w-full h-[30px] px-1 py-1.5 bg-gray-100 rounded justify-between items-center gap-1 inline-flex">
      <div className="h-[18px] flex-1 justify-start items-center gap-1 flex">
        <Box>{fileTypeIcon(fileItem?.file?.type || fileItem?.name as string)}</Box>
        <div className="text-gray-800 line-clamp-1 text-[12px] font-['TWK Lausanne'] leading-[18px]">
          {(fileItem?.file_category || "")?.replace(/_/g, " ")}{" "}
          <span className="grow shrink basis-0 text-gray-500 text-[12px] font-['TWK Lausanne'] leading-[18px]">
            {fileItem?.name}{" "}
          </span>
        </div>
      </div>
      <div className="justify-start items-center gap-1 flex">
        {
          fileItem?.file?.size && (
            <div className="text-gray-800 text-[12px] font-['TWK Lausanne'] leading-[18px]">
              {getFileSize(fileItem?.file?.size as number)} MB
            </div>
          )
        }

        {fileItem?.isUploading && <Loader size={10} />}
        {!fileItem?.isUploading && (
          <UnstyledButton
            onClick={() => {
              handFileDelete?.(fileItem);
            }}
          >
            <IconX />
          </UnstyledButton>
        )}
      </div>
    </div>
  );
};

const MediaSection = ({
  fileList,
  label,
  handleMediaDelete,
  onUploadDataFile,
  fileCategory,
}: {
  fileList: BatchMediaModel[];
  label?: React.ReactNode;
  handleMediaDelete: (file: BatchMediaModel) => void;
  fileCategory: BatchUpdateProjectTestType["type"];
  onUploadDataFile: ({
    type,
    files,
  }: {
    type: BatchUpdateProjectTestType["type"];
    files: File[] | null;
  }) => void;
}) => {
  const listData = Array.isArray(fileList) ? fileList : [];

  return (
    <Flex className="flex-col gap-[5px]">
      <UploadDataCard
        onChange={(files) => {
          onUploadDataFile({ files: files, type: fileCategory });
        }}
        label={label}
      />
      {listData?.map((fileItem) => {
        return (
          <UploadedMedia
            handFileDelete={() => {
              handleMediaDelete(fileItem);
            }}
            fileItem={fileItem}
            key={fileItem.id}
          />
        );
      })}
    </Flex>
  );
};
