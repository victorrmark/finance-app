"use client";
import { useFinanceData } from "../context/DataContext";
import { formatAmount } from "@/utils/formatCash";
import { useState } from "react";
import Image from "next/image";
import EditAndDelete from "./EditAndDelete";

export default function Budgets() {
  const { budgets, transactions } = useFinanceData();
  const [expandedIdx, setExpandedIdx] = useState(null);

  const getBudgetBalance = (budget) => {
    const spent = transactions.reduce(
      (acc, trx) =>
        trx.category === budget.category ? acc + Math.abs(trx.amount) : acc,
      0
    );

    const balance = Math.max(0, budget.maximum - spent);

    return { spent, balance };
  };

  return (
    <div className="w-full lg:w-[60%] flex flex-col gap-3">
      {budgets.map((budget, idx) => {
        const { spent, balance } = getBudgetBalance(budget);
        const width =
          (spent / budget.maximum) * 100 > 100
            ? 100
            : (spent / budget.maximum) * 100;

        const filtered = transactions.filter(
          (trx) => trx.category === budget.category
        );
        const showAll = expandedIdx === idx;
        const visible = showAll ? filtered : filtered.slice(0, 3);

        return (
          <div key={idx} className="p-8 bg-white rounded-lg">
            <div className="flex items-center gap-2.5 mb-5 justify-between relative ">
              <div className="flex items-center gap-2.5 ">
                <div
                  className="w-3 h-3 rounded-full "
                  style={{ backgroundColor: budget.theme }}
                ></div>

                <h2 className="leading-none">{budget.category}</h2>
              </div>

              <EditAndDelete budget={budget} />
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <p className="text-sm text-gray-500">
                Maximum of {formatAmount(budget.maximum)}
              </p>

              <div className="w-full bg-beige-100 rounded h-8 p-1">
                <div
                  className="h-6 rounded transition-all duration-500 ease-in-out"
                  style={{
                    backgroundColor: budget.theme,
                    width: `${width}%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div
                  style={{ "--after-bg": budget.theme }}
                  className="budgetBox after:bg-[var(--after-bg)] "
                >
                  <p className="preset-5 mb-1">Spent</p>
                  <p className="preset-4-bold">{formatAmount(spent)}</p>
                </div>

                <div className="budgetBox after:bg-beige-100">
                  <p className="preset-5 mb-1">Remaining</p>
                  <p className="preset-4-bold">{formatAmount(balance)}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-beige-100 rounded-xl p-5 gap-5">
              <span className="flex items-center justify-between">
                <p className="preset-3">Latest Spending</p>
                <button
                  onClick={() =>
                    setExpandedIdx(expandedIdx === idx ? null : idx)
                  }
                  className="flex gap-2 items-center"
                >
                  <p className="preset-4">
                    {expandedIdx === idx ? "See Less" : "See All"}
                  </p>
                  <Image
                    width={5}
                    height={5}
                    alt="show more icon"
                    src="/images/caret-right.svg"
                    className={`transition-transform duration-300 ${
                      showAll ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </span>
              <ul>
                {visible.map((transaction, tIdx) => {
                  const isFirst = tIdx === 0;
                  const isLast = tIdx === transactions.length - 1;

                  const paddingClass = isFirst
                    ? "pb-3"
                    : isLast
                    ? "pt-3"
                    : "py-3";

                  return (
                    <li
                      key={tIdx}
                      className={`flex justify-between items-center ${paddingClass} ${
                        tIdx > 0 ? "border-t border-gray-200" : ""
                      }`}
                    >
                      <p>{transaction.name}</p>
                      <p>{transaction.amount}</p>
                      {/* <p>{new Date(transaction.date)}</p> */}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}

      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}

    </div>
  );
}
