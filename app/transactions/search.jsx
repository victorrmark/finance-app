"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";

export default function Search() {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex flex-1 sm:flex-initial">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-lg border border-beige-500 py-[14px] pl-5 pr-12 text-sm placeholder:preset-4 truncate"
        placeholder="Search transaction"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query") || ""}
      />

      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
        <Image
          src="/images/search-icon.svg"
          alt="Search"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}
