/**
 * 날짜로부터 경과 일수 계산 및 상태 정보 반환
 * @param {string|Date} createDate - 생성 날짜
 * @returns {{text: string, bgColor: string, textColor: string, opacity: number, isTrash: boolean}}
 */
export const getDaysInfo = (createDate) => {
  if (!createDate) {
    // 기본값 (파스텔 초록 테마)
    return { text: "D+0", bgColor: "#E8F5E9", textColor: "#2E7D32", opacity: 1.0, isTrash: false };
  }

  const days = Math.floor(
    (new Date() - new Date(createDate)) / (1000 * 60 * 60 * 24)
  );

  // ✅ 레시피 페이지의 파스텔톤 시스템과 100% 일치시킨 색상 로직
  const getBadgeStyle = (d) => {
    if (d < 7) {
      return { bg: "#E8F5E9", text: "#2E7D32" }; // 연초록 (신선)
    }
    if (d <= 14) {
      return { bg: "#FFFDE7", text: "#FBC02D" }; // 연노랑 (주의)
    }
    if (d <= 29) {
      return { bg: "#FFF3E0", text: "#EF6C00" }; // 연주황 (경고)
    }
    return { bg: "#F5F5F5", text: "#9E9E9E" };   // 연회색 (폐기 필요)
  };

  const getOpacity = (d) => {
    if (d >= 100) return 0.3;
    if (d >= 60) return 0.5;
    if (d >= 50) return 0.65;
    if (d >= 30) return 0.7;
    return 1.0;
  };

  const style = getBadgeStyle(days);

  return {
    text: `D+${days}`,
    bgColor: style.bg,    // ✅ Home.jsx에서 사용할 배경색
    textColor: style.text, // ✅ Home.jsx에서 사용할 글자색
    opacity: getOpacity(days),
    isTrash: days >= 30,
  };
};