/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as S from '../../styles/layout/Sidebar.style';

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('관리자 로그아웃 하시겠습니까?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('auth-storage');
      window.location.replace('/home');
    }
  };

  const menuItems = [
    { path: '/admin/users', label: '사용자 관리', icon: '👥' },
    { path: '/admin/ingredients', label: '재료 관리', icon: '🥕' },
    { path: '/admin/recipes', label: '레시피 관리', icon: '📖' },
  ];

  return (
    <aside css={S.sidebar}>
      <div css={S.sidebarLogo}>
        <Link to="/home" css={S.logoLink}>
          <h2>냉장고 파먹기</h2>
        </Link>
      </div>
      
      <nav css={S.sidebarNav}>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                /* 현재 경로일 때만 active 스타일 적용 */
                css={[
                  S.sidebarLink, 
                  location.pathname === item.path && S.activeLinkStyle
                ]}
              >
                <span css={S.sidebarIcon}>{item.icon}</span>
                <span css={S.sidebarLabel}>{item.label}</span>
              </Link>
            </li>
          ))}

          {/* 레시피 관리 바로 아래 구분선과 로그아웃 버튼 */}
          <li>
            <hr css={S.logoutDivider} />
            <div onClick={handleLogout} css={S.sidebarLink}>
              <span css={S.sidebarIcon}>🔓</span>
              <span css={S.sidebarLabel}>로그아웃</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;