import Transactions from "./transactions.jsx";
import { getBaseUrl } from "@/utils/baseURL.js";
import Pagination from "./pagination.jsx";

async function fetchTransactions(page = 1, limit = 10) {
  const response = await fetch(
    `${getBaseUrl()}/api/transactions?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const { transactions, totalPages } = await response.json();
  return { transactions, totalPages };
}

export default async function TransactionsPage({ searchParams }) {
  const params = await searchParams;

  const page = params.page ?? "1";
  const limit = params.limit ?? "10";
  const { transactions, totalPages } = await fetchTransactions(page, limit);

  return (
    <>
      <h1>Transactions</h1>

      <div className="mt-8 flex flex-col gap-6 py-6 px-5 sm:p-8 bg-white rounded-xl">
        <Transactions transactions={transactions} />
        <Pagination props={{ page, limit, totalPages }} />
      </div>
    </>
  );
}
