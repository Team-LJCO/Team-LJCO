/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const s = {
    modalOverlay: css`
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 2000;
        backdrop-filter: blur(4px);
    `,
    modalContent: css`
        background: white; border-radius: 40px; width: 90%; max-width: 900px; max-height: 85vh;
        padding: 40px; overflow-y: auto; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); position: relative;
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; 
            h2 { font-size: 24px; font-weight: 800; color: #333; }
        }
    `,
    grid: css`
        display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 25px;
    `,
    recipeCard: css`
        background: #FFFFFF; border: 1px solid #f0f0f0; border-radius: 25px; padding: 20px;
        transition: 0.3s; cursor: pointer;
        &:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(255, 112, 67, 0.1); }
        .img-box { width: 100%; height: 150px; background: #f9f9f9; border-radius: 18px; margin-bottom: 15px; overflow: hidden;
            img { width: 100%; height: 100%; object-fit: cover; }
        }
        .info h3 { font-size: 18px; color: #333; margin-bottom: 10px; }
        .match { font-size: 12px; color: #FF7043; background: #FFF5F2; padding: 4px 10px; border-radius: 8px; font-weight: 700; }
    `,
    // 💡 상세 조리 과정(본 레시피 창) 스타일
    detailOverlay: css`
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 3000;
    `,
    detailContent: css`
        background: white; border-radius: 35px; width: 95%; max-width: 550px; height: 90vh;
        padding: 40px; overflow-y: auto; position: relative;
        .back-btn { background: none; border: none; color: #FF7043; font-weight: 800; cursor: pointer; margin-bottom: 20px; }
        .step-item { margin-bottom: 45px; }
        .step-num { font-size: 14px; font-weight: 900; color: #FF7043; margin-bottom: 12px; }
        .step-img { width: 100%; border-radius: 20px; overflow: hidden; margin-bottom: 15px; 
            img { width: 100%; display: block; }
        }
        .step-desc { font-size: 16px; line-height: 1.7; color: #444; word-break: keep-all; }
    `
};