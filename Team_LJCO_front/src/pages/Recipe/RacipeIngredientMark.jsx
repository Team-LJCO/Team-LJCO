export default function RecipeIngredientMark({ingredients}) {
    const whatColor = ingredients.matchedColor;

    // ✅ 모달의 파스텔톤 시스템과 100% 일치시킴
    const ingColor = {
        G : { background: "#E8F5E9", color: "#2E7D32", border: "#C8E6C9" }, // 보유 (연초록)
        R : { background: "#FFEBEE", color: "#C62828", border: "#FFCDD2" }, // 유통기한 임박/위험 (연빨강)
        N : { background: "#FAFAFA", color: "#BDBDBD", border: "#EEEEEE" }, // 미보유 (연회색)
    };

    const style = ingColor[whatColor] ?? ingColor.N;
    
    return (
        <span style={{
            ...style,
            backgroundColor: style.background,
            color: style.color,
            border: `1px solid ${style.border}`, // 테두리 추가로 선명도 향상
            padding: "4px 10px",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: "700", // 글자 가독성을 위해 두께 추가
            display: "inline-block",
            transition: "all 0.2s ease"
        }}>
            {ingredients.ingName}
        </span>
    );
}