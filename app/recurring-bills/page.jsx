import Recurring from "./recurringBills.jsx";
import Summary from "./billSummary.jsx";
import SearchRecurring from "./searchRecurring.jsx";
import { getBaseUrl } from "@/utils/baseURL.js";
import SortRecurring from "./sortRecurring.jsx";

export const metadata = {
  title: "Recurring Bills",
  description: "Stay on top of subscriptions and regular payments with reminders for upcoming bills.",
};


async function fetchTransactions(
  query = "",
  sortBy = "latest"
) {
  const response = await fetch(
    `${getBaseUrl()}/api/transactions?query=${query}&sortBy=${sortBy}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const { recurringTrx } = await response.json();
  return { recurringTrx };
}

export default async function RecurringBills({ searchParams }) {
  const params = await searchParams;

  const { recurringTrx } = await fetchTransactions(
    params.query || "",
    params.sortBy || "latest"
  );

  return (
    <>
      <h1>Recurring Bills</h1>

      <div className="mt-8 flex flex-col lg:flex-row gap-3.5">
        <div className="grow">
          <Summary transactions={recurringTrx} />
        </div>
        <div className="grow flex flex-col gap-6 py-6 px-5 sm:p-8 bg-white rounded-xl">
          <div className="flex gap-6 items-center sm:justify-between ">
            <SearchRecurring />
            <SortRecurring />
          </div>
          
          <Recurring transactions={recurringTrx} />
        </div>
      </div>
    </>
  );
}
