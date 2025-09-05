import { getBaseUrl } from "@/utils/baseURL.js";
import { formatAmount } from "@/utils/formatCash";
import { useState } from "react";

export default function WithdrawForm({ pot, setWithdrawMoneyOpen, setToast }) {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = pot.total;
  const target = pot.target;

  const handleChange = (e) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setWithdrawAmount("");
      setError("");
      return;
    }
    const value = Number(rawValue);

    if (value > total) {
      setError("Amount cannot exceed available total. Amount to withdraw capped.");
      setWithdrawAmount(total); // cap it at total
    } else {
      setError("");
      setWithdrawAmount(value);
    }
  };

  const remaining = withdrawAmount ? total - withdrawAmount : total - 0;
  const totalPercent =
    (pot.total / pot.target) * 100 > 100 ? 100 : (pot.total / pot.target) * 100;
  const withdrawnPercent = (remaining / target) * 100;
  const remainingPercent = totalPercent - withdrawnPercent;

  const handleWithdraw = async () => {
    setLoading(true);
    setError("");
    // setToast(null);
    try {
      const res = await fetch(`${getBaseUrl()}/api/pots`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: pot.id,
          amount: withdrawAmount,
          action: "withdraw",
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
      setToast({ type: "success", message: "Withdrawal successful ✅" });
      setWithdrawMoneyOpen(false);

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
        <h1>{formatAmount(remaining)}</h1>
      </span>

      <div
        className="w-full bg-beige-100 rounded h-2 flex"
        aria-label="target met progress bar"
      >
        <div
          className={`h-full transition-all duration-500 ease-in-out bg-gray-900 ${
            remainingPercent > 0
              ? "border-r-white border-r-2 rounded-l"
              : "rounded"
          }`}
          style={{
            width: `${withdrawnPercent}%`,
          }}
        ></div>
        <div
          className="h-full rounded-r transition-all duration-500 ease-in-out bg-red-500"
          style={{
            width: `${remainingPercent}%`,
          }}
        ></div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-red-500">
          {clipToTwoDecimals(withdrawnPercent)}%
        </p>
        <p className="preset-5">Target of {formatAmount(pot.target)}</p>
      </div>

      <div className="relative w-full ">
        <p className="text-xs font-bold text-grey-500 mb-1">
          Amount to Withdraw
        </p>
        <span className="absolute left-3 top-[40px] -translate-y-1/2 text-gray-500">
          $
        </span>
        <input
          type="number"
          value={withdrawAmount}
          placeholder="e.g. 2000"
          onChange={handleChange}
          className="w-full pl-7 p-2 border border-beige-500 rounded-md focus:border-gray-900"
        />
      </div>

      <button
        onClick={handleWithdraw}
        className="text-sm text-white font-bold w-full bg-gray-900 p-4 rounded-lg mt-6"
        disabled={withdrawAmount <= 0 || withdrawAmount > total || loading}
      >
        {loading ? "Processing..." : "Confirm Withdrawal"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
