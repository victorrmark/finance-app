import { NextResponse } from "next/server";
import data from "../../../_db/db.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const transactions = data.transactions.slice(startIndex, endIndex);
  const recurringTrx = data.transactions.filter(
    (transaction) => transaction.recurring
  );

  return NextResponse.json(
    { transactions, page, limit, totalPages: Math.ceil(data.transactions.length / limit), recurringTrx },
    {
      status: 200,
    }
  );

}
