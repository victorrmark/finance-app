"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter({categories}) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();


  const handleFilterByCategory = (category) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (category === "all") {
        params.delete('filterBy');
    } else {
        params.set('filterBy', category);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <form className="w-[10%] bg-neutral-400 px-2 py-1 rounded-md">
        <label htmlFor="filterBy" className="sr-only">
          Category
        </label>
        <select
          className="bg-neutral-400 w-full"
          onChange={(e) => handleFilterByCategory(e.target.value)}
          defaultValue={searchParams.get('filterBy')?.toString() || "all"}
        >
          <option value="all">All Transactions</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}