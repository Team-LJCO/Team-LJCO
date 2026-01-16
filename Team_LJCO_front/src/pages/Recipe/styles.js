/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const s = {
    // 레시피 페이지 전용 배너
    banner: css`
        background: #FF7043;
        border-radius: 40px;
        padding: 60px 50px;
        color: #FFFFFF;
        position: relative;
        overflow: hidden;
        margin-bottom: 20px;

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
    // 레시피 카드 그리드
    recipeGrid: css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 25px;
        margin-bottom: 100px;
    `,
    recipeCard: css`
        background: #FFFFFF;
        border-radius: 30px;
        padding: 25px;
        position: relative;
        box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        transition: 0.3s;
        &:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); }

        .thumb {
            width: 100%; height: 200px;
            background: #F5F5F5; border-radius: 20px;
            margin-bottom: 20px; overflow: hidden;
            img { width: 100%; height: 100%; object-fit: cover; }
        }
        .stats {
            display: flex; gap: 8px; margin-bottom: 15px;
            span { 
                padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; 
            }
            .match { background: #FF704311; color: #FF7043; }
            .taste { background: #55555511; color: #555; }
            .level { background: #FCE9DD; color: #C04122; margin-left: auto; }
        }
        h3 { font-size: 20px; font-weight: 800; margin: 0 0 8px 0; }
        p { font-size: 13px; color: #888; margin: 0 0 20px 0; }
        .meta {
            display: flex; gap: 15px; font-size: 12px; color: #FF7043; font-weight: 700;
            margin-bottom: 20px;
        }
        .ingredients {
            display: flex; flex-wrap: wrap; gap: 6px;
            .label { font-size: 11px; color: #999; width: 100%; margin-bottom: 4px; }
            .ing { background: #F8F5F2; padding: 4px 10px; border-radius: 8px; font-size: 11px; color: #666; }
        }
    `
};