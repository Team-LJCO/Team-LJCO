import { css } from "@emotion/react";
import { colors } from "../index.style";

export const searchBar = css`
    margin-bottom: 20px;
    padding: 20px;
    background-color: ${colors.white};
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const searchGroup = css`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
`;

export const searchInput = css`
    flex: 1;
    min-width: 300px;
    padding: 12px 16px;
    border: 2px solid ${colors.accent};
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${colors.primary};
    }
`;

export const searchBtn = css`
    padding: 12px 24px;
    background-color: ${colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.primaryHover};
    }
`;

export const resetBtn = css`
    padding: 12px 24px;
    background-color: ${colors.gray[500]};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.gray[600]};
    }
`;
