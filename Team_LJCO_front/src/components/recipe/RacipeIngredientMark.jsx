export default function RecipeIngredientMark({ ingredients }) {
    const whatColor = ingredients.matchedColor;
    const isOwned = whatColor !== "N";

    const style = {
    // 1. 배경색: 보유 시 흰색, 미보유 시 부드러운 회색 (#EEEEEE)
    backgroundColor: isOwned ? "#ffffff" : "#eeeeee",
    
    // 2. 글자색: 요청하신 대로 미보유 시에도 검정색 계열(#333)로 또렷하게
    color: isOwned ? "#000000" : "#333333",

    // 3. 그림자: 💡 핵심! 이제 보유 여부와 상관없이 똑같은 입체감을 줍니다.
    boxShadow: "0 3px 1px rgba(0, 0, 0, 0.3)",

    // 4. 테두리: 미보유 시에도 형태가 잘 보이도록 조금 더 진한 회색(#999) 적용
    border: "1px solid",
    borderColor: isOwned ? "#666" : "#999",
};

    return (
        <span
            style={{
                ...style,
                padding: "3px 7px",
                borderRadius: "20px",
                fontSize: "12px",
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
                <span style={{
                    fontSize: "12px",
                    marginBottom: "1px",
                    color: "#34C759", // 💡 여기에 원하는 색상 코드를 넣으세요!
                    fontWeight: "bold" // 체크를 좀 더 또렷하게 보이게 하려면 추가
                }}>
                    ✔
                </span>
            )}
            {ingredients.ingName}
        </span>
    );
}   