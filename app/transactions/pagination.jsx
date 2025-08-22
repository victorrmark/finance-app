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

  function gotoPage(event) {
    if(event.key !== "Enter") return;
    if(event.target.value >= 1 && event.target.value <= totalPages) {
      const newPage = Number(event.target.value);
      setPage(newPage);
    }
  }

  const currentPage = Number(page);

  const PageButton = ({ num, active }) => (
    <button
      onClick={() => setPage(num)}
      aria-current={active ? "page" : undefined}
      className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
        active
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900 border border-beige-500 hover:bg-gray-400 hover:text-white"
      }`}
    >
      {num}
    </button>
  );

  return (
    <div className="flex justify-between items-center mt-6 gap-4">
      <button
        onClick={() => {
          if (currentPage > 1) setPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="btn border-beige-500 group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        <Image
          alt="caret left"
          src="/images/caret-left.svg"
          width={10}
          height={10}
        />
        <p className="btn-text group-hover:text-white">Prev</p>
      </button>

      <div className="flex justify-center items-center gap-2">
        <div className="flex sm:hidden gap-2 items-center">
          <PageButton num={1} active={currentPage === 1} />

          {currentPage > 3 && <input placeholder="…" type="number" onKeyDown={(e) => {gotoPage(e)}}/>}

          {currentPage !== 1 && currentPage !== totalPages && (
            <PageButton num={currentPage} active />
          )}

          {currentPage < totalPages - 1 && (
            <input placeholder="…" type="number" onKeyDown={(e) => {gotoPage(e)}}/>
          )}

          {totalPages > 1 && (
            <PageButton num={totalPages} active={currentPage === totalPages} />
          )}
        </div>

        <div className="hidden sm:flex gap-2 items-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <PageButton key={num} num={num} active={currentPage === num} />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          if (currentPage < totalPages) setPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className="btn border-beige-500 group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next Page"
      >
        <p className="btn-text group-hover:text-white">Next</p>
        <Image
          alt="caret right"
          src="/images/caret-right.svg"
          width={10}
          height={10}
        />
      </button>
    </div>
  );
}
