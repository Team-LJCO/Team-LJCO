/** @jsxImportSource @emotion/react */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import * as S from '../../styles/layout/AdminLayout.style';

const AdminLayout = () => {
  return (
    <div css={S.adminLayout}>
      <Sidebar />
      <div css={S.adminMain}>
        <Header />
        <div css={S.adminContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
