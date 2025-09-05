"use client";
import { useFinanceData } from "../context/DataContext";
import { formatAmount } from "@/utils/formatCash";
import EditAndDeleteEllipsis from "./EditAndDeleteEllipsis";
import WithdrawAndAddBtn from "./WithdrawAndAddBtn";

export default function Pots() {
  const { pots } = useFinanceData();

  function clipToTwoDecimals(num) {
    return (Math.floor(num * 100) / 100).toFixed(2);
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {pots.map((pot, idx) => {
        const width =
          (pot.total / pot.target) * 100 > 100
            ? 100
            : (pot.total / pot.target) * 100;

        return (
          <div
            key={idx}
            className="bg-white rounded-lg px-5 py-6 sm:p-6 flex flex-col gap-8"
          >
            <div className="flex items-center gap-2.5 mb-5 justify-between relative ">
              <div className="flex items-center gap-2.5 ">
                <div
                  className="w-3 h-3 rounded-full "
                  style={{ backgroundColor: pot.theme }}
                ></div>

                <h2 className="leading-none">{pot.name}</h2>
              </div>

              <EditAndDeleteEllipsis pot={pot} />
            </div>

            <div className="flex flex-col gap-3">
              <span className="w-full flex justify-between items-center">
                <p className="preset-4">Total Saved</p>
                <h1>{formatAmount(pot.total)}</h1>
              </span>

              <div
                className="w-full bg-beige-100 rounded h-2 "
                aria-label="target met progress bar"
              >
                <div
                  className="h-full rounded transition-all duration-500 ease-in-out"
                  style={{
                    backgroundColor: pot.theme,
                    width: `${width}%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-grey-500">{clipToTwoDecimals(width)}%</p>
                <p className="preset-5">Target of {formatAmount(pot.target)}</p>
              </div>
            </div>

            <WithdrawAndAddBtn pot={pot} />
          </div>
        );
      })}
    </div>
  );
}
