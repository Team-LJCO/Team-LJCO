/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { s } from "./styles";
import FinishRecipe from "./FinishRecipe";

export default function RecipeSearchModal({ recipe, onFinish, onAddMissing, onClose }) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof document !== "undefined" && document.body) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = originalStyle || "unset"; };
        }
    }, []);

    useEffect(() => {
        const fetchRecipeData = async () => {
            if (!recipe?.rcpId) return;
            setLoading(true);
            try {
                const stepRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/recipes/${recipe.rcpId}/steps`);
                setSteps(stepRes.data || []);
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
                <div className="recipe-body">
                    <button className="back-btn" onClick={onClose}>← 뒤로가기</button>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '20px' }}>{recipe?.rcpName}</h2>
                    <img src={recipe?.rcpImgUrl} alt="main" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '25px', marginBottom: '35px' }} />
                    <h3 style={{ fontSize: '24px', fontWeight: '900' }}>🍳 조리 순서</h3>
                    {loading ? <p>로딩 중...</p> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '20px' }}>
                            {steps.map((step) => (
                                <div key={step.stepId}>
                                    <div style={{ fontWeight: '900', color: '#ff7043' }}>STEP {step.stepNo}</div>
                                    {step.stepImgUrl && <img src={step.stepImgUrl} style={{ width: '100%', borderRadius: '20px', margin: '15px 0' }} alt="step" />}
                                    <p>{step.stepDesc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="recipe-sidebar">
                    {!loading && (
                        <FinishRecipe
                            ingredients={recipe?.userIngredients || recipe?.ingredients || recipe?.rcpIngredients || []} 
                            onFinish={onFinish}
                            onAddMissing={onAddMissing}
                            onClose={onClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
