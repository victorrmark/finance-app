"use client";
import { useFinanceData } from "../context/DataContext";
import Donut from "../Components/donut";
import { formatAmount } from "@/utils/formatCash";

export default function BudgetChart() {
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

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-8 px-5 py-6 sm:p-8 rounded-xl bg-white justify-between sm:items-center lg:items-start w-full lg:w-[45%]">
      <div className="grow flex justify-center lg:items-center lg:w-full" >
        <Donut budgetData={{ totalBudget, totalSpent, budgets }} />
      </div>
      <div className="grow lg:w-full">
        <h2>Spending Summary</h2>
        <div className="mt-4 flex flex-col">
          {budgets
            .sort((a, b) => a.category.localeCompare(b.category))
            .map((item, idx) => {
              const totalSpentForCategory = transactions
                .filter((transaction) => transaction.category === item.category)
                .reduce(
                  (sum, transaction) => sum + Math.abs(transaction.amount),
                  0
                );
              return (
                <div
                  key={idx}
                  style={{ "--after-bg": item.theme }}
                  className={`relative w-full h-auto flex justify-between items-center py-3 
                    ${idx > 0 ? "border-t border-gray-200" : ""} 
                  after:absolute after:inset-0 after:left-0 after:top-1/2 after:-translate-y-1/2 
                  after:w-1 after:h-5 after:rounded-lg pl-3 after:bg-[var(--after-bg)] `}
                >
                  <p className="preset-5">{item.category}</p>
                  <p>
                    <span className="preset-4-bold">
                      {formatAmount(totalSpentForCategory)}
                    </span>{" "}
                    of {formatAmount(item.maximum)}{" "}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
