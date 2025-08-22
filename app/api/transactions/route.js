import { NextResponse } from "next/server";
import data from "../../../_db/db.json";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("query");
  const filterBy = searchParams.get("filterBy") || "all";
  const sortBy = searchParams.get("sortBy") || "latest";

  
  let filteredTransactions = data.transactions;
  const categories = [
    ...new Set(data.transactions.map((transaction) => transaction.category)),
  ];

  switch (sortBy) {
    case "highest":
      filteredTransactions.sort((a, b) => b.amount - a.amount);
      break;
    case "lowest":
      filteredTransactions.sort((a, b) => a.amount - b.amount);
      break;
    // case "latest":
    //   filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    //   break;
    case "oldest":
      filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "ascending":
      filteredTransactions.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "descending":
      filteredTransactions.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      filteredTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
  }

  if (query) {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filterBy && filterBy !== "all") {
    filteredTransactions = filteredTransactions.filter((transaction) =>
      transaction.category === filterBy
    );
  }

  const recurringTrx = [
    ...new Map(
      filteredTransactions
        .filter((transaction) => transaction.recurring)
        .map((trx) => [trx.name, trx])
    ).values(),
  ];

  return NextResponse.json(
    { transactions: filteredTransactions, recurringTrx, categories },
    {
      status: 200,
    }
  );
}
