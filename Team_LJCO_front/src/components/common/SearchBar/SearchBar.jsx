/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from '../../../styles/common/SearchBar.style';

const SearchBar = ({
  value,
  onChange,
  onSearch,
  onReset,
  placeholder = '검색어를 입력하세요',
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div css={S.searchBar}>
      <div css={S.searchGroup}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          css={S.searchInput}
        />
        <button onClick={onSearch} css={S.searchBtn}>
          검색
        </button>
        <button onClick={onReset} css={S.resetBtn}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
