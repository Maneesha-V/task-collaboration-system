import type { PaginationProps } from "../../types/commonTypes";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">

        <li
          className={`page-item ${
            page === 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              onPageChange(page - 1)
            }
          >
            Previous
          </button>
        </li>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                page === index + 1
                  ? "active"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  onPageChange(index + 1)
                }
              >
                {index + 1}
              </button>
            </li>
          )
        )}

        <li
          className={`page-item ${
            page === totalPages
              ? "disabled"
              : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              onPageChange(page + 1)
            }
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Pagination;