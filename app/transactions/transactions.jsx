"use client";
import { formatAmount } from "@/utils/formatCash";
import Image from "next/image";

export default function Transactions({ transactions }) {
  return (
    <>
      <div className="hidden sm:flex w-full gap-10 justify-between border-b border-gray-200 pb-5">
        <span className="flex justify-between w-[50%] preset-5 text-left">
          <p>Recepient / Sender</p>
          <p>Category</p>
        </span>
        <span className="flex justify-between w-[50%] preset-5">
          <p>Transaction Date</p>
          <p>Amount</p>
        </span>
      </div>
      <ul>
        {transactions.map((trx, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === transactions.length - 1;

          const paddingClass = isFirst ? "pb-5" : isLast ? "pt-5" : "py-5";

          return (
            <li
              key={trx.id}
              className={`${paddingClass} flex justify-between items-center gap-10 ${
                idx > 0 ? "border-t border-gray-200" : ""
              }`}
            >
              <div className="flex flex-col items-start sm:flex-row justify-between sm:items-center w-[50%]">
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
                <p className="preset-5 text-left">{trx.category}</p>
              </div>
              <div className="flex flex-col items-end sm:flex-row-reverse justify-between w-[50%] sm:items-center">
                <p
                  className={`${
                    trx.amount < 0 ? " " : "text-green-500"
                  } text-sm font-bold text-right`}
                >
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
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
