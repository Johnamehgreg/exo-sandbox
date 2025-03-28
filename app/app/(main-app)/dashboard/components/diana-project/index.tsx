import { IconInfo } from '@/public/assets/svg/icon-info';
import { DianaProjectProps } from '@/types/overview';
import { Box } from '@mantine/core';
import { DianaRiskLevel } from './diana-riskevel';
import { ExoAction } from './exo-action';

const DianaProject = (props: DianaProjectProps) => {
  return (
    <Box className="h-max rounded-lg bg-gray-100 px-1 pb-2 lg:sticky lg:top-4">
      <div className="flex w-full items-center justify-between">
        <p className="flex items-center gap-1 px-2 py-3 font-medium text-primary">
          {props.name}
          <IconInfo className="h-4 w-4" />
        </p>

        <DianaRiskLevel score={props.riskLevel} level={props.riskLevelText} />
      </div>
      <Box className="rounded-lg bg-white px-2.5 py-2">
        <div className="flex items-center justify-between border-b py-4">
          <span className="text-[14px] leading-5 text-gray-600">Asset</span>
          <span className="text-[14px] font-medium leading-5 text-gray-800">
            {props.asset}
          </span>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="text-[14px] leading-5 text-gray-600">Capacity</span>
          <span className="text-[14px] font-medium leading-5 text-gray-800">
            {props.capacity}
          </span>
        </div>

        <div className="my-2.5 grid grid-cols-2 gap-2.5">
          <div className="flex flex-col rounded-md bg-gray-100 py-4 pl-4">
            <span className="leading-2 mb-2.5 text-[14px] text-gray-600">
              Capital <br /> Expenditure
            </span>
            <span className="text=[18px] text-[20px] font-semibold leading-5 text-gray-800">
              {props.expense.capitalExpenditure}
            </span>
          </div>
          <div className="flex flex-col rounded-lg bg-gray-100 py-4 pl-4">
            <span className="leading-2 mb-2.5 text-[14px] text-gray-600">
              Annual <br /> Revenue
            </span>
            <span className="text-[18px] font-semibold leading-5 text-gray-800">
              {props.expense.annualRevenue}
            </span>
          </div>
        </div>

        <p className="mb-2 mt-5 text-[14px] font-medium">
          {props.recommendationTitle}
        </p>

        <ExoAction
          key={2}
          type={props.type}
          label={props.recommendation}
          actionText={props.actionText}
        />
      </Box>
    </Box>
  );
};

export default DianaProject;
