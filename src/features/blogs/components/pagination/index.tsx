"use client";
import Link from "next/link";
import ArrowRight from "../icons/arrow-right";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
  currentPage: number;
};

export default function Pagination({ totalPages, currentPage }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  const redirect = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", page.toString());
    }
    const query = newParams.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}#tab-search`);
  };

  const createPagination = () => {
    const pages: (number | "...")[] = [];

    // display all pages, when totalPages is low
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // in front of the list
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    }
    // in end of the list
    else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    }
    // in middle of the list
    else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
  };

  const pages = createPagination();

  return (
    <>
      <div className="w-full flex justify-center gap-8 !mt-20 !mb-5">
        <button
          onClick={() => redirect(currentPage - 1)}
          className={`font-medium flex items-center gap-1 md:gap-2 text-gray-500 hover:text-[rgb(207,255,17)] ${
            !canGoBack
              && "!opacity-50"
          }`}
          disabled={!canGoBack}
        >
          <ArrowRight isArrowRight={false} />
          <p className="hidden md:block">Previous</p>
        </button>
        <div className="hidden md:flex gap-3 items-center">
          {pages.map((page, index) =>
            page === "..." ? (
              <span
                key={index}
                className="px-3 py-2 text-sm text-gray-500 select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => redirect(page)}
                className={`rounded font-bold px-2 py-1 flex items-center justify-center text-gray-500 hover:text-[rgb(207,255,17)] ${
                  page === currentPage && "!bg-[rgb(207,255,17)] !text-black !pointer-events-none"
                }`}
              >
                <p
                >
                  {page}
                </p>
              </button>
            )
          )}
        </div>
        <p
          className={`flex items-center justify-center md:hidden rounded font-bold px-2 py-1 bg-[rgb(207,255,17)] text-black`}
        >
          {currentPage}
        </p>

        <button
          onClick={() => redirect(currentPage + 1)}
          className={`font-medium flex items-center gap-1 md:gap-2 text-gray-500 hover:text-[rgb(207,255,17)] ${
            !canGoForward
              && "!opacity-40"
          }`}
          disabled={!canGoForward}
        >
          <p className="hidden md:block">Next</p>
          <ArrowRight isArrowRight />
        </button>
      </div>
    </>
  );
}
