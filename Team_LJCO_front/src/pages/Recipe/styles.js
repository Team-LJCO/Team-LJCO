/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const s = {
    // ==================== 배너 ====================
    banner: css`
        background: #FF7043;
        border-radius: 40px;
        padding: 60px 50px;
        color: #FFFFFF;
        position: relative;
        overflow: hidden;
        margin-bottom: 1px;

        .tag {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            display: inline-block;
            margin-bottom: 15px;
        }

        h2 {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.4;
            margin: 0;
        }
    `,

    // ==================== 정렬 컨트롤 바 ====================
    controlBar: css`
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
        margin-bottom: 1px;
    `,

    sortBtn: (isActive) => css`
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid ${isActive ? "#FF7043" : "#E0E0E0"};
        background-color: ${isActive ? "#FF7043" : "#FFFFFF"};
        color: ${isActive ? "#FFFFFF" : "#888888"};
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            background-color: ${isActive ? "#FF7043" : "#F5F5F5"};
            transform: translateY(-2px);
        }
    `,

    // ==================== 레시피 그리드 ====================
    recipeGrid: css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 25px;
        margin-bottom: 100px;
    `,

    // ==================== 레시피 카드 ====================
    recipeCard: css`
        background: #FFFFFF;
        border-radius: 30px;
        padding: 0;
        position: relative;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        transition: 0.3s;
        overflow: hidden;
        
        &:hover { 
            transform: translateY(-5px); 
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); 
        }

        .thumb {
            width: 100%; 
            height: 240px;
            background: #F5F5F5; 
            margin: 0;
            
            img { 
                width: 100%; 
                height: 100%; 
                object-fit: cover; 
            }
        }

        .content {
            padding: 25px;

            h3 { 
                font-size: 20px; 
                font-weight: 800; 
                margin: 0 0 10px 0; 
            }

            .meta {
                display: flex; 
                gap: 15px; 
                font-size: 12px; 
                color: #FF7043; 
                font-weight: 700;
                margin-bottom: 20px;
            }

            .ingredients {
                display: flex; 
                flex-wrap: wrap; 
                gap: 6px;
                
                .label { 
                    font-size: 11px; 
                    color: #999; 
                    width: 100%; 
                    margin-bottom: 4px; 
                }
            }
        }
    `
};
