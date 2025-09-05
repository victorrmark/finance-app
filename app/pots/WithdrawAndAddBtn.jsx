import Modal from "../Components/Modal";
import { useState } from "react";
import Image from "next/image";
import WithdrawForm from "./WithdrawForm";
import AddMoneyForm from "./AddMoneyForm";

export default function WithdrawAndAddBtn({ pot }) {
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [withdrawMoneyOpen, setWithdrawMoneyOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <>
      <div className="flex gap-3">
        <button className="pot-btn" onClick={() => setAddMoneyOpen(true)}>
          +Add Money
        </button>
        
        <button
          className="pot-btn"
          onClick={() => setWithdrawMoneyOpen(true)}
        >
          Withdraw
        </button>
      </div>

      <Modal
        isOpen={addMoneyOpen}
        handleClose={() => setAddMoneyOpen(false)}
      >
        <div className="flex items-center justify-between w-full mb-5">
          <p className="leading-none text-xl font-bold sm:text-[2rem]">
            Add to '{pot.name}'
          </p>
          <button onClick={() => setAddMoneyOpen(false)}>
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
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
        </p>

        <AddMoneyForm pot={pot} setAddMoneyOpen={setAddMoneyOpen} setToast={setToast} />
      </Modal>

      <Modal
        isOpen={withdrawMoneyOpen}
        handleClose={() => setWithdrawMoneyOpen(false)}
      >
        <div className="flex items-center justify-between w-full mb-5">
          <p className="leading-none text-xl font-bold sm:text-[2rem]">
            Withdraw from '{pot.name}'
          </p>
          <button onClick={() => setWithdrawMoneyOpen(false)}>
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
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
        </p>

        <WithdrawForm pot={pot} setWithdrawMoneyOpen={setWithdrawMoneyOpen} setToast={setToast} />
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
