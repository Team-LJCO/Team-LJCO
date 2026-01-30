import { css } from "@emotion/react";
import { colors } from "../index.style";

export const ingredientManagement = css`
    padding: 10px;
`;

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

export const searchFilters = css`
    margin-bottom: 20px;
    padding: 20px;
    background-color: ${colors.white};
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const filterGroup = css`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
`;

export const filterInput = css`
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

export const tableContainer = css`
    overflow-x: auto;
    background-color: ${colors.white};
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ingredientTable = css`
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

export const ingId = css`
    font-weight: 500;
    color: ${colors.gray[700]};
`;

export const ingName = css`
    font-weight: 600;
    color: ${colors.gray[800]};
`;

export const createdDate = css`
    color: ${colors.gray[700]};
    font-size: 14px;
`;

export const categorySelect = css`
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

export const noData = css`
    text-align: center;
    color: ${colors.gray[500]};
    padding: 40px !important;
    font-size: 14px;
`;

export const loading = css`
    text-align: center;
    padding: 40px;
    color: ${colors.primary};
    font-size: 16px;
`;

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

// 모달 스타일
export const modalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const modalContent = css`
    background-color: white;
    border-radius: 16px;
    padding: 30px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    & > h3 {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 700;
        color: ${colors.gray[800]};
    }

    & > p {
        margin: 0 0 24px 0;
        font-size: 15px;
        color: ${colors.gray[700]};
        line-height: 1.5;
    }
`;

export const addModalContent = css`
    ${modalContent};
    max-width: 500px;
`;

export const modalForm = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
`;

export const formGroup = css`
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > label {
        font-size: 14px;
        font-weight: 600;
        color: ${colors.gray[800]};
    }

    & > input,
    & > select {
        padding: 12px 16px;
        border: 2px solid ${colors.accent};
        border-radius: 8px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.3s ease;

        &:focus {
            border-color: ${colors.primary};
        }
    }
`;

export const modalButtons = css`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

export const modalBtn = css`
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
`;

export const cancelBtn = css`
    ${modalBtn};
    background-color: ${colors.gray[50]};
    color: ${colors.gray[700]};

    &:hover {
        background-color: ${colors.gray[200]};
    }
`;

export const confirmBtn = css`
    ${modalBtn};
    background-color: ${colors.danger};
    color: white;

    &:hover {
        background-color: ${colors.dangerHover};
    }
`;

export const addConfirmBtn = css`
    ${modalBtn};
    background-color: ${colors.success};
    color: white;

    &:hover {
        background-color: ${colors.successHover};
    }
`;

export const radioGroup = css`
    display: flex;
    gap: 20px;
    margin-bottom: 12px;
`;

export const radioLabel = css`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: ${colors.gray[800]};

    & > input[type="radio"] {
        width: 18px;
        height: 18px;
        accent-color: ${colors.primary};
        cursor: pointer;
    }

    & > span {
        font-weight: 500;
    }
`;

export const urlInput = css`
    margin-top: 8px;
`;
