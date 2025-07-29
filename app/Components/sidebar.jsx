"use client";
import { useState } from "react";
import Image from "next/image";
import SideItems from "./sideItems";

const navItems = [
  { name: "Overview", icon: "/navicons/overview.svg", href: "/overview" },
  { name: "Transactions", icon: "/navicons/transactions.svg", href: "/transactions"},
  { name: "Budgets", icon: "/navicons/budgets.svg", href: "/budgets" },
  { name: "Pots", icon: "/navicons/pots.svg", href: "/pots" },
  { name: "Recurring bills", icon: "/navicons/recurring-bills.svg", href: "/recurring-bills"},
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`
       fixed bottom-0 left-0 bg-black w-full h-auto flex justify-center items-end 
      lg:relative lg:flex lg:justify-between lg:flex-col ${collapsed ? "lg:w-20" : "lg:w-72"} transition-all duration-700`}
    >
      <div className="
        flex justify-evenly w-full items-center mt-2 
        lg:mt-0 lg:flex-col lg:items-stretch" 
      >
        <div className={`hidden lg:inline-block lg:px-8 py-10 ${collapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-500 ease-in-out`}>
          <Image alt="logo" src="/images/logo.svg" width={100} height={100}/>
        </div>
        {navItems.map((items, index) => (
          <SideItems
            key={index}
            name={items.name}
            icon={items.icon}
            href={items.href}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className="hidden pb-6 px-8 w-full text-gray-300 lg:block ">
        <button onClick={() => setCollapsed(!collapsed)} className="flex justify-center gap-5">
          <Image
            alt="maximize menu icon"
            src="/images/minimize-menu.svg"
            width={20}
            height={20}
            className={`transition-transform duration-700 ${collapsed ? "rotate-180" : ""}`}
          />
          <p className={`transition-opacity duration-700 ease-in-out ${collapsed ? "opacity-0" : "opacity-100"} leading-none m-0 text-preset-3 font-bold`} >Maximize Menu</p>
        </button>
      </div>
    </div>
  );
}
