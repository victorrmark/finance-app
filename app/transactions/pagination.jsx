"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";

export default function Pagination({ props }) {
  const { totalPages, page, limit } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setPage(newPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    params.set("limit", limit);
    router.push(`${pathname}?${params.toString()}`);
  }

  const range = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center mt-6 gap-4">
      <button
        onClick={() => {
          if (page > 1) setPage(Number(page) - 1);
        }}
        className="btn border-beige-500 group"
      >
        <Image
          alt="maximize menu icon"
          src="/images/caret-left.svg"
          width={10}
          height={10}
        />
        <p className="btn-text group-hover:text-white">Prev</p>
      </button>

      <div>
        <div className="flex justify-center items-center gap-4 ">
          {range.map((pageNumber, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === range.length - 1;
            const isActive = Number(page) === pageNumber;

            const paddingClass =
              isFirst || isLast || isActive
                ? "inline-block"
                : "hidden sm:inline-block";

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(Number(pageNumber))}
                className={`${paddingClass} ${
                  pageNumber === Number(page)
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900 border border-beige-500"
                } px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-400 hover:text-white`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          if (page < totalPages) setPage(Number(page) + 1);
        }}
        className="btn border-beige-500 group"
      >
        <Image
          alt="maximize menu icon"
          src="/images/caret-right.svg"
          width={10}
          height={10}
        />
        <p className="btn-text group-hover:text-white">Next</p>
      </button>
    </div>
  );
}
