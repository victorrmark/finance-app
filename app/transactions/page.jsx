import Transactions from "./transactions.jsx";
import { getBaseUrl } from "@/utils/baseURL.js";
import Pagination from "./pagination.jsx";

async function fetchTransactions() {
  const response = await fetch(
    `${getBaseUrl()}/api/transactions`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const { transactions } = await response.json();
  return { transactions };
}

export default async function TransactionsPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "10");
  const { transactions } = await fetchTransactions();
  const totalPages = Math.ceil(transactions.length / limit);

  return (
    <>
      <h1>Transactions</h1>

      <div className="mt-8 flex flex-col gap-6 py-6 px-5 sm:p-8 bg-white rounded-xl">
        <Transactions props={{ transactions, page, limit }} />
        <Pagination props={{ page, limit, totalPages }} />
      </div>
    </>
  );
}
