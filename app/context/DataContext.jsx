'use client';
import { createContext, useContext } from "react";

const FinanceContext = createContext(undefined);


export function FinanceProvider({ children, balance, transactions, budgets, pots, recurringTrx }) {

  return (
    <FinanceContext.Provider value={{ balance, transactions, budgets, pots, recurringTrx }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinanceData = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinanceData must be used within a FinanceProvider");
  return context;
};
