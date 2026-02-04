/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const s = {
    detailOverlay: css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `,

    detailContent: css`
        background: white;
        border-radius: 30px;
        width: 95%;
        max-width: 1100px;
        height: 85vh;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        position: relative;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

        .recipe-body {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
            &::-webkit-scrollbar { width: 6px; }
            &::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
        }

        .recipe-sidebar {
            width: 340px;
            background-color: #fcfcfc;
            border-left: 1px solid #f0f0f0;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
        }

        .back-btn {
            background: none;
            border: none;
            color: #FF7043;
            font-weight: 800;
            cursor: pointer;
            margin-bottom: 25px;
            font-size: 15px;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: 0.2s;
            &:hover { transform: translateX(-5px); }
        }
    `,

    finishContainer: css`
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 25px 0 0 0;
        box-sizing: border-box;

        .text-section { padding: 0 25px; }
        
        .finish-title { 
            font-size: 26px; 
            font-weight: 900; 
            margin-bottom: 15px; 
            color: #222; 
            letter-spacing: -0.5px;
        }

        .finish-desc { 
            font-size: 18px; 
            color: #555; 
            margin-bottom: 25px; 
            line-height: 1.6; 
            font-weight: 800;
            letter-spacing: -0.3px;
            .orange { color: #ff7043; font-weight: 900; }
            .blue { color: #2196f3; font-weight: 900; }
        }

        .ingredient-list {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            gap: 12px;
            padding: 5px 20px 25px 20px;
            &::-webkit-scrollbar { width: 0px; }
        }

        .ing-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: calc(50% - 6px);
            padding: 18px 8px;
            border-radius: 22px;
            cursor: pointer;
            border: 2px solid #f5f5f5;
            background: #fff;
            box-sizing: border-box;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            &:hover { transform: translateY(-5px); }
        }

        .icon-badge {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            transition: all 0.2s ease;
        }

        .bottom-action {
            padding: 25px;
            border-top: 1px solid #f0f0f0;
            background: white;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .complete-btn {
            width: 100%;
            height: 60px;
            border: none;
            border-radius: 20px;
            font-size: 18px;
            font-weight: 900;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

            &.default { background-color: #ff7043; color: white; }
            &.finish { background-color: #222; color: white; }
            &.add { background-color: #2196f3; color: white; }
            
            &.shop { 
                background-color: #f0f7ff; 
                color: #2196f3; 
                border: 1px solid #d1e9ff;
                box-shadow: 0 4px 12px rgba(33, 150, 243, 0.15); 
            }

            /* ✅ disabled 상태 스타일 추가 */
            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none !important;
            }

            &:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                filter: brightness(1.05);
            }

            &.shop:hover:not(:disabled) {
                background-color: #e3f2fd;
                box-shadow: 0 8px 20px rgba(33, 150, 243, 0.25);
                color: #1976d2;
            }

            &:active:not(:disabled) { transform: translateY(1px); }
        }

        .btn-row { display: flex; gap: 10px; width: 100%; }
    `
};
