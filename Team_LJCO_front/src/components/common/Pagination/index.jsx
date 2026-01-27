/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 스타일 정의
const s = {
    container: css`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-top: 40px;
        margin-bottom: 60px;
    `,
    pageBtn: (isActive) => css`
        min-width: 36px;
        height: 36px;
        padding: 0 6px;
        border-radius: 50%; /* 둥근 버튼 */
        border: none;
        background-color: ${isActive ? "#FF7043" : "transparent"};
        color: ${isActive ? "#FFFFFF" : "#555555"};
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background-color: ${isActive ? "#FF7043" : "#F0F0F0"};
        }
        &:disabled {
            cursor: default;
            color: #bbb;
            &:hover { background-color: transparent; }
        }
    `,
    navBtn: css`
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid #E0E0E0;
        background-color: white;
        color: #555;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &:hover:not(:disabled) {
            border-color: #FF7043;
            color: #FF7043;
            background-color: #FFF3E0;
        }
        &:disabled {
            background-color: #F9F9F9;
            color: #CCC;
            cursor: not-allowed;
            border-color: #EEE;
        }
    `
};

function Pagination({ page, totalPages, onChange }) {
    const totalPageCount = 10;
    const pages = [];

    const groupIndex = Math.floor((page - 1) / totalPageCount);
    const startPage = groupIndex * totalPageCount + 1;
    const endPage = Math.min(startPage + totalPageCount - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const onClickFirstPageButton = () => {
        if (page === 1) {
            alert("첫페이지입니다");
            return;
        }
        // 이전 그룹의 마지막 페이지로 이동하는 로직 유지
        onChange(Math.max(1, startPage - 1));
    };

    const onClickLastPageButton = () => {
        if (page === totalPages) {
            alert("마지막 페이지입니다");
            return;
        }
        // 다음 그룹의 첫 페이지로 이동하는 로직 유지
        onChange(Math.min(totalPages, endPage + 1));
    };

    return (
        <div css={s.container}>
            <button 
                css={s.navBtn} 
                onClick={onClickFirstPageButton} 
                disabled={page === 1} // 로직 수정: 1페이지면 비활성화가 더 자연스러움
            >
                이전
            </button>
            
            {pages.map((p) => (
                <button
                    key={p}
                    css={s.pageBtn(p === page)}
                    onClick={() => onChange(p)}
                    disabled={p === page}
                >
                    {p}
                </button>
            ))}

            <button 
                css={s.navBtn} 
                onClick={onClickLastPageButton} 
                disabled={page === totalPages} // 로직 수정: 마지막 페이지면 비활성화
            >
                다음
            </button>
        </div>
    );
}

export default Pagination;