import React, { useMemo } from "react";
import Icon from "@/components/ui/Icon";

const PaginationWithClientSide = ({
  pageSize,
  setPageSize,
  pageIndex,
  pageOptions,
  canPreviousPage,
  gotoPage,
  previousPage,
  canNextPage,
  nextPage,
  pageCount,
}) => {
  // Generate page numbers to display with ellipsis
  const getPageNumbers = () => {
    const totalPages = pageOptions.length;
    const currentPage = pageIndex + 1;
    const delta = 2; // Number of pages to show on each side of current page
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of the range around current page
      let start = Math.max(2, currentPage - delta);
      let end = Math.min(totalPages - 1, currentPage + delta);

      // Adjust if we're near the beginning
      if (currentPage <= delta + 2) {
        end = Math.min(5, totalPages - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - delta - 1) {
        start = Math.max(totalPages - 4, 2);
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add pages in the range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = useMemo(() => getPageNumbers(), [pageIndex, pageOptions.length]);

  return (
    <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 pb-[20px] px-[20px] items-center">
      <div className=" flex items-center space-x-3 rtl:space-x-reverse">
        <select
          className="form-control py-2 w-max"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Page{" "}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
        </span>
      </div>
      <ul className="flex items-center space-x-3  rtl:space-x-reverse">
        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${
              !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <Icon icon="heroicons:chevron-double-left-solid" />
          </button>
        </li>
        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${
              !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((page, idx) => {
          if (page === "...") {
            return (
              <li key={`ellipsis-${idx}`} className="text-slate-900 dark:text-white px-2">
                ...
              </li>
            );
          }
          const pageIdx = page - 1; // Convert to 0-based index
          return (
            <li key={page}>
              <button
                aria-current={pageIdx === pageIndex ? "page" : undefined}
                className={` ${
                  pageIdx === pageIndex
                    ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                    : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                onClick={() => gotoPage(pageIdx)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            className={` ${
              !canNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
        </li>
        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={` ${
              !canNextPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Icon icon="heroicons:chevron-double-right-solid" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationWithClientSide;
