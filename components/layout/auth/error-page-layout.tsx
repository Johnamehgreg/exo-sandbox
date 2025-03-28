import { Box, Container, Flex, Text } from "@mantine/core";
import errorPageImage from "@/public/assets/svg/errorPageImage.svg";
import Image from "next/image";
interface Props {
  title?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  error?: Error | null;
  resetError?: () => void;
}
export const ErrorPageLayout: React.FC<Props> = ({
  title,
  message,
  error = null,
  children,
}) => {
  return (
    <Box className="w-full min-h-[calc(100vh_-_100px)] !bg-white flex items-center overflow-hidden bg-no-repeat bg-cover bg-bottom">
      <Container size={"sm"}>
        <Flex className=" flex-col  w-full  items-center ">
          <Image
            className="!w-[200px] mb-[16px]"
            src={errorPageImage}
            alt="error"
          />
          <Text className="text-[24px] mb-[8px] text-center font-semibold text-color">
            {title || error?.name || "Error"}
          </Text>
          <Text className="text-[16px] text-center mb-[16px] font-normal text-color-gray">
            {message}
          </Text>
          {children}
        </Flex>
      </Container>
    </Box>
  );
};
