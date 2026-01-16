/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const s = {
    // 1. 배경 설정: 흰색 띠 방지 및 전체 그룹 위로 올리기
    wrapper: css`
        background-color: #F2E8DA; /* 배경색 헥사 코드 */
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Pretendard', sans-serif;
        /* 💡 아래쪽 패딩을 주어 전체적인 상자 그룹을 위로 올립니다 */
        padding-bottom: 100px; 
        box-sizing: border-box;
    `,

    // 2. 상자 그룹 컨테이너: 위치 미세 조정
    container: css`
        position: relative;
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        /* 💡 추가적으로 위로 더 당기고 싶을 때 조절하세요 */
        margin-top: -20px; 
    `,

    // 3. 돌아가기 버튼: 위치 및 색상
    backBtn: css`
        position: absolute;
        top: -50px;
        left: 0;
        background: #00000000; /* 투명 헥사 코드 */
        border: none;
        font-size: 18px;
        font-weight: 800;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #333333; /* 헥사 코드 */
    `,

    // 4. 로그인 메인 카드: 시안 디자인 재현
    loginCard: css`
        background: #FDF5E6; /* 카드 배경색 */
        border-radius: 50px;
        padding: 60px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 15px 40px #0000001A; /* 그림자 헥사 코드 */
    `,

    // 5. 텍스트 스타일
    title: css`
        font-size: 42px;
        font-weight: 900;
        color: #000000; /* 헥사 코드 */
        margin-bottom: 10px;
    `,

    subTitle: css`
        font-size: 18px;
        color: #666666; /* 헥사 코드 */
        margin-bottom: 50px;
    `,

    // 6. 버튼 리스트 및 소셜 버튼 스타일
    btnList: css`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
    `,

    socialBtn: css`
        width: 100%;
        height: 70px;
        background: #FFFFFF; /* 헥사 코드 */
        border: 1px solid #DDDDDD; /* 헥사 코드 */
        border-radius: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        font-size: 20px;
        font-weight: 700;
        color: #333333; /* 헥사 코드 */
        cursor: pointer;
        transition: 0.2s;
        box-shadow: 0 4px 10px #0000000D;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px #0000001A;
        }

        /* 아이콘 중앙 정렬용 */
        svg {
            flex-shrink: 0;
        }
    `
};