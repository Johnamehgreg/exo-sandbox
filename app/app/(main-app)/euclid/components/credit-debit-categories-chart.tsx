import { CreditCardIcon } from '@/public/assets/svg/euclid/credit-card'
import { FinancialBreakdownProps } from '@/types/overview'
import { Box, Flex, Text } from '@mantine/core'
import React, { useMemo } from 'react'
import { Cell, Pie, PieChart } from 'recharts'

interface CreditDebitCardProp {
  cardType: string
}

const CreditDebitCategoriesChart: React.FC<CreditDebitCardProp> = ({ cardType }) => {
  const creditData: FinancialBreakdownProps[] = useMemo( () => [
    { name: "Investment", value: 40, amount: "₦1,200,000", color: "#007B3E" },
    { name: "Salary", value: 60, amount: "₦1,800,000", color: "#00964A" },
  ],[]);

  const debitData: FinancialBreakdownProps[] = useMemo( () => [
    { name: "Groceries", value: 25, amount: "₦500,000", color: "#852913" },
    { name: "Sports Betting", value: 10, amount: "₦200,000", color: "#A02D16" },
    { name: "Savings", value: 30, amount: "₦600,000", color: "#6E1F10" },
    { name: "Utilities", value: 20, amount: "₦400,000", color: "#992811" },
    { name: "Health Care", value: 15, amount: "₦300,000", color: "#731D0E" },
  ],[]);

  const data = cardType === "Credit" ? creditData : debitData;
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className='w-[49.7%] bg-white rounded-[8px] p-3 min-h-[320px]'>
      <Flex className='justify-between'>
        <Flex className='items-center gap-1'>
          <CreditCardIcon fill={cardType === "Credit" ? "#00964A" : "#C73E1D"} />
          <Text className='text-[14px]'>{cardType} Categories</Text>
        </Flex>
        <Flex className='items-center gap-1'>
          <Text className='text-[14px] text-[#6B7280]'>Total Value:</Text>
          <Text className='text-[14px]'>₦50,000,000</Text>
        </Flex>
      </Flex>
      <Flex className='items-center justify-between w-full gap-2 h-full'>
        <div className="relative">
          <PieChart width={180} height={180}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={90}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="w-full">
          {data.map((item, index) => {
            const percentage = ((item.value / totalValue) * 100).toFixed(1);
            return (
              <Flex key={index} className='items-center justify-between py-1'>
                {/* Legend */}
                <Flex className='items-center gap-1'>
                  <Box className="w-1 h-3" style={{ backgroundColor: item.color }}></Box>
                  <Text className='text-[14px]'>{item.name}</Text>
                </Flex>
                {/* Amount and Percentage */}
                <Flex className='items-center gap-1'>
                  <Text className='text-[12px]'>{item.amount}</Text>
                  <Text className='text-[#6B7280] text-[12px]'>{percentage}%</Text>
                </Flex>
              </Flex>
            );
          })}
        </div>
      </Flex>
    </div>
  );
};

export default CreditDebitCategoriesChart;
