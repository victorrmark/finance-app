"use client";
import Image from "next/image";
import { formatAmount } from "@/utils/formatCash";

export default function BillSummary({ transactions }) {
  const totalBills = transactions.reduce(
    (acc, trx) => acc + Math.abs(Number(trx.amount)),
    0
  );


  const recurring = [
    { name: "Paid", amount: 0, total: 0 },
    { name: "Due Soon", amount: 0, total: 0 },
    { name: "Upcoming", amount: 0, total: 0 },
  ];

  transactions.forEach((trx) => {
    const today = new Date();
    const dueDate = new Date(trx.date);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffMs = dueDate - today;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
        recurring[0].amount += Math.abs(Number(trx.amount));
        recurring[0].total += 1;
    } else if (diffDays <= 5) {
      recurring[1].amount += Math.abs(Number(trx.amount));
      recurring[1].total += 1;
    } else {
      recurring[2].amount += Math.abs(Number(trx.amount));
      recurring[2].total += 1;
    }

  });

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 sm:justify-between">
      <div className="flex sm:flex-col items-center sm:items-start gap-5 sm:gap-8 p-6 rounded-xl bg-gray-900 h-auto sm:justify-end grow">
        <Image
          alt="Recurring Bills Icon"
          src="/images/icon-recurring-bills.svg"
          height={25}
          width={25}
        />
        <span>
          <p className="text-white text-sm">Total Bills</p>
          <h1 className="text-white">{formatAmount(totalBills)}</h1>
        </span>
      </div>

      <div className="flex flex-col bg-white gap-5 p-5 grow rounded-xl ">
        <p className="preset-3">Summary</p>
        <div>
          <span className="flex justify-between items-center pb-4 border-b border-b-gray-100">
            <p className="preset-5">Paid Bills</p>
            <p className="preset-5-bold">
              {recurring[0].total} ({formatAmount(recurring[0].amount)})
            </p>
          </span>
          <span className="flex justify-between items-center py-4">
            <p className="preset-5">Total Upcoming</p>
            <p className="preset-5-bold">
              {recurring[2].total} ({formatAmount(recurring[2].amount)})
            </p>
          </span>
          <span className="flex justify-between items-center text-red-500 pt-4 border-t border-t-gray-100">
            <p className="text-xs">Due Soon</p>
            <p className=" text-xs font-bold">
              {recurring[1].total} ({formatAmount(recurring[1].amount)})
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
