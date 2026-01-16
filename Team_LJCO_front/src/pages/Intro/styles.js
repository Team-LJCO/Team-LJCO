/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const float = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
`;

const wiggle = keyframes`
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
`;

export const s = {
    wrapper: css`
        background-color: #F2E8DA;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        overflow: hidden;
    `,
    logoWrapper: css`
        margin-bottom: -100px; 
        z-index: 20;
        animation: ${wiggle} 2s infinite ease-in-out;
    `,
    logoImg: css`
        width: 400px;
        height: auto;
    `,
    mainCard: css`
        background: #FDF5E6;
        border: 4px solid #7D5A44;
        border-radius: 50px;
        width: 90%;
        max-width: 1000px;
        height: 650px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 15px 40px #0000001A;
        position: relative;
    `,
    fridgeBox: css`
        width: 600px; 
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -20px;
    `,
    // 💡 에러 방지를 위해 (isOpen) 인자를 받는 함수 형태로 정확히 정의
    fridgeImg: (isOpen) => css`
        width: 110%;
        height: 110%;
        object-fit: contain;
        animation: ${!isOpen ? float : "none"} 3s infinite ease-in-out;
    `,
    guideText: css`
        margin-top: -90px;
        margin-left: 50px;
        font-size: 26px;
        font-weight: 800;
        color: #333333;
        border-bottom: 4px solid #333333;
        padding-bottom: 8px;
        letter-spacing: 2px;
    `
};