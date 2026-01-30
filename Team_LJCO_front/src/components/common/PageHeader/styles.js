import { css } from "@emotion/react";
import { colors } from "../index.style";

export const pageHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    & > h2 {
        font-size: 24px;
        font-weight: 700;
        color: ${colors.gray[800]};
        margin: 0;
    }
`;

export const pageHeaderActions = css`
    display: flex;
    gap: 10px;
`;

export const addBtn = css`
    padding: 12px 24px;
    background-color: ${colors.success};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.successHover};
    }
`;
