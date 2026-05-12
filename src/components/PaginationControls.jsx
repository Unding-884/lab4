import React from 'react';
import "./PaginationControls.css";

function PaginationControls({ currentPage, totalTodos, limitPerPage, goToNextPage, goToPrevPage }) {
  const totalPages = Math.ceil(totalTodos / limitPerPage);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage * limitPerPage >= totalTodos;

  return (
    <div className="pagination-container">
      <button
        disabled={isPrevDisabled}
        onClick={goToPrevPage}
        className="previous-btn"
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <p className="page" aria-label={`Page ${currentPage} of ${totalPages}`}>
        {currentPage} / {totalPages}
      </p>
      <button
        disabled={isNextDisabled}
        onClick={goToNextPage}
        className="next-btn"
        aria-label="Go to next page"
      >
        Next
      </button>
    </div>
  );
}

export default React.memo(PaginationControls);