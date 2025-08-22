"use client";
import Image from "next/image";
import { formatAmount } from "@/utils/formatCash";

export default function RecurringBills({ transactions }) {
  // const sorted = transactions.sort(
  //   (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
  // );

  const categorize = (day) => {
    const today = new Date();
    const dueDate = new Date(day);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffMs = dueDate - today;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      return {
        status: "Paid",
        color: "text-green-600",
        icon: "/images/bill-paid.svg",
      };
    } else if (diffDays <= 5) {
      return {
        status: "Due Soon",
        color: "text-red-600",
        icon: "/images/bill-due.svg",
      };
    } else {
      return {
        status: "Upcoming",
        color: "text-gray-900",
        icon: null,
      };
    }

  };

  return (
    <>
      <div className="hidden sm:flex w-full gap-2 justify-between border-b border-gray-200 pb-5">
        <span className="flex justify-between w-[60%] preset-5 grow ">
          <p>Bill Title</p>
        </span>
        <span className="flex justify-between w-[35%] preset-5 grow ">
          <p>Due Date</p>
          <p>Amount</p>
        </span>
      </div>

      <ul>
        {transactions.map((trx, idx) => {
          const { status, color, icon } = categorize(trx.date);

          const isFirst = idx === 0;
          const isLast = idx === transactions.length - 1;

          const paddingClass = isFirst ? "pb-5" : isLast ? "pt-5" : "py-5";

          return (
            <li
              key={trx.id}
              className={`${paddingClass} flex flex-col sm:flex-row justify-between sm:items-center gap-2 ${
                idx > 0 ? "border-t border-gray-200" : ""
              }`}
            >
              <div className="flex flex-col items-start sm:flex-row justify-between sm:items-center w-[60%] grow">
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
              </div>

              <div className="flex items-end justify-between sm:w-[35%] sm:items-center grow">
                <span className="flex items-center gap-2">
                  <p className={`${color} text-xs`}>
                    {new Date(trx.date).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                  {icon && (
                    <Image
                      alt="status icon"
                      src={icon}
                      width={15}
                      height={15}
                    />
                  )}
                </span>
                <p
                  className={`${
                    status == "Paid" || status == "Upcoming"
                      ? "text-gray-900"
                      : "text-red-600"
                  } text-sm font-bold`}
                >
                  {formatAmount(Math.abs(trx.amount))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
``;
