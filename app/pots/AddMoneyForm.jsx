import { getBaseUrl } from "@/utils/baseURL.js";
import { formatAmount } from "@/utils/formatCash";
import { useState } from "react";

export default function AddMoneyForm({ pot, setAddMoneyOpen, setToast }) {
  const [addAmount, setAddAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const total = pot.total;
  const target = pot.target;

  const handleChange = (e) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setAddAmount("");
      return;
    }
    const value = Number(rawValue);
    setAddAmount(value)

  };

  const newAmount = pot.total + Number(addAmount);
  const oldPercent =
    (total / target) * 100 > 100 ? 100 : (total / target) * 100;
  const addedPercent = (addAmount / target) * 100;

  const handleDeposit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${getBaseUrl()}/api/pots`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: pot.id,
          amount: addAmount,
          action: "add",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setToast({
          type: "error",
          message: errorData.message || "Something went wrong",
        });

        setTimeout(() => {
          setToast(null);
        }, 3000);

        return;
      }

      await res.json();
      setToast({ type: "success", message: "Deposit successful ✅" });
      setAddMoneyOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setToast({ type: "error", message: "Network or server error" });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  function clipToTwoDecimals(num) {
    return (Math.floor(num * 100) / 100).toFixed(2);
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="w-full flex justify-between items-center">
        <p>New Amount</p>
        <h1>{formatAmount(newAmount)}</h1>
      </span>

      <div
        className="w-full bg-beige-100 rounded h-2 flex overflow-hidden"
        aria-label="added amount bar"
      >
        <div
          className={`h-full transition-all duration-500 ease-in-out bg-gray-900 ${
            addedPercent > 0
              ? "border-r-white border-r-2 rounded-l"
              : "rounded"
          }`}
          style={{
            width: `${oldPercent}%`,
          }}
        ></div>
        <div
          className="h-full rounded-r transition-all duration-500 ease-in-out"
          style={{
            width: `${addedPercent}%`,
            backgroundColor: "#277C78",
          }}
        ></div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-[#277C78]">
          {clipToTwoDecimals(oldPercent + addedPercent > 100 ? 100 : oldPercent + addedPercent)}%
        </p>
        <p className="preset-5">Target of {formatAmount(pot.target)}</p>
      </div>

      <div className="relative w-full ">
        <p className="text-xs font-bold text-grey-500 mb-1">
          Amount to Add
        </p>
        <span className="absolute left-3 top-[40px] -translate-y-1/2 text-gray-500">
          $
        </span>
        <input
          type="number"
          value={addAmount}
          placeholder="e.g. 2000"
          onChange={handleChange}
          className="w-full pl-7 p-2 border border-beige-500 rounded-md focus:border-gray-900"
        />
      </div>

      <button
        onClick={handleDeposit}
        className="text-sm text-white font-bold w-full bg-gray-900 p-4 rounded-lg mt-6"
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Addition"}
      </button>

    </div>
  );
}
