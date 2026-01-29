/** @jsxImportSource @emotion/react */
import RecipeIngredientMark from "../../pages/Recipe/RacipeIngredientMark";

/**
 * 매치율에 따른 안내 텍스트 반환
 */
const getMatchRateText = (rate) => {
  if (rate <= 0) return "재료를 구매하셔야 해요!";
  if (rate < 50) return "조금만 더 있으면 돼요";
  if (rate < 70) return "거의 만들 수 있어요";
  return "지금 바로 도전 가능!";
};

/**
 * 난이도 텍스트 반환
 */
const getLevelText = (level) => {
  if (level === 1) return "쉬움";
  if (level === 2) return "보통";
  if (level === 3) return "중급";
  return "어려움";
};

/**
 * 레시피 카드 컴포넌트
 */
function RecipeCard({ recipe }) {
  const matchRate = Number(recipe.matchRate ?? 0);

  return (
    <div style={{ borderRadius: "30px", overflow: "hidden" }}>
      {/* 썸네일 이미지 */}
      <div
        className="thumb"
        style={{
          position: "relative",
          width: "100%",
          height: "240px",
          margin: 0,
          borderRadius: "0",
        }}
      >
        <img
          src={recipe.rcpImgUrl}
          alt={recipe.rcpName}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* 상단 배지 */}
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
              background: "#FF7043",
              color: "white",
              padding: "6px 14px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "800",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {getMatchRateText(matchRate)}
            {"\u00A0\u00A0"}
            {matchRate}%
          </span>
          <span
            style={{
              background: "rgba(255, 112, 67, 0.9)",
              color: "white",
              padding: "6px 14px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "800",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {getLevelText(recipe.level)}
          </span>
        </div>
      </div>

      {/* 레시피 정보 */}
      <div style={{ padding: "20px 5px" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px" }}>
          {recipe.rcpName}
        </h3>
        <div
          className="meta"
          style={{
            display: "flex",
            gap: "15px",
            fontSize: "12px",
            color: "#FF7043",
            fontWeight: "700",
            marginBottom: "15px",
          }}
        >
          <span>👁️ {recipe.rcpViewCount?.toLocaleString()}</span>
          <span>⏱️ 15분</span>
          <span>👥 2인분</span>
        </div>

        {/* 재료 리스트 */}
        <div className="ingredients">
          <div
            className="label"
            style={{ fontSize: "11px", color: "#999", marginBottom: "8px" }}
          >
            필요한 재료
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {recipe.ingredients?.map((ingredients, idx) => (
              <RecipeIngredientMark key={idx} ingredients={ingredients} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
