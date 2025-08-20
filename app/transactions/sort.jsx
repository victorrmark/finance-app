"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
// import { FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";

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

  const [isOpen, setIsOpen] = useState(false); // for icon toggle on small screens
  const [isSelectOpen, setIsSelectOpen] = useState(false); // for large screen arrow toggle

  const handleSort = (sort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (sort === "latest") {
      params.delete("sortBy");
    } else {
      params.set("sortBy", sort);
    }
    replace(`${pathname}?${params.toString()}`);
    setIsOpen(false); // close on small screens after selection
  };

  return (
    <div className="relative">
      {/* Small screens: Icon button */}
      <div className="sm:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 rounded-md bg-neutral-400"
        >
          <Image alt="filter Transactions" src="/images/filter-icon.svg" width={20} height={20} />
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-40 bg-white rounded-md shadow-md z-10">
            <ul className="py-1">
              <li
                onClick={() => handleSort("latest")}
                className="px-3 py-2 hover:bg-neutral-200 cursor-pointer"
              >
                Latest
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleSort(category.value)}
                  className="px-3 py-2 hover:bg-neutral-200 cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Large screens: Styled select */}
      <form className="hidden sm:block w-[200px] bg-neutral-400 px-2 py-1 rounded-md relative">
        <label htmlFor="sortBy" className="sr-only">
          Sort
        </label>
        <div className="relative">
          <select
            id="sortBy"
            className="appearance-none bg-neutral-400 w-full pr-8"
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
      </form>
    </div>
  );
}
