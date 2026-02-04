/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import RecipeIngredientMark from "./RacipeIngredientMark";

const getLevelText = (level) => {
  if (level === 1) return "쉬움";
  if (level === 2) return "보통";
  return "어려움";
};

export default function RecipeCardContent({ recipe }) {
  const matchRate = Number(recipe.matchRate ?? 100);

  const getMatchRateStyle = (rate) => {
    if (rate === 100) {
      return {
        text: "지금 바로 도전 가능!",
        bg: "#C8E6C9",
        color: "#1B5E20"
      };
    } else if (rate >= 80) {
      return {
        text: "거의 만들 수 있어요",
        bg: "#FFF9C4",
        color: "#F57F17"
      };
    } else if (rate >= 50) {
      return {
        text: "조금만 더 있으면 돼요",
        bg: "#FFE0B2",
        color: "#E65100"
      };
    } else {
      return {
        text: "재료를 구매하셔야 해요!",
        bg: "#EEEEEE",
        color: "#757575"
      };
    }
  };

  const matchStyle = getMatchRateStyle(matchRate);

  // ★ 디버깅용 로그 추가
  console.log('🔍 RecipeCardContent - recipe:', recipe);
  console.log('🔍 ingredients:', recipe.ingredients);
  console.log('🔍 첫 번째 재료:', recipe.ingredients?.[0]);

  return (
    <div css={cardStyles}>
      <div className="image-container">
        <img
          src={recipe.rcpImgUrl}
          alt={recipe.rcpName}
          className="recipe-image"
        />
        
        <div
          className="match-badge"
          style={{
            background: matchStyle.bg,
            color: matchStyle.color,
          }}
        >
          <span className="badge-text">{matchStyle.text}</span>
          <span className="badge-percent">{matchRate}%</span>
        </div>
      </div>

      <div className="info-section">
        <h3 className="recipe-title">{recipe.rcpName}</h3>
        
        <div className="meta-info">
          <span className="level">난이도: {getLevelText(recipe.level)}</span>
          <span className="views">조회수: {recipe.rcpViewCount?.toLocaleString()}</span>
        </div>

        {/* ★ 재료 섹션 수정 */}
        {(recipe.ingredients || recipe.userIngredients) && (
          <div className="ingredients-section">
            <div className="ingredients-title">필요한 재료</div>
            <div className="ingredients-list">
              {(recipe.ingredients ?? recipe.userIngredients ?? []).map((ing, idx) => {
                // ★ 디버깅용 로그
                console.log(`🔍 재료 ${idx}:`, {
                  ingName: ing.ingName ?? ing,
                  matchedColor: ing.matchedColor,
                  matchedIngId: ing.matchedIngId,
                  createdAt: ing.createdAt,
                  ingCatId: ing.ingCatId
                });

                return (
                  <RecipeIngredientMark
                    key={idx}
                    ingredients={{
                      ingName: ing.ingName ?? ing,
                      matchedColor: ing.matchedColor || "N",
                      matchedIngId: ing.matchedIngId,        // ★ 필수!
                      createdAt: ing.createdAt,              // ★ 필수!
                      ingCatId: ing.ingCatId,                // ★ 필수!
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyles = css`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .recipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .match-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
  }

  .badge-text {
    font-size: 10px;
  }

  .badge-percent {
    font-weight: 800;
    font-size: 12px;
  }

  .info-section {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .recipe-title {
    font-size: 16px;
    font-weight: 700;
    color: #222;
    margin: 0;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .meta-info {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #666;
  }

  .level, .views {
    display: flex;
    align-items: center;
  }

  .ingredients-section {
    margin-top: auto;
  }

  .ingredients-title {
    font-size: 12px;
    font-weight: 600;
    color: #666;
    margin-bottom: 8px;
  }

  .ingredients-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
`;
