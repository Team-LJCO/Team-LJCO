export default function RecipeIngredientMark({ ingredients }) {
    const whatColor = ingredients.matchedColor;
    const isOwned = whatColor !== "N";

    const style = {
        // 1. 배경색: 투명감 없는 단단한 연두색
        backgroundColor: isOwned ? "#ffffff" : "#E2E2E2",
        color: isOwned ? "#000000" : "#777777",

        // 2. 그림자: 이미지처럼 퍼지지 않고 아래로 착 붙는 느낌 (v-offset: 3px, blur: 1px)
        boxShadow: isOwned ? "0 3px 1px rgba(0, 0, 0, 0.3)" : "none",

        // 3. 테두리: 이미지 특유의 얇고 진한 선
        border: "1px solid",
        borderColor: isOwned ? "#666" : "#BBB",
    };

    return (
        <span
            style={{
                ...style,
                padding: "6px 15px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "600",
                display: "inline-flex", // 체크와 글자를 나란히 배치
                alignItems: "center",
                gap: "1px",             // 체크와 글자 사이 간격
                margin: "1px",
                cursor: "default",
            }}
        >
            {/* ✅ 보유 중일 때만 체크 표시 추가 */}
            {isOwned && (
                <span style={{ fontSize: "12px", marginBottom: "1px" }}>
                    ✔
                </span>
            )}
            {ingredients.ingName}
        </span>
    );
}   