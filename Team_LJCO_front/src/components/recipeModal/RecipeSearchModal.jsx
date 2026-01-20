/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { s } from "./styles"; // 스타일 파일 경로 확인 필수

function RecipeSearchModal({ recipe, onClose }) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeData = async () => {
            if (!recipe?.rcpId) return;
            setLoading(true);
            try {
                // 백엔드 컨트롤러에 추가한 /api/recipes/{rcpId}/steps 호출
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
                
                {/* 레시피 기본 정보 */}
                <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>{recipe?.rcpName}</h2>
                <div style={{ color: '#666', marginBottom: '30px' }}>난이도: {recipe?.level} | 조회수: {recipe?.rcpViewCount}</div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>정보를 불러오는 중...</div>
                ) : (
                    <div className="content-scroll">
                        {/* 조리 순서 렌더링 */}
                        <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>조리 순서</h3>
                        <div className="steps-list">
                            {steps.length > 0 ? steps.map((step) => (
                                <div key={step.stepId} className="step-item" style={{ marginBottom: '20px' }}>
                                    <div className="step-num" style={{ fontWeight: 'bold', color: '#ff7043' }}>STEP {step.stepNo}</div>
                                    <div className="step-desc">{step.stepDesc}</div>
                                    {step.stepImgUrl && (
                                        <div className="step-img" style={{ marginTop: '10px' }}>
                                            <img src={step.stepImgUrl} alt={`Step ${step.stepNo}`} style={{ maxWidth: '100%', borderRadius: '8px' }} />
                                        </div>
                                    )}
                                </div>
                            )) : <div>등록된 조리 순서가 없습니다.</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeSearchModal;