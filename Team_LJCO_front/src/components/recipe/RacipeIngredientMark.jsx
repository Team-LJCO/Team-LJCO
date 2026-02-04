/** @jsxImportSource @emotion/react */
import dayjs from 'dayjs';

export default function RecipeIngredientMark({ ingredients }) {
    const { ingName, matchedIngId, createdAt, ingCatId } = ingredients;

    // ★★★ 색상 결정 로직 (순서 중요!)
    const getIngredientColor = () => {
        // 1) 미보유 재료: 무조건 회색(N) - 최우선 체크!
        if (!matchedIngId || !createdAt) {
            return 'N';
        }

        // 2) 보유한 재료 중 양념/소스류(17번): 항상 초록(G)
        if (ingCatId === 17) {
            return 'G';
        }

        // 3) 신선식품 카테고리 목록
        const freshCategories = [
            1,   // 소고기
            13,  // 돼지고기
            9,   // 닭고기
            12,  // 해산물
            15,  // 육류
            6,   // 달걀/유제품
            2,   // 채소
            8,   // 과일
            3,   // 버섯
            5    // 가공식품류
        ];

        // 4) 보유한 신선식품만 날짜 체크
        if (freshCategories.includes(ingCatId)) {
            const daysPassed = dayjs().diff(dayjs(createdAt), 'day');

            // 10일 이상 경과: 빨강(R)
            if (daysPassed >= 10) {
                return 'R';
            }
        }

        // 5) 기본값: 초록(G) (10일 미만 or 기타 카테고리)
        return 'G';
    };

    const matchedColor = getIngredientColor();

    // 색상 매핑
    const colorMap = {
        G: {
            bg: '#E8F5E9',
            text: '#2E7D32',
            border: '#C8E6C9'
        },
        R: {
            bg: '#FFEBEE',
            text: '#C62828',
            border: '#FFCDD2'
        },
        N: {
            bg: '#FAFAFA',
            text: '#BDBDBD',
            border: '#EEEEEE'
        }
    };

    const colors = colorMap[matchedColor] || colorMap.N;

    return (
        <span
            style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                display: 'inline-block',
                margin: '2px'
            }}
        >
            {ingName}
        </span>
    );
}