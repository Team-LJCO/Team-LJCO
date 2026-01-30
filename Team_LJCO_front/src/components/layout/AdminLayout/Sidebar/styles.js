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

    & > h2 {
        color: white;
        font-size: 28px;
        font-weight: 700;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
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

export const sidebarLink = css`
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-size: 16px;
    font-weight: 500;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: translateX(5px);
    }

    &.active {
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
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
