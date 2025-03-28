import { Box, Flex, Text } from '@mantine/core'
import React from 'react'

interface LegendProp {
    item: {
        name:string,
        percent:number,
        number: number
      }
}
const Legend:React.FC<LegendProp> = ({item}) => {
  return (
    <Flex className='hover:bg-[#F1FFF8] border-b border-b-[#F3F4F6] pb-2 py-2 px-3 items-center justify-around gap-1 '>
        <Text className='text-[12px] '>{item.name}</Text>
        <Box className='w-[60%] bg-[#F3F4F6] rounded-[20px] h-[6px] relative '>
        <Box 
  className="absolute left-0 bg-[#00964A] rounded-[20px] h-full"
  style={{ width: `${item.percent}%` }} 
/>

        </Box>
        <Text className='text-[12px]'>{item.number}</Text>
    </Flex>
  )
}

export default Legend