"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function SortBy() {
  const categories = [
    { name: "Oldest", value: "oldest" },
    { name: "A to Z", value: "ascending" },
    { name: "Z to A", value: "descending" },
    { name: "Highest", value: "highest" },
    { name: "Lowest", value: "lowest" },
  ];

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const currentValue = searchParams.get("sortBy") || "latest";
  const currentLabel =
    currentValue === "latest"
      ? "Latest"
      : categories.find((c) => c.value === currentValue)?.name;

  const handleSort = (sort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (sort === "latest") {
      params.delete("sortBy");
    } else {
      params.set("sortBy", sort);
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
      <p className="preset-4 hidden sm:inline-block">Sort by</p>
      <div ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 rounded-md sm:px-5 sm:py-3 sm:rounded-lg sm:border sm:border-beige-500 sm:flex gap-3 items-center focus:border-gray-900 "
        >
          <Image
            alt="Sort Transactions"
            src="/images/sort-icon.svg"
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
          <div className="absolute mt-5 w-32 bg-white rounded-md shadow-md z-10 px-3 right-0">
            <ul className="py-1">
              <li className="py-3 text-sm text-gray-400 sm:hidden">Sort By</li>
              <li
                onClick={() => handleSort("latest")}
                className={`py-3 hover:bg-neutral-200 cursor-pointer border-t border-gray-200 sm:border-none text-gray-900 text-sm ${
                  !searchParams.get("sortBy") ? "font-bold" : ""
                }`}
              >
                Latest
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleSort(category.value)}
                  className={`py-3 hover:bg-neutral-200 cursor-pointer border-t border-gray-200 text-gray-900 text-sm ${
                    searchParams.get("sortBy") === category.value
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* <form className="hidden relative sm:flex gap-2 items-center">
        <label htmlFor="sortBy" className="preset-4">
          Sort by
        </label>
        <div className="relative">
          <select
            id="sortBy"
            className="appearance-none  "
            onChange={(e) => handleSort(e.target.value)}
            defaultValue={searchParams.get("sortBy")?.toString() || "latest"}
            onClick={() => setIsSelectOpen((prev) => !prev)}
            onBlur={() => setIsSelectOpen(false)}
          >
            <option value="latest">Latest</option>
            {categories.map((category, index) => (
              <option key={index} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <Image alt="chevron" src="/images/chevron-icon.svg" width={20} height={20} className={`isSelectOpen ? 'rotate-180 outline' : ''`} />
          </span>
        </div>
      </form> */}
    </div>
  );
}
