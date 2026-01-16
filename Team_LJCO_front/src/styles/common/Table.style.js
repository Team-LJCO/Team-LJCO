import { css } from "@emotion/react";
import { colors } from "../index.style";

export const tableContainer = css`
    overflow-x: auto;
    background-color: ${colors.white};
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const dataTable = css`
    width: 100%;
    border-collapse: collapse;

    & thead {
        background-color: ${colors.accent};
    }

    & th {
        padding: 16px;
        text-align: left;
        font-weight: 600;
        color: ${colors.gray[800]};
        border-bottom: 2px solid ${colors.primary};
    }

    & td {
        padding: 16px;
        border-bottom: 1px solid ${colors.gray[100]};
        vertical-align: middle;
    }

    & tbody tr:hover {
        background-color: #fff5f3;
    }
`;

export const noData = css`
    text-align: center;
    color: ${colors.gray[500]};
    padding: 40px !important;
    font-size: 14px;
`;

export const tableLoading = css`
    text-align: center;
    padding: 40px;
    color: ${colors.primary};
    font-size: 16px;
    background-color: ${colors.white};
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const tableId = css`
    font-weight: 500;
    color: ${colors.gray[700]};
`;

export const tableName = css`
    font-weight: 600;
    color: ${colors.gray[800]};
`;

export const tableDate = css`
    color: ${colors.gray[700]};
    font-size: 14px;
`;

export const tableSelect = css`
    padding: 8px 12px;
    border: 2px solid ${colors.accent};
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    background-color: white;
    cursor: pointer;
    outline: none;
    transition: border-color 0.3s ease;
    min-width: 120px;

    &:focus,
    &:hover {
        border-color: ${colors.primary};
    }
`;

export const actionBtn = css`
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
`;

export const deleteBtn = css`
    ${actionBtn};
    background-color: ${colors.danger};
    color: white;

    &:hover {
        background-color: ${colors.dangerHover};
    }
`;

// 배지 스타일
export const badge = css`
    display: inline-block;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
`;

export const badgeProvider = css`
    ${badge};
    background-color: ${colors.gray[100]};
    color: ${colors.gray[700]};
`;

export const badgeLocal = css`
    ${badge};
    background-color: ${colors.gray[500]};
    color: white;
`;

export const badgeGoogle = css`
    ${badge};
    background-color: #dbdbdb;
    color: ${colors.gray[800]};
`;

export const badgeKakao = css`
    ${badge};
    background-color: ${colors.kakao};
    color: ${colors.gray[800]};
`;

export const badgeNaver = css`
    ${badge};
    background-color: ${colors.naver};
    color: white;
`;
