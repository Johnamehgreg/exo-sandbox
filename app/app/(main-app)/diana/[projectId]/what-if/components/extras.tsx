import PlotComponent from "@/components/plotly/PlotlyChart";
import { getMetricValue } from "@/lib/helper";
import { MergeMetric, WhatIfModel } from "@/types/general";
import { Box, Card, Flex, Table, Text, UnstyledButton } from "@mantine/core";
import { Data, Layout } from "plotly.js";
import React, { useMemo } from "react";

interface Props {
  metrics: MergeMetric[];
  isITC: boolean
}

export const ScenarioComparisonTable: React.FC<Props> = ({ metrics, isITC }) => {
  const tableHeaderList = useMemo(() => [
    {
      label: (
        <div className="inline-flex justify-start items-center">
          <div className="flex-1 justify-center text-gray-700 text-[11px] font-medium font-twk uppercase leading-tight">
            Metrics
          </div>
        </div>
      ),
    },
    {
      label: (
        <div className="inline-flex items-center gap-0.5">
          <div className="w-4 h-4 relative bg-white rounded-[20px] overflow-hidden">
            <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-p1 rounded-[20px]"></div>
          </div>
          <div className="justify-center">
            <span className="text-gray-700 text-[11px] font-medium font-twk uppercase leading-[14px]">
              scenario a
            </span>
            <span className="text-gray-700 text-[11px] font-twk uppercase leading-[14px]">
              (default)
            </span>
          </div>
        </div>
      ),
    },
    {
      label: (
        <div className="inline-flex items-center gap-0.5">
          <div className="w-4 h-4 relative bg-white rounded-[20px] overflow-hidden">
            <div className="w-3 h-3 left-[2px] top-[2px] absolute bg-vibrantgreen rounded-[20px]"></div>
          </div>
          <div className="justify-center">
            <span className="text-gray-700 text-[11px] font-medium font-twk uppercase leading-[14px]">
              scenario b ({isITC ? 'ITC' : 'PTC'})
            </span>
          </div>
        </div>
      ),
    },
  ], [isITC]);

  return (
    <Table className=" shadow-sm" verticalSpacing="sm">
      <thead>
        <tr className="bg-gray-50 border-[1px] border-gray-100">
          {
            tableHeaderList.map((tableHeader, index) => {
              return (
                <th key={index}>
                  <UnstyledButton
                    className={`flex items-center py-3  w-full text-gray-600 px-4 h-[40px] transition-colors hover:text-gray-900 `}
                  >
                    <Flex className={`gap-2 flex-1 items-center`}>
                      <Text
                        className={`font-medium text-[11px] whitespace-pre-line `}
                      >
                        {tableHeader.label}
                      </Text>
                    </Flex>
                  </UnstyledButton>
                </th>
              );
            })
          }

        </tr>
      </thead>
      <tbody>
        {
          metrics?.map((metric, index) => {
            return (
              <tr key={index}>
                <td className="px-4 h-[56px] border-b border-l w-[221px] border-gray-100">
                  <Text size="sm" className="font-medium   capitalize">
                    {metric?.metric}
                  </Text>
                </td>
                <td className="px-4 h-[56px]  w-[175px] border-b border-l border-gray-100">
                  {getMetricValue(metric)}
                </td>
                <td className="px-4 justify-between h-[56px] flex items-center  border-b border-l border-gray-100">
                  {getMetricValue(metric?.adjusted_metrics)}
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};


interface CostProps {
  comparison_plot: WhatIfModel['comparison_plot'],
}

export const CostBenefitComponent: React.FC<CostProps> = ({ comparison_plot }) => {
  return (
    <Box className=" gray-card-wrapper-dashboard flex-col">
      <Flex className=" h-[36px] px-[8px] gap-[4px] items-center">
        <Text className="gray-card-header-text capitalize">
          Cost and Benefits
        </Text>
      </Flex>
      <Card>
        <PlotComponent
          className="w-full h-full"
          data={comparison_plot?.data as Data[]}
          layout={{ ...comparison_plot?.layout as Partial<Layout>, title: "" }}
        />
      </Card>
    </Box>
  );
};

export const HeaderSkeletonLoading = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Title and percentage skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="h-12 w-24 bg-gray-200 rounded flex items-center justify-center">
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded-full" />
        <div className="space-y-2 w-full" >
          <div className="h-4 bg-gray-200 rounded-full w-full"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>

      {/* Slider skeleton */}


      {/* Scenario cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded p-4 items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-200 rounded p-4 items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  )
}


export const SkeletonLoading = () => {
  return (
    <div className="space-y-6 w-full  ">
      {/* Scenario Comparison Section */}
      <div className=" rounded-lg shadow-sm p-6 animate-pulse bg-gray-100">
        <div className="mb-4">
          <div className="h-5 w-48 bg-gray-200 rounded mb-6"></div>

          <div className="flex justify-between items-center mb-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="flex space-x-12">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Metrics rows */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between py-4 border-t border-gray-100">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="flex space-x-12">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className=" rounded-lg shadow-sm p-6 animate-pulse bg-gray-100">
        <div className="mb-6">
          <div className="h-5 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-end space-x-4 mb-6">
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Chart skeleton */}
        <div className="h-64 w-full flex items-end justify-between space-x-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 w-full">
              <div
                className="w-full bg-gray-200 rounded-t"
                style={{
                  height: `${Math.random() * 100 + 20}px`,
                }}
              ></div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Scenario Highlight Section */}
      <div className=" rounded-lg shadow-sm p-6 animate-pulse bg-gray-100">
        <div className="mb-4">
          <div className="h-5 w-40 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-6"></div>
        </div>

        {/* Impact section */}
        <div className="mb-6">
          <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
          <div className="pl-4 space-y-3">
            <div className="flex items-start">
              <div className="h-3 w-3 rounded-full bg-gray-200 mt-1 mr-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-start">
              <div className="h-3 w-3 rounded-full bg-gray-200 mt-1 mr-2"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Associated Risk section */}
        <div className="mb-6">
          <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="pl-4 space-y-3">
            <div className="flex items-start">
              <div className="h-3 w-3 rounded-full bg-gray-200 mt-1 mr-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-start">
              <div className="h-3 w-3 rounded-full bg-gray-200 mt-1 mr-2"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Recommendation section */}
        <div>
          <div className="h-4 w-36 bg-gray-200 rounded mb-3"></div>
          <div className="pl-4">
            <div className="flex items-start">
              <div className="h-3 w-3 rounded-full bg-gray-200 mt-1 mr-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}