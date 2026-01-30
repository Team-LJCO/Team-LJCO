/**
 * 식재료의 생성일로부터 오늘까지 며칠이 지났는지 계산하고, 
 * 그에 맞는 디자인 속성(색상, 투명도 등)을 객체로 반환합니다.
 */
export const getIngredientStatus = (createDate) => {
  const diffDays = Math.floor((new Date() - new Date(createDate)) / 86400000);
  const text = `D+${diffDays}`;
  
  if (diffDays >= 30) {
    return { text, color: "#FF3B30", isTrash: true, opacity: 0.6 }; // 위험(빨강)
  } else if (diffDays >= 14) {
    return { text, color: "#FF9F0A", isTrash: false, opacity: 1.0 }; // 주의(주황)
  } else {
    return { text, color: "#34C759", isTrash: false, opacity: 1.0 }; // 신선(초록)
  }
};
