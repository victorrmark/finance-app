"use client";
import Link from "next/link";
import { useFinanceData } from "../context/DataContext";
import Image from "next/image";
import { formatAmount } from "@/utils/formatCash";

export default function Recurring() {
  const { recurringTrx } = useFinanceData();

  const currentDay = new Date().getDate();

  const recurring = [
    { name: "Paid", amount: 0, theme: "#277c78" },
    { name: "Upcoming", amount: 0, theme: "#f2cdac" },
    { name: "Due Soon", amount: 0, theme: "#82c9d7" },
  ];

  recurringTrx.forEach((trx) => {
    const today = new Date();
    const dueDate = new Date(trx.date);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffMs = dueDate - today;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      recurring[0].amount += Math.abs(Number(trx.amount));
    } else if (diffDays <= 5) {
      recurring[1].amount += Math.abs(Number(trx.amount));
    } else {
      recurring[2].amount += Math.abs(Number(trx.amount));
    }
  });

  return (
    <div className="flex flex-col gap-8 px-5 py-6 sm:p-8 rounded-xl bg-white">
      <span className="flex justify-between items-center">
        <h2>Recurring Bills</h2>
        <Link href="/recurring-bills">
          <span className="flex gap-3 items-center">
            <p className="preset-4">See Details</p>
            <Image
              width={5}
              height={5}
              alt="show more icon"
              src="/images/caret-right.svg"
            />
          </span>
        </Link>
      </span>
      <div className="flex flex-col gap-4">
        {recurring.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-5 px-4 bg-beige-100 rounded-l-lg border-l-4"
            style={{ borderLeftColor: item.theme }}
          >
            <p className="preset-4">{item.name}</p>
            <p className="preset-4-bold">{formatAmount(item.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
