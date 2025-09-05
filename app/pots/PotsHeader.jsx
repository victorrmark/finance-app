"use client";
import { useState } from "react";
import Modal from "../Components/Modal";
import Image from "next/image";
import AddPotsForm from "./AddPotsForm";

export default function BudgetHeader() {
  const [toast, setToast] = useState(null);
  const [isAddPotsOpen, setIsAddPotsOpen] = useState(false);

  return (
    <>
      <h1>Pots</h1>
      <button
        className="text-white text-sm font-bold bg-gray-900 rounded-lg p-4 hover:bg-gray-500 transition-colors duration-500"
        onClick={() => setIsAddPotsOpen(true)}
      >
        +Add New Pot
      </button>

      <Modal isOpen={isAddPotsOpen} handleClose={() => setIsAddPotsOpen(false)}>
        <div className="flex items-center justify-between w-full mb-5">
          <p className="leading-none text-xl font-bold sm:text-[2rem]">
            Add New Pot
          </p>
          <button onClick={() => setIsAddPotsOpen(false)}>
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
          Choose a pot to set a saving targets. These can help you on track as you save for special purchases.
        </p>
        <AddPotsForm
          setIsAddPotsOpen={setIsAddPotsOpen}
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
