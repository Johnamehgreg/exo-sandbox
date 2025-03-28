"use client"

import { ConfigurationOutputFormat, ConfigurationSection, ConfigurationStructure } from "@/types/general";
import { Session } from 'next-auth';
import { useCallback, useEffect, useState } from "react";
import { useDianaConfiguration } from "../mutate/diana-configuration";

const CONFIGURATION_STRUCTURE: Readonly<ConfigurationStructure> = {
  financial_assumptions: {
    label: "Financial Assumptions",
    items: [
      { id: "npv_discount_rate", label: "Discount Rate (%)", symbol: "%" },
      { id: "property_tax_rate", label: "Property Tax Rate (%)", symbol: "%" },
      { id: "state_tax_rate", label: "State Tax Rate (%)", symbol: "%" },
      { id: "federal_tax_rate", label: "Federal Tax Rate (%)", symbol: "%" },
      { id: "inflation_rate", label: "Inflation Rate (%)", symbol: "%" },
    ],
  },
  capital_cost_assumptions: {
    label: "Capital Cost Assumptions",
    items: [
      { id: "battery_capital_cost_per_kw", label: "Battery Capital Cost ($/kW)", symbol: "$" },
      { id: "battery_capital_cost_per_kwh", label: "Battery Capital Cost ($/kWh)", symbol: "$" },
      { id: "solar_capital_cost_per_kw", label: "Solar Capital Cost ($/kW)", symbol: "$" },
    ],
  },
  operational_and_maintenance_cost: {
    label: "Operational and Maintenance Cost",
    items: [
      { id: "solar_om_cost_per_kw_year", label: "Solar O&M Cost ($/kW-yr)", symbol: "$" },
      { id: "storage_om_cost_per_kw_year", label: "Storage O&M Cost ($/kW-yr)", symbol: "$" },
    ],
  },
} as const;

export const useConfiguration = ({ session }: { session: Session | null; }) => {
  const organizationId = session?.user?.organization ?? "";
  const [updateType, setUpdateType] = useState<'reset' | 'edit'>();
  const {
    isLoading,
    isError,
    getConfiguration,
    resetConfiguration,
    isFetching,
    isUpdating,
    configurationData,
    updateConfiguration,
  } = useDianaConfiguration();
  const [configurationList, setConfigurationList] = useState<ConfigurationSection[]>([]);
  const [isEditMode, setIsEditMode] = useState(false)
  const generateConfigurationList = useCallback(
    (data: typeof configurationData): ConfigurationSection[] => {
      if (!data) return [];
      return Object.entries(CONFIGURATION_STRUCTURE).map(([key, section]) => ({
        id: key,
        label: section.label,
        sectionList: section.items.map((item) => ({
          id: item.id,
          label: item.label,
          value: data[key]?.[item.id] ?? 0,
          symbol: item.symbol,
        })),
      }));
    },
    [configurationData]
  );

  const convertToDesiredFormat = (inputArray: ConfigurationSection[], organizationId: string = "string"): ConfigurationOutputFormat => {
    const output: Partial<ConfigurationOutputFormat> = {
      organizationId: organizationId
    };

    inputArray.forEach((section) => {
      const sectionId = section.id as keyof Omit<ConfigurationOutputFormat, 'organizationId'>;
      output[sectionId] = {} as any;

      section.sectionList.forEach(item => {
        (output[sectionId] as any)[item.id] = item.value;
      });
    });

    return output as ConfigurationOutputFormat;
  }

  const fetchConfig = () => {
    getConfiguration({
      organizationId: organizationId as string,
      cb(res) {
        setConfigurationList(generateConfigurationList(res.data))
      },
    });
  }

  useEffect(() => {
    if (configurationList.length === 0) {
      fetchConfig()
    }
  }, [organizationId, configurationData]);

  const handleInputChanges = useCallback(
    (sectionId: string, itemId: string, value: number) => {
      setConfigurationList(prev =>
        prev.map(config =>
          config.id === sectionId
            ? {
              ...config,
              sectionList: config.sectionList.map(item =>
                item.id === itemId ? { ...item, value } : item
              ),
            }
            : config
        )
      );
    },
    []
  );
  const onResetConfig = () => {
    setUpdateType('reset')
    resetConfiguration({
      organizationId: organizationId as string, cb() {
        setIsEditMode(false)
        fetchConfig()
      },
    })
  }
  const onSaveChange = () => {
    setUpdateType('edit')
    const data = convertToDesiredFormat(configurationList, organizationId as string)
    updateConfiguration({
      data,
      cb() {
        setIsEditMode(false)
        fetchConfig()
      },
    })
  }
  return {
    isLoading,
    isFetching,
    isError,
    configurationData,
    configurationList,
    handleInputChanges,
    onResetConfig,
    setIsEditMode,
    isEditMode,
    isUpdating,
    setUpdateType,
    updateType,
    onSaveChange,
    refetch: () => fetchConfig()
  };
};