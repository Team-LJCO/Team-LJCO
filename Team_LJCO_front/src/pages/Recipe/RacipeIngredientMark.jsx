/** @jsxImportSource @emotion/react */
import dayjs from 'dayjs';

export default function RecipeIngredientMark({ ingredients }) {
    const { ingName, matchedIngId, createdAt, ingCatId, matchedColor } = ingredients;
    
    // ★★★ 색상 결정 로직 (10일 경과 체크 추가) ★★★
    const getColor = () => {
        // 1) 미보유: 'N' 유지
        if (!matchedIngId || !createdAt || matchedColor === "N") {
            return "N";
        }

        // 2) 양념류(17번): 항상 'G' (날짜 무관)
        if (ingCatId === 17) {
            return "G";
        }

        // 3) 신선식품: 날짜 체크
        const freshCategories = [1, 13, 9, 12, 15, 6, 2, 8, 3, 5];
        if (freshCategories.includes(ingCatId)) {
            const daysPassed = dayjs().diff(dayjs(createdAt), 'day');
            if (daysPassed >= 10) {
                return "R"; // 10일 이상: 빨강
            }
        }

        // 4) 기본: 'G'
        return "G";
    };

    const whatColor = getColor();

    // ✅ 모달의 파스텔톤 시스템과 100% 일치시킴
    const ingColor = {
        G: { background: "#E8F5E9", color: "#2E7D32", border: "#C8E6C9" }, // 보유 (연초록)
        R: { background: "#FFEBEE", color: "#C62828", border: "#FFCDD2" }, // 유통기한 임박/위험 (연빨강)
        N: { background: "#FAFAFA", color: "#BDBDBD", border: "#EEEEEE" }, // 미보유 (연회색)
    };

    const style = ingColor[whatColor] ?? ingColor.N;
    
    return (
        <span style={{
            ...style,
            backgroundColor: style.background,
            color: style.color,
            border: `1px solid ${style.border}`,
            padding: "4px 10px",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: "700",
            display: "inline-block",
            transition: "all 0.2s ease"
        }}>
            {ingName}
        </span>
    );
}
