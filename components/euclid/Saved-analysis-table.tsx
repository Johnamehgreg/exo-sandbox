import arrowLeft from "@/public/assets/svg/arrow-left.svg";
import arrowRight from "@/public/assets/svg/arrow-right.svg";
import arrowDown from "@/public/assets/svg/arrowDown.svg";
import checked from "@/public/assets/svg/checkCircle.svg";
import failed from "@/public/assets/svg/failed.svg";
import { IconArchiveBox } from "@/public/assets/svg/icon-archive-box";
import { IconDropDown } from "@/public/assets/svg/icon-drop-down";
import { OptionsIcon } from "@/public/assets/svg/optionsIcon";
import { ActionIcon, Box, Menu, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const SavedAnalysisTable = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [rowNo, setRowNo] = useState<number>(10);
  const router = useRouter()
  
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
    <Box className="">
      <Box className=" border border-[#D1D5DB] rounded-[10px] overflow-hidden">
        <table className="w-full">
          <thead className="uppercase w-full h-[40px] text-sm text-[#4B5563] ">
            <tr className="w-full text-left sticky top-0 bg-[#F9FAFB] font-[400] ">
              <th className="pl-4 w-[5%] text-[14px] ">
                <span className="flex items-center gap-1">
                  S/N
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[12%]">
                <span className="flex items-center justify-between ">
                  Date
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[14%]">
                <span className="flex items-center justify-between ">
                  Name 
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[12%]">
                <span className="flex items-center justify-between ">
                  Bank
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="w-[12%] px-4">
                <span className="flex items-center justify-between ">
                  Request amount
                  <Image src={arrowDown} alt="S/N" />
                </span>
              </th>
              <th className="px-4 w-[30%]">
                Summary
              </th>
              <th className="w-[10%] pl-4  border-l border-l-[#D1D5DB] ">
                Status
              </th>
              <th className="w-[5%] px-2 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
  {transactions.map((transaction, index) => (
    <tr 
    onClick={() => router.push(`euclid/${transaction.id}/credit-analysis`)} 
    key={transaction.id} className="text-[14px]  cursor-pointer hover:bg-[#F3F4F6] ">
      <td className="px-4 py-[14px] border border-[#F3F4F6] font-[350]">{index + 1}</td>
      <td className="px-4 py-[14px] border border-[#F3F4F6] font-[350]">{transaction.date}</td>
      <td className="px-4 py-[14px] border border-[#F3F4F6] font-[350] border-r-0">{transaction.name}</td>
      <td className="px-4 py-[14px] border border-[#F3F4F6] font-[350]">{transaction.bank}</td>
      <td className="px-4 py-[14px] border border-[#F3F4F6] font-[350] border-r-0 border-l-[#D1D5DB]">
        {transaction.requestAmount}
      </td>
      <td className="px-4 py-[14px] border border-[#F3F4F6] font-[350] border-r-0 border-l-[#D1D5DB]">
        {transaction.summary}
      </td>
      <td className="px-4 py-[14px] border border-[#F3F4F6] font-[350] border-r-0 border-l-[#D1D5DB]">
        <span className={`text-[12px] w-fit flex items-center gap-1 justify-center border border-[#D1D5DB] font-[450] px-[10px] py-[5px] rounded-[4px] ${transaction.status === "Completed" ? "bg-completed-bg text-[#00964A] " : transaction.status === "Processing" ? "bg-processing-bg text-[#2C5C80]" : "bg-failed-bg text-[#A63418]"}`}>
           {transaction.status !== "Processing" && <Image src={transaction.status === "Completed" ? checked  : failed } alt="S/N" />}
           
            
          {transaction.status}
        </span>
      </td>
      <td className="px-4 py-[14px] border-l border-l-[#D1D5DB] font-[350]">
        <span className="flex items-center relative ">
          <IconArchiveBox />
          <Menu withArrow>
                    <Menu.Target>
                      <ActionIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  bg={"transparent"}
                                >
                                   <OptionsIcon />
                                </ActionIcon>
                      
                    </Menu.Target>
                    <Menu.Dropdown>
                              <Menu.Item
                                color="#00964A"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`euclid/${transaction.id}/credit-analysis`)
                                }}
                                className="text-[12px] font-normal min-w-[130px]"
                              >
                                View Analysis
                              </Menu.Item>
                              <Menu.Item
                                color="red"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="text-[12px] font-normal min-w-[130px]"
                              >
                                Delete Analysis
                              </Menu.Item>
                            </Menu.Dropdown>
                     
          </Menu>
        </span>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </Box>
      <Box className="px-5 flex items-center justify-between py-2 border border-[#D1D5DB] rounded-[8px] mt-1 text-[14px] text-[#4B5563] ">
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

export default SavedAnalysisTable;
