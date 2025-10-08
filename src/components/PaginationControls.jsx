import React from 'react';
import "./PaginationControls.css";

export default function PaginationControls({ currentPage, totalTodos, limitPerPage, goToNextPage, goToPrevPage }){
    return(
        <div className="pagination-container">
            <button
                disabled={currentPage === 1} // true or false
                onClick={goToPrevPage}
                className="previous-btn">
                Previous
            </button>
            <p className="page">
                {currentPage} / {Math.ceil(totalTodos / limitPerPage)}
            </p>
            <button
                disabled={currentPage * limitPerPage >= totalTodos} //true or false
                onClick={goToNextPage}
                className="next-btn"            >
                Next
            </button>
        </div>
    )
}