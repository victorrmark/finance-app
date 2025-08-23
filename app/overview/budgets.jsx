"use client";
import Link from "next/link";
import { useFinanceData } from "../context/DataContext";
import Donut from "../Components/donut";
import Image from "next/image";
import { formatAmount } from "@/utils/formatCash";

export default function Budgets() {
  const { budgets, transactions } = useFinanceData();
  const budgetCategories = budgets.map((budget) => budget.category);
  const totalBudget = budgets.reduce((acc, budget) => acc + budget.maximum, 0);
  const budgetedTransactions = budgetCategories.map((category) =>
    transactions.filter((transaction) => transaction.category === category)
  );
  const totalSpent = budgetedTransactions.reduce((acc, transactions) => {
    return (
      acc +
      transactions.reduce(
        (sum, transaction) => sum + Math.abs(transaction.amount),
        0
      )
    );
  }, 0);
  // console.log(totalSpent) //892.24;
  // const budgetTransactions = transactions.filter(transaction => transaction.type === "budget");
  // const totalBudgeted = budgets.reduce((acc, budget) => acc + budget.maximum, 0);
  // const totalSpent = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="flex flex-col gap-8 px-5 py-6 sm:p-8 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <h2>Budgets</h2>
        <Link href="/budgets">
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
      </div>

      <div className="flex flex-col gap-x-5 sm:flex-row sm:justify-between gap-y-5 flex-wrap">
        <div className="flex justify-center grow">
          <Donut budgetData={{ totalBudget, totalSpent, budgets }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 grow  sm:grow-0">
          {budgets.map((item, idx) => (
            <span
              key={idx}
              style={{ "--after-bg": item.theme }}
              className="relative w-full h-auto after:absolute after:inset-0 after:left-0 after:top-0 after:w-1 after:h-full after:rounded-lg pl-3 after:bg-[var(--after-bg)]"
            >
              <p className="preset-5">{item.category}</p>
              <p className="preset-4-bold">{formatAmount(item.maximum)}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
