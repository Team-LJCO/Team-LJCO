import { css } from "@emotion/react";
import { colors } from "../index.style";

export const recipeManagement = css`
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

export const editBtn = css`
    padding: 8px 16px;
    background-color: ${colors.primary};
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.primaryHover};
    }

    &:disabled {
        background-color: ${colors.gray[300]};
        cursor: not-allowed;
    }
`;

export const recipeImgCell = css`
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const recipeImg = css`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid ${colors.gray[200]};
`;

export const noImage = css`
    color: ${colors.gray[400]};
    font-size: 14px;
`;

export const levelBadge = css`
    display: inline-block;
    padding: 4px 12px;
    background-color: ${colors.accent};
    color: ${colors.gray[700]};
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
`;

export const viewCount = css`
    color: ${colors.gray[700]};
    font-size: 14px;
    font-weight: 500;
`;

// 동적 폼 필드 스타일
export const sectionHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.gray[200]};

    & > label {
        font-size: 14px;
        font-weight: 600;
        color: ${colors.gray[800]};
    }
`;

export const addFieldBtn = css`
    padding: 6px 12px;
    background-color: ${colors.accent};
    color: ${colors.gray[700]};
    border: 1px solid ${colors.gray[300]};
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.gray[200]};
    }
`;

export const dynamicFieldRow = css`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
`;

export const fieldSelect = css`
    flex: 1;
    padding: 10px 12px;
    border: 2px solid ${colors.accent};
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${colors.primary};
    }
`;

export const fieldInput = css`
    width: 120px;
    padding: 10px 12px;
    border: 2px solid ${colors.accent};
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${colors.primary};
    }
`;

export const removeFieldBtn = css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.danger};
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.dangerHover};
    }
`;

// 조리 단계 스타일
export const stepFieldRow = css`
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 12px;
`;

export const stepNumber = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: ${colors.primary};
    color: white;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
    margin-top: 8px;
`;

export const stepInputs = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const stepTextarea = css`
    width: 100%;
    min-height: 60px;
    padding: 10px 12px;
    border: 2px solid ${colors.accent};
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    resize: vertical;
    font-family: inherit;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${colors.primary};
    }
`;

export const stepUrlInput = css`
    width: 100%;
    padding: 8px 12px;
    border: 2px solid ${colors.accent};
    border-radius: 6px;
    font-size: 13px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: ${colors.primary};
    }

    &::placeholder {
        color: ${colors.gray[400]};
    }
`;

// 테이블 관련 스타일 (기존 재료관리와 동일)
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
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
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

// 스크롤 가능한 섹션 스타일
export const scrollableSection = css`
    max-height: 150px;
    overflow-y: auto;
    padding-right: 8px;
    margin-bottom: 8px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: ${colors.gray[100]};
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${colors.gray[300]};
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${colors.gray[400]};
    }
`;

export const scrollableStepsSection = css`
    max-height: 250px;
    overflow-y: auto;
    padding-right: 8px;
    margin-bottom: 8px;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: ${colors.gray[100]};
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${colors.gray[300]};
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${colors.gray[400]};
    }
`;

// 조리 단계 이미지 업로드 스타일
export const stepImageUpload = css`
    margin-top: 8px;
`;

export const stepImageUploadLabel = css`
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background-color: ${colors.gray[100]};
    border: 1px dashed ${colors.gray[300]};
    border-radius: 6px;
    font-size: 13px;
    color: ${colors.gray[600]};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.gray[200]};
        border-color: ${colors.primary};
    }
`;

export const stepImagePreview = css`
    display: flex;
    align-items: center;
    gap: 8px;

    & > img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 6px;
        border: 1px solid ${colors.gray[200]};
    }

    & > button {
        padding: 4px 8px;
        background-color: ${colors.danger};
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background-color: ${colors.dangerHover};
        }
    }
`;
