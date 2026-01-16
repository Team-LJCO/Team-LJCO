import { css } from "@emotion/react";
import { colors } from "../index.style";

export const adminHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const headerLeft = css`
    display: flex;
    align-items: center;
`;

export const headerTitle = css`
    font-size: 24px;
    font-weight: 700;
    color: ${colors.primary};
    margin: 0;
`;

export const headerRight = css`
    display: flex;
    align-items: center;
`;

export const searchForm = css`
    display: flex;
    align-items: center;
    background-color: ${colors.accent};
    border-radius: 25px;
    padding: 5px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const searchInput = css`
    width: 250px;
    padding: 10px 20px;
    border: none;
    background: transparent;
    font-size: 14px;
    color: ${colors.gray[800]};
    outline: none;

    &::placeholder {
        color: rgba(0, 0, 0, 0.5);
    }
`;

export const searchButton = css`
    width: 40px;
    height: 40px;
    border: none;
    background-color: ${colors.primary};
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: all 0.3s ease;
    color: white;

    &:hover {
        background-color: ${colors.primaryHover};
        transform: scale(1.05);
    }
`;
