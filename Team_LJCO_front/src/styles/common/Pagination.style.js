import { css } from "@emotion/react";
import { colors } from "../index.style";

export const pagination = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    padding: 20px;
`;

export const pageBtn = css`
    padding: 8px 14px;
    background-color: ${colors.white};
    color: ${colors.gray[800]};
    border: 1px solid ${colors.gray[300]};
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
        background-color: ${colors.primary};
        color: white;
        border-color: ${colors.primary};
    }

    &:disabled {
        background-color: ${colors.gray[50]};
        color: ${colors.gray[400]};
        cursor: not-allowed;
    }
`;

export const pageNumber = css`
    ${pageBtn};
    min-width: 40px;
    text-align: center;
`;

export const pageNumberActive = css`
    ${pageNumber};
    background-color: ${colors.primary};
    color: white;
    border-color: ${colors.primary};
`;
