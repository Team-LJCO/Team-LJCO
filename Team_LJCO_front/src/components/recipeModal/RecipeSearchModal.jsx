/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { s } from "./styles";
import { getColorByDay } from "../../utils/colorUtils";

function RecipeSearchModal({ recipe, onClose }) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeData = async () => {
            if (!recipe?.rcpId) return;
            setLoading(true);
            try {
                const stepRes = await axios.get(`http://localhost:8080/api/recipes/${recipe.rcpId}/steps`);
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
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '8px' }}>{recipe?.rcpName}</h2>
                    <div style={{ display: 'flex', gap: '15px', color: '#ff7043', fontWeight: '700', fontSize: '14px' }}>
                        <span>🔥 {recipe?.level === 1 ? '쉬움' : '보통'}</span>
                        <span>👁️ {recipe?.rcpViewCount?.toLocaleString()}</span>
                    </div>
                </div>

                {/* 2. 통합 정보 박스 (Visual + Info + Ingredients) */}
                <div style={{ background: '#f8f8f8', borderRadius: '30px', padding: '25px', marginBottom: '35px' }}>
                    <div style={{ width: '100%', height: '250px', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
                        <img src={recipe?.rcpImgUrl} alt="main" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px', fontSize: '14px', color: '#666', fontWeight: '600' }}>
                        <span>⏱️ 15분</span>
                        <span>👥 2인분</span>
                        <span>📂 메인요리</span>
                    </div>
                    <hr style={{ border: '0', borderTop: '1px solid #e0e0e0', marginBottom: '20px' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px', color: '#555' }}>필요한 재료</h3>
                    {/* Ingredients (신선도 색상 적용) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {recipe.ingredients?.map((ing, idx) => {
                            // 💡 대소문자 및 언더바 이슈 방지를 위해 모두 체크
                            const hasIngredient = ing.hasIng === true || ing.hasIng === 1 || ing.has_ing === 1;
                            const dDayValue = (ing.dDay !== undefined && ing.dDay !== null) ? ing.dDay : ing.dday;

                            const bgColor = hasIngredient ? getColorByDay(dDayValue) : "#F0F0F0";
                            // ⚠️ 아래 color와 border 부분에서 hasIng를 hasIngredient로 수정했습니다!
                            const textColor = hasIngredient ? "#000" : "#999";

                            return (
                                <span key={idx} style={{
                                    backgroundColor: bgColor,
                                    color: textColor, // 💡 수정완료
                                    padding: '7px 14px', 
                                    borderRadius: '12px', 
                                    fontSize: '13px', 
                                    fontWeight: '700',
                                    border: hasIngredient ? 'none' : '1px solid #e0e0e0' // 💡 수정완료
                                }}>
                                    {ing.ingName} {ing.rcpIngAmt && `(${ing.rcpIngAmt})`}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* 3. 고도화된 조리 순서 섹션 */}
                <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '25px' }}>🍳 조리 순서</h3>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '30px' }}>로딩 중...</div>
                ) : (
                    <div className="steps-list" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {steps.map((step) => (
                            <div key={step.stepId} className="step-item">
                                <div style={{ fontSize: '13px', fontWeight: '900', color: '#ff7043', marginBottom: '8px' }}>STEP {step.stepNo}</div>
                                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#444', marginBottom: '15px' }}>{step.stepDesc}</p>
                                {step.stepImgUrl && (
                                    <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                        <img src={step.stepImgUrl} alt="step" style={{ width: '100%' }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeSearchModal;