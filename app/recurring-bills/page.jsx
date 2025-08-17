import Recurring from "./recurringBills.jsx";
import Summary from "./billSummary.jsx";

export default async function RecurringBills() {
  return (
    <>
      <h1>Recurring Bills</h1>

      <div className="mt-8 flex flex-col lg:flex-row gap-3.5">
        <div className="grow">
          <Summary />
        </div>
        <div className="grow">
          <Recurring />
        </div>
      </div>
    </>
  );
}
