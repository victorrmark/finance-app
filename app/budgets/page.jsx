import BudgetChart from "./budgetChart";

export default function page() {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1>Budgets</h1>
        <button className="text-white text-sm font-bold bg-gray-900 rounded-lg p-4 hover:bg-gray-500 transition-colors duration-500">+Add New Budget</button>
      </div>

      <div>
        <BudgetChart />
      </div>
    </>
  );
}
