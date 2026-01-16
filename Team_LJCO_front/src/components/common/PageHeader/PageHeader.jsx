/** @jsxImportSource @emotion/react */
import React from 'react';
import * as S from '../../../styles/common/PageHeader.style';

const PageHeader = ({ title, children }) => {
  return (
    <div css={S.pageHeader}>
      <h2>{title}</h2>
      {children && <div css={S.pageHeaderActions}>{children}</div>}
    </div>
  );
};

export default PageHeader;
