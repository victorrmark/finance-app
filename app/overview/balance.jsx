"use client";
import { useFinanceData } from "../context/DataContext";
import { formatAmount} from "../../utils/formatCash";

export default function Balance() {
  const { balance } = useFinanceData();

  return (
    <div className="my-8 flex flex-col gap-y-3 sm:flex-row sm:gap-x-6">
      <div className="balance-box bg-grey-900 text-white">
        <p className="text-sm text-white">Current Balance</p>
        <h1 className="text-white leading-none">{formatAmount(balance.current)}</h1>
      </div>
      <div className="balance-box bg-white">
        <p className="preset-4">Income</p>
        <h1 className="leading-none">{formatAmount(balance.income)}</h1>
      </div>
      <div className="balance-box bg-white">
        <p className="preset-4">Expenses</p>
        <h1 className="leading-none">{formatAmount(balance.expenses)}</h1>
      </div>
    </div>
  );
}
