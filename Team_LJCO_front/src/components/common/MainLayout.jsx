/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

/** [설명]: 프로젝트 전체의 중앙 정렬 틀과 배경색을 담당하는 틀 */
function MainLayout({ children }) {
    return (
        <div css={css`
            background-color: #F2E8DA;
            min-height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
        `}>
            <div css={css`
                width: 100%;
                max-width: 1100px; /* Home.style의 컨테이너 기준 유지 */
            `}>
                {children}
            </div>
        </div>
    );
}
export default MainLayout;
