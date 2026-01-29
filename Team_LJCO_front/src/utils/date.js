/**
 * 날짜 관련 유틸리티
 */

/**
 * 날짜로부터 경과 일수 계산 및 상태 정보 반환
 * @param {string|Date} createDate - 생성 날짜
 * @returns {{text: string, color: string, opacity: number, isTrash: boolean}}
 */
export const getDaysInfo = (createDate) => {
  if (!createDate) {
    return { text: "D+0", color: "#34C759", opacity: 1.0, isTrash: false };
  }

  const days = Math.floor(
    (new Date() - new Date(createDate)) / (1000 * 60 * 60 * 24)
  );

  const getColor = (d) => {
    if (d < 7) return "#34C759";   // 초록색 - 신선
    if (d <= 14) return "#FFD60A"; // 노랑색 - 주의
    if (d <= 29) return "#FF9F0A"; // 주황색 - 경고
    return "#DBDBDB";              // 회색 - 폐기 필요
  };

  const getOpacity = (d) => {
    if (d >= 100) return 0.3;
    if (d >= 60) return 0.5;
    if (d >= 50) return 0.65;
    if (d >= 30) return 0.7;
    return 1.0;
  };

  return {
    text: `D+${days}`,
    color: getColor(days),
    opacity: getOpacity(days),
    isTrash: days >= 30,
  };
};

/**
 * 날짜 문자열 포맷팅 (YYYY-MM-DD)
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} 포맷된 날짜
 */
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return dateString.split("T")[0];
};
