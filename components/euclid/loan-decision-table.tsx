import { useMemo, useState } from "react";
import arrowLeft from "@/public/assets/svg/arrow-left.svg";
import arrowRight from "@/public/assets/svg/arrow-right.svg";
import arrowDown from "@/public/assets/svg/arrowDown.svg";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { Box, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import customerHeader from "@/public/assets/svg/euclid/euclidCustomer.svg";

const LoanDecisionTable = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [rowNo, setRowNo] = useState<number>(10);
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
  
  const rowOptions = useMemo(() => [10, 20, 30, 40, 50], []);

  return (
    <Box className="px-[10px] pt-[10px] pb-1 bg-white rounded-b-[8px] border-x border-b border-[#E5E7EB] ">
      <Box className=" border border-[#D1D5DB] rounded-[10px] overflow-hidden">
        <table className="w-full bg-white">
          <thead className="uppercase w-full h-[40px] text-[10px] text-[#4B5563] ">
            <tr className="w-full text-left sticky top-0 bg-[#F9FAFB]  font-[400] ">
              <th className="pl-4 w-[15%]  ">
                <span className="flex items-center gap-1">BANK
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[15%] ">
                <span className="flex items-center justify-between  ">
                  LOAN AMOUNT
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[15%]">
                <span className="flex items-center justify-between ">
                  OUTSTANDING
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[15%]">
                <span className="flex items-center justify-between ">
                  MONTHS LEFT
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="w-[15%] px-4">
                <span className="flex items-center justify-between ">
                  TYPE
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[25%]">
                <span className="flex items-center justify-between ">
                  PAYMENT FREQUENCY
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
  {transactions.map((transaction) => (
    <tr key={transaction.id} className="text-[12px] hover:bg-[#F3F4F6] ">
      <td className="p-4 border border-[#F3F4F6] font-[350] text-[#1F2937] ">
        <span className="flex items-center gap-1">
          <Image src={customerHeader} alt="customer" width={20} height={20} className="rounded-full" />
          GTBank
        </span>
      </td>
      <td className="p-4 border border-[#F3F4F6] font-[350] ">₦20,000,000 </td>
      <td className="p-4 border border-[#F3F4F6] font-[350] border-r-0">₦120,000,000 </td>
      <td className="p-4 border border-[#F3F4F6] font-[350]">4</td>
      <td className="p-4 border border-[#F3F4F6] font-[350] border-r-0 border-l-[#D1D5DB]">
      Investments
      </td>
      <td className="p-4 border border-[#F3F4F6] font-[350] border-r-0 border-l-[#D1D5DB]">
      Monthly - ₦100,000
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </Box>
      <Box className="px-5 flex items-center justify-between bg-white py-2 border border-[#D1D5DB] rounded-[8px] mb-2 mt-[10px] text-[14px] text-[#4B5563] ">
        <Box className="relative">
          <span className="text-[14px] flex items-center gap-1 justify-center ">
            Show
            <div className="border rounded-[8px] px-2 flex items-center gap-1 ">
              {rowNo}
              <UnstyledButton onClick={() => setOpened(!opened)}>
                <IconDropDown
                  className={`${opened && "rotate-180"} transition-all`}
                />
              </UnstyledButton>
            </div>
            {opened && (
              <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                {rowOptions.map(value => (
                  <li
                    key={value}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setOpened(false);
                      setRowNo(value);
                    }}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            )}
            records
          </span>
        </Box>
        <Box>
          <Text className="text-[14px] "> Showing 1-3 of 1</Text>
        </Box>
        <Box className="flex items-center gap-4">
          <button>
            <Image src={arrowLeft} alt="prev" />
          </button>
          <button>
            <Image src={arrowRight} alt="next" />
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoanDecisionTable;
