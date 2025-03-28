import { DianaInsight } from '@/components/diana/overview/diana-insight';
import { convertToLabelValueList } from '@/lib/helper';
import { IconSignPost } from '@/public/assets/svg/icon-sign-post';
import { InsightDetailsModel, InsightModel } from '@/types/general';
import { Box } from '@mantine/core';
import { FC } from 'react';
import { ProjectHeader } from './project.header';

interface CriticalCovenantProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
  hideInsight?: boolean;
  onInsight?: (type: InsightDetailsModel) => void;
}


export const CriticalCovenants: FC<CriticalCovenantProps> = ({
  project,
  hideInsight,
  onInsight,
}) => {
  const structure_covernants =
    project?.project_overview_and_underwriting?.deal_structure?.covenants?.structure || {};
  const allocation =
    project?.project_overview_and_underwriting?.deal_structure?.covenants?.allocation || {};

  const insight =
    project?.project_overview_and_underwriting?.deal_structure?.covenants
      ?.insight || '';
  const dataList = [
    {
      label: 'Structure',
      sectionList: convertToLabelValueList(structure_covernants)
    },
    {
      label: 'Allocations',
      sectionList: convertToLabelValueList(allocation)
    },
  ]

  return (
    <Box className="py-.5 w-full rounded-xl bg-gray-100 px-1 pb-4">
      <ProjectHeader title="Tax Equity Parameters" />
      <div className="grid gap-4">
        {
          dataList?.map((item) => {
            return (
              <div key={item?.label} className="grid grid-cols-[1fr_10fr]">
                <div className="flex justify-center pt-4">
                  <IconSignPost />
                </div>

                <div className="grid gap-0 overflow-hidden rounded-xl border bg-white text-[14px]">
                  <div className="flex h-[50px] items-center justify-between rounded-t-xl border-b bg-gray-50 px-4">
                    <h3 className="text-sm font-medium uppercase text-gray-700">
                      {item?.label}
                    </h3>
                  </div>


                  {item?.sectionList?.map(
                    (sectionItem, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b px-4 py-2"
                      >
                        <h3 className="dashboard-card-text capitalize">
                          {sectionItem?.label.split('_').join(' ')}
                        </h3>
                        <div
                          className={`flex items-center gap-2 rounded-md border border-gray-100 px-2 py-1 text-sm`}
                        >

                          <span
                            className={` dashboard-card-text`}
                          >
                            {sectionItem?.value}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          })
        }
      </div>

      {!hideInsight && (
        <DianaInsight
          title="Tax Equity Parameters"
          onClick={(insight: string, title: string) => {
            onInsight?.({
              insight: insight,
              title: title,
            });
          }}
          insight={insight as InsightModel[]}
        />
      )}
    </Box>
  );
};
