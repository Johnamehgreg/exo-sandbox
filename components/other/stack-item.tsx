import { Avatar, Flex, Transition } from "@mantine/core"
import React, { JSX, useEffect, useState } from "react"
import { IconBarChart } from "@/public/assets/svg/bar-chart"
import { IconGridCard } from "@/public/assets/svg/icon-grid-card"
import { IconStack } from "@/public/assets/svg/icon-stack"

const rightList = [
  {
    title: 'Go from not knowing to knowledge with Fibonacci. View distribution of anomaly scores for recent transactions',
    icon: <IconStack />
  },
  {
    title: 'A platform for monitoring, with data touch-points for top users with risk scores',
    icon: <IconBarChart />
  },
  {
    title: 'Go from meaningless data to a KPI dashboard of fraud detection rate, false positive rate, average time to detect.',
    icon: <IconGridCard />
  },
]

interface Props {
  sidelist?: { title?: React.ReactNode, icon?: JSX.Element }[]

}

export const StackItem: React.FC<Props> = ({ sidelist }) => {

  const [sliderAnimate, setSliderAnimate] = useState(false)

  useEffect(() => {
    setSliderAnimate(true)
  }, [])

  return (
    <>
      {
        (sidelist || rightList).map((item, index) => {
          return (
            <Transition
            key={index}
              mounted={sliderAnimate}
              transition='slide-left'
              duration={(index + 1) * 500}
              timingFunction="ease"
            >
              {(sliderStyles) =>
                <Flex
                  className="items-start gap-2 sm:gap-4 sm:items-center mb-[2rem]"
                  style={sliderStyles}
                >
                  <Avatar size={'40px'} bg={'#fff'} >
                    {item.icon}
                  </Avatar>
                  <span className="text-[#000407]">{item.title}</span>
                </Flex  >}
            </Transition>

          )
        })
      }
    </>
  )
}

