import arrowDown from "@/public/assets/svg/arrowDown.svg";
import { Box } from "@mantine/core";
import Image from "next/image";
import { useMemo } from "react";

interface ReceiverSenderTableProp {
    userType:string
}
const ReceiverSenderTable:React.FC<ReceiverSenderTableProp> = ({userType}) => {
  const transactions = useMemo(
    () => [
      {
        id: 1,
        date: "Dec 5, 2024",
        name: "Adeboye Yusuf",
        bank: "Sterling",
        requestAmount: "₦12,000,000",
        summary:
          "Based on this applicant’s net surplus, we estimate they could comfortably repay up to ₦35,000,000 over a 2-year term.",
        status: "Processing",
        statusClass: "bg-processing-bg text-[#EAB308]",
      },
      {
        id: 2,
        date: "Nov 20, 2024",
        name: "Chinwe Okafor",
        bank: "GTBank",
        requestAmount: "₦5,000,000",
        summary:
          "The applicant has a stable income and can repay up to ₦10,000,000 over a 3-year term.",
        status: "Completed",
        statusClass: "bg-completed-bg text-[#177A48]",
      },
      {
        id: 3,
        date: "Oct 15, 2024",
        name: "Samuel Johnson",
        bank: "Access Bank",
        requestAmount: "₦8,500,000",
        summary:
          "Insufficient funds in applicant's account history, making repayment challenging.",
        status: "Failed",
        statusClass: "bg-failed-bg text-[#DC2626]",
      },
    ],
    []
  );


  return (
    <Box className="px-1 pb-1 my-2  rounded-b-[8px] ">
      <Box className=" border border-[#D1D5DB] rounded-[10px] overflow-hidden">
        <table className="w-full bg-white">
          <thead className="uppercase w-full h-[40px] text-[10px] text-[#4B5563] ">
            <tr className="w-full text-left sticky top-0 bg-[#F9FAFB]  font-[400] ">
              <th className="pl-4 w-[40%]  ">
                <span className="flex items-center gap-1">NAME
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[30%] ">
                <span className="flex items-center justify-between  ">
                  {userType === "sender" && "LOAN"} AMOUNT
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[30%]">
                <span className="flex items-center justify-between ">
                    FREQUENCY
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
  {transactions.map((transaction) => (
    <tr key={transaction.id} className="text-[12px] hover:bg-[#F3F4F6] ">
      <td className="p-4 border border-[#F3F4F6] font-[350] text-[#1F2937] ">
        {userType === "sender" ? "Bet9ja" : "Global Imports Ltd "}
      </td>
      <td className="p-4 border border-[#F3F4F6] font-[350] ">₦20,000,000 </td>
      <td className="p-4 border border-[#F3F4F6] font-[350] text-[#6B7280] border-r-0">1x / Monthly </td>
      
    </tr>
  ))}
</tbody>

        </table>
      </Box>
    </Box>
  );
};

export default ReceiverSenderTable;
