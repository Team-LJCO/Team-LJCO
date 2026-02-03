import { css } from "@emotion/react";
import { colors } from "../index.style";

export const sidebar = css`
    width: 240px;
    min-height: 100vh;
    background: linear-gradient(180deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
    border-radius: 0 20px 20px 0;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
`;

export const sidebarLogo = css`
    padding: 20px 30px;
    margin-bottom: 20px;

    & h2 {
        color: white; 
        text-decoration: none !important; /* 밑줄 제거 */
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        /* 그림자 들어간 흰색 효과 */
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
    }
`;

export const logoLink = css`
    text-decoration: none !important;
`;

export const sidebarNav = css`
    flex: 1;
    & > ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    & li {
        margin: 5px 15px;
    }
`;

/* 메뉴 및 로그아웃 공통: 평상시 투명, 호버 시에만 RGBA 배경 */
export const sidebarLink = css`
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.2s ease;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    background-color: transparent; /* 항상 켜져있지 않도록 기본 투명 설정 */

    &:hover {
        background-color: rgba(255, 255, 255, 0.2); /* 호버 시에만 불 들어옴 */
        transform: translateX(5px);
    }
`;

/* 현재 페이지 강조용 (호버보다 조금 더 진하게) */
export const activeLinkStyle = css`
    background-color: rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const logoutDivider = css`
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2); /* RGBA 실선 */
    margin: 15px 15px;
`;

export const sidebarIcon = css`
    font-size: 20px;
    margin-right: 12px;
    width: 28px;
    text-align: center;
`;

export const sidebarLabel = css`
    flex: 1;
`;