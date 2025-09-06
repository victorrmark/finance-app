import Recurring from "./recurring";
import Balance from "./balance";
import Pots from "./pots";
import Transactions from "./transactions";
import Budgets from "./budgets";

export const metadata = {
  title: "Dashboard",
  description: "Get a complete overview of your finances, including balances, spending, and income trends in one place.",
};

export default function OverView() {
  return (
    <>
      <h1>Overview</h1>
      <Balance />
      <main className="grid lg:grid-cols-2 lg:auto-rows-auto gap-5 lg:gap-3.5">
        <div className="lg:row-span-1 lg:col-start-1 lg:row-start-1">
          <Pots />
        </div>

        <div className="lg:row-span-2 lg:col-start-1 lg:row-start-2">
          <Transactions />
        </div>

        <div className="lg:row-span-2 lg:col-start-2 lg:row-start-1">
          <Budgets />
        </div>

        <div className="lg:row-span-1 lg:col-start-2 lg:row-start-3">
          <Recurring />
        </div>
      </main>
    </>
  );
}
