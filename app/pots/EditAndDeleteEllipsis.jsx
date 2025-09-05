import { useState, useRef, useEffect } from "react";
import Modal from "../Components/Modal";
import Image from "next/image";
import EditPotForm from "./EditPotForm";
import { getBaseUrl } from "@/utils/baseURL";

export default function EditAndDeleteEllipsis({ pot }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${getBaseUrl()}/api/pots`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: pot.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({
          type: "error",
          message: data.message || "Failed to delete",
        });
        setTimeout(() => setToast(null), 3000);
        return;
      }

      setIsDeleteModalOpen(false);
      setToast({ type: "success", message: data.message });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setToast({ type: "error", message: "Network or server error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div
        ref={menuRef}
        className="relative flex items-center justify-center leading-none"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center leadinig-none"
        >
          <p className="text-gray-300 text-xl font-extrabold leading-none">...</p>
        </button>
        {isOpen && (
          <div className="absolute right-0 top-9 bg-white rounded-lg shadow-around py-3 px-5 flex flex-col z-10">
            <button
              className="px-3 pt-3 pb-4 w-full text-left whitespace-nowrap flex-shrink-0 "
              onClick={() => {
                setIsEditModalOpen(true);
                setIsOpen(false);
              }}
            >
              Edit Pot
            </button>
            <button
              className="px-3 pb-3 pt-4 border-t border-gray-100 text-red-500 text-left whitespace-nowrap flex-shrink-0"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setIsOpen(false);
              }}
            >
              Delete Pot
            </button>
          </div>
        )}

        <Modal
          isOpen={isEditModalOpen}
          handleClose={() => setIsEditModalOpen(false)}
        >
          <div className="flex items-center justify-between w-full mb-5">
            <p className="leading-none text-xl font-bold sm:text-[2rem]">
              Edit Pot
            </p>
            <button onClick={() => setIsEditModalOpen(false)}>
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
            If your savings target change, feel free to update your pots.
          </p>
          <EditPotForm
            pot={pot}
            setIsEditModalOpen={setIsEditModalOpen}
            setToast={setToast}
          />
        </Modal>

        <Modal isOpen={isDeleteModalOpen}  handleClose={() => setIsDeleteModalOpen(false)}>
          <div className="flex items-center justify-between w-full mb-5">
            <p className="leading-none text-xl font-bold sm:text-[2rem] ">
              Delete '{pot.name}'?
            </p>
            <button onClick={() => setIsDeleteModalOpen(false)}>
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
            Are you sure you want to delete this pot? This action cannot be
            reversed, and all data inside it will be removed for ever
          </p>
          <button
            className="text-sm font-bold text-white bg-red-600 w-full p-4 rounded-lg mb-5"
            onClick={handleDelete}
          >
            Yes, Confirm Deletion
          </button>
          <button
            className="preset-4"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            No, Go Back
          </button>
        </Modal>
      </div>

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
