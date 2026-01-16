/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import * as S from '../../styles/layout/Sidebar.style';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/users', label: '사용자 관리', icon: '👥' },
    { path: '/admin/ingredients', label: '재료 관리', icon: '🥕' },
    { path: '/admin/recipes', label: '레시피 관리', icon: '📖' },
  ];

  const isActive = (path) => location.pathname === path;

  const activeLinkStyle = css`
    ${S.sidebarLink};
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  `;

  return (
    <aside css={S.sidebar}>
      <div css={S.sidebarLogo}>
        <h2>냉장고 파먹기</h2>
      </div>
      <nav css={S.sidebarNav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                css={isActive(item.path) ? activeLinkStyle : S.sidebarLink}
              >
                <span css={S.sidebarIcon}>{item.icon}</span>
                <span css={S.sidebarLabel}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
