/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const s = {
    modalOverlay: css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `,
    modalContent: css`
        background: white;
        width: 100%;
        max-width: 450px;
        padding: 30px;
        border-radius: 25px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        gap: 20px;
    `,
    modalHeader: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 { font-size: 20px; font-weight: 800; color: #333; margin: 0; }
        button { 
            background: none; border: none; font-size: 24px; color: #999; 
            cursor: pointer; &:hover { color: #333; }
        }
    `,
    searchBox: css`
        width: 100%;
        padding: 15px 20px;
        border: 2px solid #FFE0D5;
        border-radius: 15px;
        font-size: 16px;
        outline: none;
        box-sizing: border-box; /* 💡 이게 있어야 가로폭이 안 깨집니다 */
        &:focus { border-color: #FF7043; }
    `,
    resultList: css`
        max-height: 300px;
        overflow-y: auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        padding-right: 5px;
        &::-webkit-scrollbar { width: 5px; }
        &::-webkit-scrollbar-thumb { background: #EEE; border-radius: 10px; }
    `,
    itemCard: (isSelected) => css`
        background: ${isSelected ? "#FFF5F2" : "white"};
        border: 2px solid ${isSelected ? "#FF7043" : "#F5F5F5"};
        padding: 15px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: 0.2s;
        &:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        img { width: 60px; height: 60px; object-fit: contain; }
        .ing-name { font-weight: 700; font-size: 14px; color: #555; }
    `
};