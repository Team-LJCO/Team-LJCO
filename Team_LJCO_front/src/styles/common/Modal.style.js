import { css } from "@emotion/react";
import { colors } from "../index.style";

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

export const formModalContent = css`
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

// 이미지 업로드 스타일
export const imageUploadContainer = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const imageUploadArea = css`
    border: 2px dashed ${colors.gray[300]};
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${colors.primary};
        background-color: ${colors.gray[50]};
    }
`;

export const imageUploadLabel = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: ${colors.gray[600]};
    font-size: 14px;

    & > span {
        font-weight: 500;
    }
`;

export const imageUploadIcon = css`
    font-size: 32px;
    color: ${colors.gray[400]};
`;

export const hiddenFileInput = css`
    display: none;
`;

export const imagePreviewContainer = css`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const imagePreview = css`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid ${colors.gray[200]};
`;

export const imagePreviewInfo = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;

    & > span {
        font-size: 13px;
        color: ${colors.gray[600]};
    }
`;

export const imageRemoveBtn = css`
    padding: 6px 12px;
    background-color: ${colors.danger};
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${colors.dangerHover};
    }
`;

export const uploadingText = css`
    color: ${colors.primary};
    font-size: 13px;
    font-weight: 500;
`;
