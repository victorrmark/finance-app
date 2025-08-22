"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Filter({ categories }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const currentValue = searchParams.get("filterBy") || "all";
  const currentLabel =
    currentValue === "all"
      ? "All Transactions"
      : currentValue;

  const handleFilterByCategory = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (category === "all") {
      params.delete("filterBy");
    } else {
      params.set("filterBy", category);
    }
    replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative sm:flex sm:gap-3 items-center">
      <p className="preset-4 hidden sm:inline-block">Category</p>
      <div ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 rounded-md sm:px-5 sm:py-3 sm:rounded-lg sm:border sm:border-beige-500 sm:flex gap-3 items-center focus:border-gray-900 "
        >
          <Image
            alt="filter Transactions"
            src="/images/filter-icon.svg"
            width={20}
            height={20}
            className="sm:hidden "
          />
          <p className="hidden sm:inline-block text-sm text-gray-900">
            {currentLabel}
          </p>
          <span
            className={`hidden sm:block transition-transform duration-700 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <Image
              src="/images/chevron-icon.svg"
              alt="Caret down"
              width={16}
              height={16}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute mt-5 w-44 h-80 overflow-auto bg-white rounded-md shadow-md z-10 px-3 right-0">
            <ul className="py-1">
              <li className="py-3 text-sm text-gray-400 sm:hidden">Category</li>
              <li
                onClick={() => handleFilterByCategory("all")}
                className={`py-3 hover:bg-neutral-200 cursor-pointer border-t sm:border-none border-gray-200 text-gray-900 text-sm ${
                  !searchParams.get("filterBy") ? "font-bold" : ""
                }`}
              >
                All Transactions
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterByCategory(category)}
                  className={`py-3 hover:bg-neutral-200 cursor-pointer border-t border-gray-200 text-gray-900 text-sm ${
                    searchParams.get("filterBy") === category ? "font-bold" : ""
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* <form className="hidden sm:inline-block w-[10%] bg-neutral-400 px-2 py-1 rounded-md">
        <label htmlFor="filterBy">Category</label>
        <select
          id="filterBy"
          className="bg-neutral-400 w-full"
          onChange={(e) => handleFilterByCategory(e.target.value)}
          defaultValue={searchParams.get("filterBy")?.toString() || "all"}
        >
          <option value="all">All Transactions</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form> */}
    </div>
  );
}
