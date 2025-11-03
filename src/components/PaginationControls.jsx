import React, { useMemo } from 'react';
import "./PaginationControls.css";

function PaginationControls({ currentPage, totalTodos, limitPerPage, goToNextPage, goToPrevPage }) {
  const totalPages = useMemo(() => 
    Math.ceil(totalTodos / limitPerPage), 
    [totalTodos, limitPerPage]
  );

  const isPrevDisabled = useMemo(() => 
    currentPage === 1, 
    [currentPage]
  );

  const isNextDisabled = useMemo(() => 
    currentPage * limitPerPage >= totalTodos, 
    [currentPage, limitPerPage, totalTodos]
  );

  return (
    <div className="pagination-container">
      <button
        disabled={isPrevDisabled}
        onClick={goToPrevPage}
        className="previous-btn"
      >
        Previous
      </button>
      <p className="page">
        {currentPage} / {totalPages}
      </p>
      <button
        disabled={isNextDisabled}
        onClick={goToNextPage}
        className="next-btn"
      >
        Next
      </button>
    </div>
  );
}

export default React.memo(PaginationControls);