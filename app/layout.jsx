import { Public_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "./Components/sidebar";
import { FinanceProvider } from "./context/DataContext";
import { getBaseUrl } from "@/utils/baseURL";

export const dynamic = "force-dynamic";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Finance App",
    template: "%s | Finance App",
  },
  description: "Finance app for monitoring expenses and income",
};

async function fetchBalance() {
  const url = `${getBaseUrl()}/api/balance`;
  console.log("Fetching balance from:", url); // debug
  const res = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch balance");
  return res.json();
}

async function fetchTransactions() {
  const res = await fetch(`${getBaseUrl()}/api/transactions`, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  const { transactions, recurringTrx } = await res.json();
  return { transactions, recurringTrx };
}

async function fetchBudgets() {
  const res = await fetch(`${getBaseUrl()}/api/budgets`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch budgets");
  return res.json();
}

async function fetchPots() {
  const res = await fetch(`${getBaseUrl()}/api/pots`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch pots");
  return res.json();
}

export default async function RootLayout({ children }) {
  const [balance, transactionsResult, budgets, pots] = await Promise.all([
    fetchBalance(),
    fetchTransactions(),
    fetchBudgets(),
    fetchPots(),
  ]);

  const { transactions, recurringTrx } = transactionsResult;

  return (
    <html lang="en">
      <body className={`${publicSans.variable} antialiased`}>
        <FinanceProvider
          balance={balance}
          transactions={transactions}
          recurringTrx={recurringTrx}
          budgets={budgets}
          pots={pots}
        >
          <div className="relative lg:flex w-full h-screen overflow-y-auto lg:h-screen bg-beige-100">
            <Sidebar />
            <div className="flex-1 lg:overflow-y-auto py-6 px-4 pb-20 sm:py-8 sm:px-10 sm:pb-20 lg:h-auto lg:pb-8">
              {children}
            </div>
          </div>
        </FinanceProvider>
      </body>
    </html>
  );
}
