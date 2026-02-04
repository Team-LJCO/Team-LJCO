/** @jsxImportSource @emotion/react */
import RecipeCardContent from "../../recipe/RecipeCardContent";
import { s as recipeS } from "../../../pages/Recipe/styles"; 

export default function CookableRecipesModal({
  recipes = [],
  onClose,
  onSelectRecipe,
  onFinish,        // ✅ 추가
  onAddMissing,    // ✅ 추가
}) {
  const handleSelect = (recipe) => {
    // ✅ 레시피 선택 시 핸들러들도 함께 전달
    onSelectRecipe?.(recipe);
    onClose?.();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          width: "min(1400px, 98vw)",
          height: "90vh",            
          display: "flex",           
          flexDirection: "column",
          padding: 16,
          borderRadius: 20
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>요리 가능 레시피</div>
          <button 
            onClick={onClose}
            style={{
              border: "none",
              background: "#ff7043",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: 9999,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            닫기
          </button>
        </div>

        <hr />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {recipes.length === 0 ? (
            <div>요리 가능한 레시피가 없습니다</div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                alignItems: "stretch",
              }}
            >
              {recipes.map((r, idx) => (
                <div
                  key={r?.rcpId ?? idx}
                  css={recipeS.recipeCard}
                  onClick={() => handleSelect(r)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <RecipeCardContent
                    recipe={{
                      rcpId: r.rcpId,
                      rcpName: r.rcpName,
                      rcpImgUrl: r.rcpImgUrl,
                      rcpViewCount: r.rcpViewCount,
                      level: r.level,
                      userIngredients: r.userIngredients,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
