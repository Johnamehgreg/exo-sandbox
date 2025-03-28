"use client"
import EuclidLayout from '@/components/layout/euclid-layout'
import { ModifyLoanTermModal } from '@/components/modal/modify-loan-term-modal'
import { Flex } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { PropsWithChildren, useState } from 'react'
import LoanRequestDetails from "../../components/loan-request-details"
import CreditAnalysisHeader from './CreditAnalysisHeader'

const EuclidPage = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession()
  const [showModal, setShowModal] = useState<boolean>(false)
    return <EuclidLayout session={session} >
    <CreditAnalysisHeader status="Processing" setShowModal={setShowModal} /> 
    <Flex className=' justify-between p-2 bg-white h-[calc(100vh-139px)] '>
      <LoanRequestDetails />
        {children}
    </Flex>
     <ModifyLoanTermModal
            isVisible={showModal}
            setShowModal={setShowModal}
            onClose={() => setShowModal(false)}
           
          />
  </EuclidLayout>
}

export default EuclidPage