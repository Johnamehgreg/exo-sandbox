import { Box, Container, Flex, SimpleGrid, Text, Transition } from "@mantine/core";
import { JSX, useEffect, useState } from "react";
import { CompanyLogo } from "@/components/other/company-logo";
import images from "@/public/assets/svg/auth-background.svg";
import { StackItem } from "../../other/stack-item";
import ErrorBoundary from "./error-layout";

interface LayoutProps {
  children: React.ReactNode;
  hideLeft?: boolean,
  showLeftOnMobile?: boolean,
  sidelist?: {
    title?: string,
    list?: { title: React.ReactNode, icon: JSX.Element }[]
  }
}
export const AuthLayout: React.FC<LayoutProps> = ({ children, showLeftOnMobile, hideLeft, sidelist }) => {

  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    setAnimate(true)
  }, [])
  return (
    <Box
      className="bg-cover overflow-y-auto overflow-x-hidden bg-no-repeat bg-center h-[100vh]  "
      style={{
        backgroundImage: `url(${images})`,
      }} >
      <Transition
        mounted={animate}
        transition='fade-left'
        duration={500}
        timingFunction="ease"
      >
        {(styles) =>
          <ErrorBoundary >
            <Container style={styles} size={hideLeft ? 'xs' : 'lg'} className="w-full h-full" >
              <SimpleGrid cols={{ base: 1, sm: hideLeft ? 1 : 2, }} spacing={'3rem'} className="h-full" >
                {
                  !hideLeft && (
                    <Flex c={'white'} className={`${!showLeftOnMobile && 'hidden'}  md:flex`} justify={'center'} direction={'column'}>
                      <Box mb={'lg'}>
                        <CompanyLogo />
                      </Box>
                      <Text mb={'2rem'} className="text-[1.3rem] font-medium sm:text-[1.5rem] md:text-[2rem] text-[#000407]" >
                        {sidelist?.title || ' Experience our cutting-edge AI solutions firsthand.'}
                      </Text>
                      <StackItem sidelist={sidelist?.list} />
                    </Flex>
                  )
                }
                {children}
              </SimpleGrid>
            </Container>
          </ErrorBoundary>
        }
      </Transition>
    </Box>

  )
}

