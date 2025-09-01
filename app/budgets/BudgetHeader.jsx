"use client";
import { useState, useRef, useEffect } from "react";
import { getBaseUrl } from "@/utils/baseURL";
import Modal from "./Modal";
import Image from "next/image";
import AddBudgetForm from "./AddBudgetForm";

export default function BudgetHeader() {
  const [toast, setToast] = useState(null);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);

  return (
    <>
      <h1>Budgets</h1>
      <button
        className="text-white text-sm font-bold bg-gray-900 rounded-lg p-4 hover:bg-gray-500 transition-colors duration-500"
        onClick={() => setIsAddBudgetOpen(true)}
      >
        +Add New Budget
      </button>

      <Modal isOpen={isAddBudgetOpen}>
        <div className="flex items-center justify-between w-full mb-5">
          <p className="leading-none text-xl font-bold sm:text-[2rem]">
            Add New Budget
          </p>
          <button onClick={() => setIsAddBudgetOpen(false)}>
            {" "}
            <Image
              width={20}
              height={20}
              alt="close modal"
              src="/images/close-modal.svg"
            />
          </button>
        </div>
        <p className="leading-none preset-4 mb-5">
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </p>
        <AddBudgetForm
          //   budget={budget}
          setIsAddBudgetOpen={setIsAddBudgetOpen}
          setToast={setToast}
        />
      </Modal>

      {toast && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-2 rounded-md shadow-md text-white transition-opacity ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
