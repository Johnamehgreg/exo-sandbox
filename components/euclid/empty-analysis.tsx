import emptyAnalysis from "@/public/assets/svg/euclid/emptyAnalysis.svg";
import { Text } from "@mantine/core";
import Image from "next/image";
const EmptyAnalysis = () => {
  return (
    <div className="w-full flex items-center justify-center mt-4">
      <div
        style={{
          backgroundImage:
            "url('/assets/svg/euclid/background-pattern-decorative.svg')",
        }}
        className="w-[20%] flex flex-col items-center justify-center h-[20vh] bg-center bg-no-repeat bg-cover"
      >
        <Image src={emptyAnalysis} alt="empty" width={40} height={40}  />
        <Text className="text-sm font-[600] mt-4 ">
          No credit analysis saved
        </Text>
      </div>
    </div>
  );
};

export default EmptyAnalysis;
