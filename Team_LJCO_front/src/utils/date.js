/**
 * 날짜로부터 경과 일수 계산 및 상태 정보 반환
 */
export const getDaysInfo = (createDate) => {
  if (!createDate) {
    return { text: "오늘등록", color: "#FFFFFF", opacity: 1.0, isTrash: false };
  }

  // 1. 오늘 날짜의 시/분/초를 00:00:00으로 초기화
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 2. 비교 대상(등록일)의 시/분/초도 00:00:00으로 초기화
  const target = new Date(createDate);
  target.setHours(0, 0, 0, 0);

  // 3. 밀리초 단위 차이를 구한 뒤 '일(Day)' 단위로 환산
  const diffTime = today.getTime() - target.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 결과 처리
  if (days <= 0) {
    return { 
      text: "오늘등록", 
      color: "#29b4f5", 
      opacity: 1.0, 
      isTrash: false 
    };
  }

  const getColor = (d) => {
    if (d >= 365) return "#FF3B30"; // 1년 이상 빨간색
    if (d < 7) return "#34C759";    // 1주일 미만 초록색
    if (d <= 14) return "#FFD60A";  // 2주일 이하 노랑색
    if (d <= 29) return "#FF9F0A";  // 한달 이하 주황색
    return "#f57979";               // 그 외 분홍빛 회색
  };

  // 💡 투명도 계산 로직을 삭제하고 고정값 1.0을 반환하도록 수정했습니다.
  return {
    text: `D+${days}`,
    color: getColor(days),
    opacity: 1.0, // 흐려지지 않고 항상 선명하게 유지
    isTrash: days >= 365, 
  };
};