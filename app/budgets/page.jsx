import BudgetChart from "./budgetChart";
import BudgetHeader from "./BudgetHeader";
import Budget from "./budgets"

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
