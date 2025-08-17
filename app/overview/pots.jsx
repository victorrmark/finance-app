"use client";
import Link from "next/link";
import { useFinanceData } from "../context/DataContext";
import Image from "next/image";
import { formatAmount } from "@/utils/formatCash";

export default function Pots() {
  const { pots } = useFinanceData();
  const total = [];
  pots.map((item) => total.push(item.total));
  const amount = total.reduce((acc, curr) => acc + curr, 0);


  return (
    <div className="px-5 py-6 sm:p-8 rounded-xl bg-white">
      <div className="flex items-center justify-between w-full mb-5">
        <h2>Pots</h2>
        <Link href="/pots">
          <span className="flex gap-3 items-center">
            <p className="preset-4">See Details</p>
            <Image
              width={5}
              height={5}
              alt="show more icon"
              src="/images/caret-right.svg"
            />
          </span>
        </Link>
      </div>
      
      <div className="flex flex-col gap-x-5 sm:flex-row sm:justify-between flex-wrap">
        <div className="flex items-center gap-4 mb-4 p-4 rounded-xl bg-beige-100 h-full grow">
          <Image
            alt="Pots Icon"
            src="/images/icon-pot.svg"
            height={25}
            width={25}
          />
          <span>
            <p className="preset-4">Total Saved</p>
            <h1>{formatAmount(amount)}</h1>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 grow">
          {pots.slice(0, 4).map((pot, idx) => (
            <span key={idx} style={{ '--after-bg': pot.theme }} className="relative w-full h-auto after:absolute after:inset-0 after:left-0 after:top-0 after:w-1 after:h-full after:rounded-lg pl-3 after:bg-[var(--after-bg)]">
              <p className="preset-5">{pot.name}</p>
              <p className="preset-4-bold">{formatAmount(pot.total)}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
