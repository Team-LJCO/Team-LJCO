/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { s } from "./styles";

function RecipeSearchModal({ recipe, onClose }) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    // 매치율 관련 로직
    const matchRate = Number(recipe?.matchRate ?? 0);
    
    const getMatchRateText = (rate) => {
        if (rate <= 0) return '재료를 구매하셔야 해요!';
        if (rate < 50) return '조금만 더 있으면 돼요';
        if (rate < 70) return '거의 만들 수 있어요';
        return '지금 바로 도전 가능!';
    };

    const getMatchIcon = (rate) => {
        if (rate < 70) return '🛒';
        return '🍳';
    };

    useEffect(() => {
        const fetchRecipeData = async () => {
            if (!recipe?.rcpId) return;
            setLoading(true);
            try {
                const stepRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipe.rcpId}/steps`);
                setSteps(stepRes.data);
            } catch (err) {
                console.error("데이터 로드 실패", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeData();
    }, [recipe?.rcpId]);

    return (
        <div css={s.detailOverlay} onClick={onClose}>
            <div css={s.detailContent} onClick={(e) => e.stopPropagation()}>
                <button className="back-btn" onClick={onClose}>← 검색 결과로 돌아가기</button>
                
                {/* 1. Header: 이름 및 정보 */}
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px' }}>{recipe?.rcpName}</h2>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '15px', color: '#ff7043', fontWeight: '700', fontSize: '15px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                🔥 {recipe?.level === 1 ? '쉬움' : recipe?.level === 2 ? '보통' : '어려움'}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                👁️ {recipe?.rcpViewCount?.toLocaleString()}
                            </span>
                        </div>

                        <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#FF7043', 
                            fontWeight: '800', 
                            fontSize: '15px'
                        }}>
                            <span>{getMatchIcon(matchRate)}</span>
                            <span>{getMatchRateText(matchRate)} ({matchRate}%)</span>
                        </div>
                    </div>
                </div>

                {/* 2. 이미지 & 재료 섹션 */}
                <div style={{ background: '#f8f8f8', borderRadius: '30px', padding: '25px', marginBottom: '35px' }}>
                    <div style={{ width: '100%', height: '300px', borderRadius: '20px', overflow: 'hidden', marginBottom: '25px' }}>
                        <img src={recipe?.rcpImgUrl} alt="main" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px', color: '#555' }}>필요한 재료</h3>
                    
                    {/* ✅ 재료 버튼 그리드 시작 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {recipe.ingredients?.map((ing, idx) => {
                            // "N"이 아니면 보유 중인 것으로 간주
                            const isOwned = ing.matchedColor !== "N";

                            return (
                                <span 
                                    key={idx} 
                                    style={{
                                        // 1. 배경 & 글자색: 보유 중일 땐 화이트, 아닐 땐 연회색
                                        backgroundColor: isOwned ? "#ffffff" : "#E2E2E2",
                                        color: isOwned ? "#000000" : "#777777",

                                        // 2. 그림자: 입체적인 단단한 그림자
                                        boxShadow: isOwned ? "0 3px 1px rgba(0, 0, 0, 0.3)" : "none",

                                        // 3. 테두리: 얇고 선명한 선
                                        border: "1px solid",
                                        borderColor: isOwned ? "#666" : "#BBB",

                                        // 4. 형태 스타일
                                        padding: "6px 15px",
                                        borderRadius: "20px",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        margin: "2px",
                                        cursor: "default",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    {/* ✅ 보유 중일 때만 체크 표시 아이콘 */}
                                    {isOwned && (
                                        <span style={{ fontSize: "12px", color: "#000000" }}>
                                            ✔
                                        </span>
                                    )}
                                    {ing.ingName} {ing.rcpIngAmt && `(${ing.rcpIngAmt})`}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* 3. 조리 순서 섹션 */}
                <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '25px' }}>🍳 조리 순서</h3>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#888' }}>레시피 정보를 불러오는 중입니다...</div>
                ) : (
                    <div className="steps-list" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {steps.map((step) => (
                            <div key={step.stepId} className="step-item">
                                <div style={{ fontSize: '14px', fontWeight: '900', color: '#ff7043', marginBottom: '10px' }}>STEP {step.stepNo}</div>
                                {step.stepImgUrl && (
                                    <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '15px' }}>
                                        <img src={step.stepImgUrl} alt="step" style={{ width: '100%', display: 'block' }} />
                                    </div>
                                )}
                                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#333', wordBreak: 'keep-all' }}>{step.stepDesc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeSearchModal;