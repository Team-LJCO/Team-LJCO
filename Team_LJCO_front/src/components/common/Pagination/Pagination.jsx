/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from '../../../styles/common/Pagination.style';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div css={S.pagination}>
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0}
        css={S.pageBtn}
      >
        처음
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        css={S.pageBtn}
      >
        이전
      </button>
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          css={currentPage === pageNum ? S.pageNumberActive : S.pageNumber}
        >
          {pageNum + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        css={S.pageBtn}
      >
        다음
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage >= totalPages - 1}
        css={S.pageBtn}
      >
        마지막
      </button>
    </div>
  );
};

export default Pagination;
