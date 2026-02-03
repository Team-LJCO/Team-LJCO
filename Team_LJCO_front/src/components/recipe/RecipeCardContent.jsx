/** @jsxImportSource @emotion/react */
import RecipeIngredientMark from "../../pages/Recipe/RacipeIngredientMark";

// ✅ 1. 컴포넌트 외부에서 사용하는 헬퍼 함수들은 상단에 배치하는 것이 좋습니다.
/* 난이도 텍스트 반환 */
const getLevelText = (level) => {
  if (level === 1) return "쉬움";
  if (level === 2) return "보통";
  return "어려움";
};

/* 매치율 스타일 반환 */
const getMatchRateStyle = (rate) => {
  if (rate === 100) return { text: "지금 바로 도전 가능!", color: "#28a745" };
  if (rate >= 80) return { text: "거의 만들 수 있어요", color: "#FF9800" };
  if (rate >= 50) return { text: "조금만 더 있으면 돼요", color: "#FF7043" };
  return { text: "재료를 구매하셔야 해요!", color: "#999999" };
};

export default function RecipeCardContent({ recipe }) {
  // ✅ recipe.matchRate가 없으면 기본값 100 사용
  const matchRate = Number(recipe.matchRate ?? 100); 
  const matchStyle = getMatchRateStyle(matchRate);

  return (
    <div style={{ borderRadius: "30px", overflow: "hidden", height: "100%" }}>
      <div className="thumb" style={{ position: "relative" }}>
        <img 
          src={recipe.rcpImgUrl} 
          alt={recipe.rcpName} 
          style={{ width: "100%", height: "240px", objectFit: "cover" }} 
        />

        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            right: "15px",
            display: "flex",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <span
            style={{
              background: matchStyle.color,
              color: "white",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "800",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            {matchStyle.text}{"\u00A0\u00A0"}
            {matchRate}%
          </span>
        </div>
      </div>

      <div className="content" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px" }}>
          {recipe.rcpName}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#FF7043", fontSize: "15px", fontWeight: "800" }}>
            🔥 {getLevelText(recipe.level)}
          </span>

          <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#FF7043", fontSize: "15px", fontWeight: "700" }}>
            👁 {recipe.rcpViewCount?.toLocaleString() || 0}
          </span>
        </div>

        <div style={{ width: "100%", height: "1px", background: "#E0E0E0", margin: "15px 0" }} />

        <div className="ingredients">
          <div className="label" style={{ fontSize: "11px", color: "#999", marginBottom: "8px" }}>
            필요한 재료
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(recipe.ingredients ?? recipe.userIngredients ?? []).map((ing, idx) => (
              <RecipeIngredientMark
                key={idx}
                ingredients={{
                  ingName: ing.ingName ?? ing,
                  matchedColor: "G",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}