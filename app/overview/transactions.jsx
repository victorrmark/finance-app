"use client";
import Link from "next/link";
import Image from "next/image";
import { useFinanceData } from "../context/DataContext";
import { formatAmount } from "@/utils/formatCash";

export default function Transactions() {
  const { transactions } = useFinanceData();

  return (
    <div className="flex flex-col gap-8 px-5 py-6 sm:p-8 rounded-xl bg-white">
      <span className="flex justify-between items-center">
        <h2>Transactions</h2>
        <Link href="/transactions">
          <span className="flex gap-3 items-center">
            <p className="preset-4">View All</p>
            <Image
              width={5}
              height={5}
              alt="show more icon"
              src="/images/caret-right.svg"
            />
          </span>
        </Link>
      </span>

      <div>
        {transactions.slice(0, 5).map((trx, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === transactions.length - 1;

          const paddingClass = isFirst ? "pb-5" : isLast ? "pt-5" : "py-5";

          return (
            <div key={idx} className={`flex justify-between items-center ${paddingClass} ${idx > 0 ? "border-t border-gray-200" : ""}`}>
              <span className="flex gap-3 items-center">
                <Image
                  alt="transaction icon"
                  src={trx.avatar}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p className="preset-4-bold">{trx.name}</p>
              </span>
              <span>
                <p className={`${trx.amount < 0 ? " " : "text-green-500"} text-sm font-bold text-right`}>
                  {trx.amount > 0 && `+${formatAmount(trx.amount)}`}
                  {trx.amount < 0 && formatAmount(trx.amount)}
                </p>
                <p className="preset-5">
                  {new Date(trx.date).toLocaleDateString("en-GB", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
