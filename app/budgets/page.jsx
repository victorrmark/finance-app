import BudgetChart from "./budgetChart";
import BudgetHeader from "./BudgetHeader";
import Budget from "./budgets"

export const metadata = {
  title: "Budgets",
  description: "Set monthly budgets, monitor spending, and make sure you stay on track with your financial goals.",
};

export default function page() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <BudgetHeader />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-2.5 justify-between items-start">
        <BudgetChart />
        <Budget />
      </div>
    </>
  );
}
