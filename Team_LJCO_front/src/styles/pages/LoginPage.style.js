import { css } from "@emotion/react";
import { colors, checkeredBackground } from "../index.style";

export const loginPage = css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    ${checkeredBackground};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    padding: 20px;
`;

export const loginContainer = css`
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(255, 87, 34, 0.15);
`;

export const loginHeader = css`
    text-align: center;
    margin-bottom: 32px;

    & > h1 {
        font-size: 28px;
        font-weight: 700;
        color: ${colors.primary};
        margin: 0 0 8px 0;
    }

    & > p {
        font-size: 14px;
        color: ${colors.gray[700]};
        margin: 0;
    }
`;

export const loginForm = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const loginError = css`
    padding: 12px 16px;
    background-color: #ffebee;
    border: 1px solid ${colors.danger};
    border-radius: 8px;
    color: #c62828;
    font-size: 14px;
    text-align: center;
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

    & > input {
        padding: 14px 16px;
        border: 2px solid ${colors.accent};
        border-radius: 12px;
        font-size: 15px;
        outline: none;
        transition: all 0.3s ease;

        &:focus {
            border-color: ${colors.primary};
            box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
        }

        &::placeholder {
            color: #aaa;
        }
    }
`;

export const loginBtn = css`
    padding: 16px;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 8px;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 87, 34, 0.35);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const loginDivider = css`
    display: flex;
    align-items: center;
    margin: 24px 0;

    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: ${colors.gray[200]};
    }

    & > span {
        padding: 0 16px;
        font-size: 13px;
        color: ${colors.gray[500]};
    }
`;

export const testLoginBtn = css`
    width: 100%;
    padding: 14px;
    background-color: ${colors.gray[50]};
    color: ${colors.gray[700]};
    border: 2px solid ${colors.gray[200]};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
        background-color: #eeeeee;
        border-color: #bdbdbd;
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
