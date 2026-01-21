// 💡 민석님이 제공해주신 색상 로직을 공통 함수로 분리
export const getColorByDay = (day) => {
    if (day === null || day === undefined) return "#DBDBDB"; // 재료가 없는 경우 (회색)
    
    if (day <= 3) return "#34C759";  // D+0 ~ D+3: 매우 신선
    if (day <= 7) return "#FFD60A";  // D+4 ~ D+7: 사용 권장
    if (day <= 14) return "#FF9F0A"; // D+8 ~ D+14: 주의
    if (day <= 29) return "#FF3B30"; // D+15 ~ D+29: 위험
    return "#DBDBDB";                // D+30 이상: 폐기 권장
};