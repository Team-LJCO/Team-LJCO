/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const s = {
    // 기존 스타일 유지... (modalOverlay, grid, recipeCard 등)
    modalOverlay: css`
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 2000;
        backdrop-filter: blur(4px);
    `,
    modalContent: css` /* 이건 재료 추가 모달용인듯 하여 건드리지 않음 */
        background: white; border-radius: 40px; width: 90%; max-width: 900px; max-height: 85vh;
        padding: 40px; overflow-y: auto; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); position: relative;
    `,
    
    // ▼▼▼ 수정된 부분: 레시피 상세 모달 스타일 ▼▼▼
    detailOverlay: css`
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 3000;
        backdrop-filter: blur(5px); /* 배경 블러 추가로 집중도 향상 */
    `,
    detailContent: css`
        background: white; 
        border-radius: 30px; 
        width: 95%; 
        max-width: 720px; /* 550px -> 720px (황금 비율/가독성 최적화) */
        height: 85vh; /* 90vh -> 85vh (위아래 여백 확보) */
        padding: 40px; 
        overflow-y: auto; 
        position: relative;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);

        /* 스크롤바 숨기기 (선택사항 - 깔끔함을 원하시면 유지) */
        &::-webkit-scrollbar { display: none; }
        -ms-overflow-style: none;
        scrollbar-width: none;

        .back-btn { 
            background: none; border: none; color: #FF7043; 
            font-weight: 800; cursor: pointer; margin-bottom: 25px; font-size: 14px;
            transition: 0.2s;
            &:hover { transform: translateX(-5px); }
        }
    `
};