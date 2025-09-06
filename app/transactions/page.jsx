import Transactions from "./transactions.jsx";
import { getBaseUrl } from "@/utils/baseURL.js";
import Pagination from "./pagination.jsx";
import Search from "./search.jsx";
import Filter from "./filter.jsx";
import SortBy from "./sort.jsx";

export const metadata = {
  title: "Transactions",
  description: "Track and review all your income and expenses with detailed transaction history.",
};

async function fetchTransactions(
  query = "",
  filterBy = "all",
  sortBy = "latest"
) {
  const response = await fetch(
    `${getBaseUrl()}/api/transactions?query=${query}&filterBy=${filterBy}&sortBy=${sortBy}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const { transactions, categories } = await response.json();
  return { transactions, categories };
}

export default async function TransactionsPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params.page) ? Number(params.page) : 1;
  const limit = Number(params.limit) ? Number(params.limit) : 10;

  const { transactions, categories } = await fetchTransactions(
    params.query || "",
    params.filterBy || "all",
    params.sortBy || "latest"
  );

  const totalPages = Math.ceil(transactions.length / limit);

  return (
    <>
      <h1>Transactions</h1>

      <div className="mt-8 flex flex-col gap-6 py-6 px-5 sm:p-8 bg-white rounded-xl">
        <div className="flex gap-6 items-center sm:justify-between ">
          <Search />
          <span className="flex gap-4 items-center">
            <SortBy />
            <Filter categories={categories} />
          </span>
        </div>

        <Transactions props={{ transactions, page, limit }} />
        <Pagination props={{ page, limit, totalPages }} />
      </div>
    </>
  );
}
