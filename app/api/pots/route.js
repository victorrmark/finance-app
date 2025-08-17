import { NextResponse } from "next/server";
import data from "../../../_db/db.json";

export async function GET() {
  return NextResponse.json(data.pots, {
    status: 200,
  });
}