import { NextResponse } from "next/server";
import data from "../../../_db/db.json";

export async function GET(request) {
  const transactions = data.transactions;
  const recurringTrx = [
    ...new Map(
      data.transactions
        .filter((transaction) => transaction.recurring)
        .map((trx) => [trx.name, trx])
    ).values(),
  ];

  return NextResponse.json(
    { transactions, recurringTrx },
    {
      status: 200,
    }
  );
}
