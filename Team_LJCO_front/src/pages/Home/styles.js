/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

// 💡 냉장고 캐릭터 흔들림 애니메이션
const refrigeratorShake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
  75% { transform: rotate(-3deg); }
  100% { transform: rotate(0deg); }
`;

export const fontImport = css`
  @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;800&display=swap');
`;



export const s = {
  wrapper: css`
    background-color: #F8F5F2;
    min-height: 100vh;
    padding: 20px;
    font-family: 'Pretendard', sans-serif;
  `,

  container: css`
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,

  // 상단 헤더 영역
  headerCard: css`
    background: #FFFFFF;
    padding: 12px 30px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  `,

  logo: css`
    font-size: 22px;
    font-weight: 800;
    color: #C04122;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    .logo-box {
      background: #FF7043;
      width: 35px;
      height: 35px;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      font-size: 18px;
    }
  `,

  recipeSearch: css`
    flex: 1;
    background: #FFFFFF;
    border: 1px solid #FF704333;
    border-radius: 25px;
    padding: 10px 25px;
    font-size: 15px;
    outline: none;
  `,

  navGroup: css`
    display: flex;
    gap: 8px;
  `,

  // 대시보드 카드 그리드
  dashboardGrid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  `,

  summaryCard: css`
    background: #FFFFFF;
    border-radius: 35px;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);

    .info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .label {
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .count {
      font-size: 55px;
      font-weight: 800;
      color: #333;
      line-height: 0.8;
    }

    .icon-wrap {
      width: 65px;
      height: 65px;
      background: #FFF5F2;
      border-radius: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
    }
  `,

  pillBtn: (isPrimary) => css`
    background: ${isPrimary ? "#FF7043" : "#FCE9DD"};
    color: ${isPrimary ? "#FFFFFF" : "#C04122"};
    border: none;
    padding: 10px 22px;
    border-radius: 30px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    cursor: pointer;
  `,

  // 식재료 리스트 섹션
  listSection: css`
    background: #FFFFFF;
    border-radius: 40px;
    padding: 40px;
    min-height: 400px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  `,

  sectionTitle: css`
    font-size: 24px;
    font-weight: 800;
    color: #333;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 12px;

    .square {
      width: 14px;
      height: 14px;
      background: #FF7043;
      border-radius: 4px;
    }
  `,

  // 목록 내 검색창
  searchBarWrapper: css`
    position: relative;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
  `,

  innerSearchInput: css`
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #FF704344;
    border-radius: 20px;
    padding: 12px 20px 12px 45px;
    font-size: 14px;
    outline: none;
    transition: 0.2s;

    &::placeholder {
      color: #FF704388;
    }

    &:focus {
      border-color: #FF7043;
      box-shadow: 0 0 8px #FF704311;
    }
  `,

  searchIcon: css`
    position: absolute;
    left: 18px;
    color: #FF7043AA;
    font-size: 16px;
  `,

  // 식재료 그리드
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 25px;
  `,

  // 개별 음식 카드
  foodCard: css`
    background: #FFFFFF;
    border: 1px solid #F0F0F0;
    border-radius: 24px;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    transition: 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    min-height: 200px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(255, 111, 67, 0.2);

      .delete-target {
        opacity: 1;
        visibility: visible;
      }
    }

    img {
      width: 150px;
      height: 100px;
      object-fit: contain; /* 💡 사진 왜곡 방지 */
      margin-bottom: 15px;
    }

    .name {
      font-weight: 700;
      color: #333;
      font-size: 17px;
      margin-top: auto;
    }

    .badge {
      position: absolute;
      top: 15px;
      left: 15px;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 12px;
      z-index: 10;
    }
  `,

  deleteBtn: css`
    position: absolute;
    top: 12px;
    right: 12px;
    background: #FF3B30;
    color: #FFFFFF;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    transition: 0.2s;
    opacity: 0;
    visibility: hidden;

    &:hover {
      background: #D32F2F;
      transform: scale(1.1);
    }
  `,

  // 빈 상태 스타일
  emptyState: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    text-align: center;

    .refrigerator-img {
      width: 220px;
      height: auto;
      margin-bottom: 20px;
      animation: ${refrigeratorShake} 2s ease-in-out infinite;
    }

    .bubble {
      background: #FFFFFF;
      border: 2px solid #FF7043;
      border-radius: 20px;
      padding: 15px 25px;
      position: relative;
      margin-bottom: 30px;
      font-size: 18px;
      font-weight: 700;
      color: #333;
      box-shadow: 0 4px 15px rgba(255, 111, 67, 0.1);
    }

    .bubble::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 12px 12px 0;
      border-style: solid;
      border-color: #FF7043 transparent transparent;
    }
  `,

  // 플로팅 버튼 (FAB)
  fab: css`
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #FF8A65, #FF5722);
    color: #FFFFFF;
    padding: 16px 35px;
    border-radius: 40px;
    border: none;
    font-size: 18px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(255, 87, 34, 0.4);

    .circle {
      background: #FFFFFF;
      color: #FF5722;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
    
  `,
  
};