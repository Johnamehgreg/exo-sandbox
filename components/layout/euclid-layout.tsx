import EuclidHeader from '@/app/app/(main-app)/euclid/components/euclid-header'
import { Box } from '@mantine/core'
import { Session } from 'next-auth'
import React from 'react'

interface EuclidLayoutProps {
    children: React.ReactNode
    session:Session | null
    }

const EuclidLayout:React.FC<EuclidLayoutProps> = ({children,session}) => {
  return (
    <div className='border border-[#D1D5DB] bg-[#F9FAFB] h-[calc(100vh-16px)] rounded-[6px] m-2 overflow-y-auto '>
        <EuclidHeader session={session} />
        <Box className=''>{children}</Box>
        
    </div>
  )
}

export default EuclidLayout