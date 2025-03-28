import { IconInfo } from '@/public/assets/svg/icon-info';
import { FinancialBreakdownProps, KeyTermsData } from '@/types/overview';
import { Carousel } from '@mantine/carousel';
import { Accordion, Divider, Tooltip } from '@mantine/core';
import { FC } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

export const FinancialBreakdown: FC<{
  data: FinancialBreakdownProps[];
  terms: KeyTermsData[];
}> = ({ data, terms }) => {
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    value: number;
  }) => {
    // Calculate the position for the label
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const radian = (midAngle * Math.PI) / 180;
    const x = cx + radius * Math.cos(-radian);
    const y = cy + radius * Math.sin(-radian);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="600"
      >
        {value}%
      </text>
    );
  };

  const financialBreakdownArray = Object.values(data);
  return (
    <div className="dashboard-white-card grid gap-2.5">
      <div className="flex flex-col items-center justify-around gap-2 p-8 sm:flex-row">
        {/* Donut Chart */}
        <div className="relative h-[250px] w-[250px]">
          <PieChart width={250} height={250}>
            <Pie
              data={Object.values(data)}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              label={renderLabel}
              labelLine={false}
            >
              {Object.values(data).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] font-[350] leading-[24px] text-gray-500">
            Financial breakdown
          </h2>
          {financialBreakdownArray?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-8"
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-lausanne text-[12px] font-[350] leading-[24px] text-gray-600 capitalize">
                  {(item?.name || '')?.split('_').join(' ')}
                </span>
              </div>
              <span className="font-lausanne text-[12px] font-[650] leading-[24px] text-gray-800">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <Divider className="bg-stone" />

      {/* Key Terms */}

      <div>
        <Accordion defaultValue={'key-terms'}>
          <Accordion.Item
            className="!h-auto border-0 !pb-3"
            value={'key-terms'}
          >
            <Accordion.Control className="border-0 px-2.5">
              <div className="flex w-max items-center justify-between gap-2 text-sm">
                <p className="gray-card-header-text text-[14px] font-[450]">
                  Key Terms
                </p>
                <Tooltip label="Key terms" className="flex items-center">
                  <IconInfo className="h-4 w-4" />
                </Tooltip>
              </div>
            </Accordion.Control>
            <Accordion.Panel
              classNames={{
                content: 'pr-0',
              }}
              className="!px-0"
            >
              <div>
                {
                  <div className="flex flex-col gap-2">
                    <Carousel
                      slideSize="33.333333%"
                      slideGap="md"
                      height={80}
                      loop
                      slidesToScroll={3}
                    >
                      {terms?.map((term, index) => (
                        <Carousel.Slide className="ml-2" key={index}>
                          <div className="grid h-full place-content-center gap-1 rounded-lg bg-gray-100 py-2">
                            <p className="text-center text-sm text-gray-600">
                              {term.title}
                            </p>
                            <p className="text-center text-lg font-medium text-gray-800">
                              {term.description}
                            </p>
                          </div>
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                  </div>
                }
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
