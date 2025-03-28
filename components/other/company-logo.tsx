import { Box } from "@mantine/core"
import { SVGProps } from "react"
import { IconFilledCompanyLogo } from "@/public/assets/svg/icon-company-filled-logo"

export const CompanyLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <Box >
      <IconFilledCompanyLogo {...props} />
    </Box >
  )
}

