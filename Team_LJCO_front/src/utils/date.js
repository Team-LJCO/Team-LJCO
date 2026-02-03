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
    return "#da7c7c";               // 그 외 분홍빛 회색
  };

  // 💡 투명도 계산 로직 수정
  const calculateOpacity = (d) => {
    if (d <= 20) return 0.8;       // 20일까지는 선명하게
    if (d <= 30) return 0.7;       // 20일까지는 선명하게
    if (d >= 40) return 0.65;       // 40일 이상은 최소 투명도 유지
    
    // 21일부터 39일까지 하루에 약 0.035씩 투명도 감소
    // 공식: 1.0 - ((현재일수 - 시작일수) * (감소폭 / 구간길이))
    const ratio = (d - 20) / (40 - 20); 
    return parseFloat((1.0 - (ratio * 0.7)).toFixed(2)); 
  };

  return {
    text: `D+${days}`,
    color: getColor(days),
    opacity: calculateOpacity(days), // 서서히 흐려지는 투명도 적용
    isTrash: days >= 365, 
  };
};