/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import * as S from '../../styles/layout/Header.style';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색어:', searchQuery);
  };

  return (
    <header css={S.adminHeader}>
      <div css={S.headerLeft}>
        <h1 css={S.headerTitle}>관리자 대시보드</h1>
      </div>
      <div css={S.headerRight}>
        <form css={S.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            css={S.searchInput}
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" css={S.searchButton}>
            🔍
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
