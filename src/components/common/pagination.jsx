import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
  const pagecount = Math.ceil(itemsCount / pageSize);
  if (pagecount === 1) {
    return null;
  }
  const pages = _.range(1, pagecount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((p) => (
          <li
            key={p}
            className={p === currentPage ? "page-item active" : "page-item"}
          >
            {/* eslint-disable-next-line*/}
            <a onClick={() => onPageChange(p)} className="page-link">
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
