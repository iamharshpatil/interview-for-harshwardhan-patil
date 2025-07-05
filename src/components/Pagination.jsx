const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-end mt-4 ">
      <div className="inline-flex items-center border rounded overflow-hidden text-sm">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 disabled:opacity-40 hover:bg-gray-100"
        >
          <i class="ri-arrow-left-s-line"></i>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <span
              key={index}
              className="px-3 py-2 text-gray-400 cursor-default"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(number)}
              className={`px-3 py-2 ${
                number === currentPage
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 disabled:opacity-40 hover:bg-gray-100"
        >
          <i class="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
