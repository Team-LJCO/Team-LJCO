/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Global } from "@emotion/react"; 
import { fontImport, s as commonS } from "../Home/styles"; 
import { s as recipeS } from "./styles"; 
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";

function Recipe() {
    const navigate = useNavigate();
    const [isLogin] = useState(!!localStorage.getItem("AccessToken"));
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

    // 💡 데이터베이스 정보 호출
    useEffect(() => {
        const fetchRecipes = async () => {
            const token = localStorage.getItem("AccessToken");
            try {
                // 추천 레시피 API 호출 (백엔드의 rcp 테이블 데이터)
                const res = await axios.get("http://localhost:8080/api/recipes", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecipes(res.data);
            } catch (err) {
                console.error("레시피 로딩 실패:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    const handleRecipeSearch = () => {
        if (!recipeSearchTerm.trim()) return;
        setIsRecipeModalOpen(true);
    };

    return (
        <>
            <Global styles={fontImport} /> 
            <div css={commonS.wrapper}>
                <div css={commonS.container}>
                    {/* 상단 헤더 */}
                    <div css={commonS.headerCard}>
                        <div css={commonS.logo} onClick={() => navigate("/home")}>
                            <div className="logo-box">🧊</div> 냉장고 파먹기
                        </div>
                        
                        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input 
                                css={commonS.recipeSearch} 
                                style={{ flex: 1 }}
                                placeholder="오늘은 뭐 해먹지?" 
                                value={recipeSearchTerm}
                                onChange={(e) => setRecipeSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleRecipeSearch()}
                            />
                        </div>

                        <div css={commonS.navGroup}>
                            <button css={commonS.pillBtn(false)} onClick={() => navigate("/home")}>🏠 식재료</button>
                            <button css={commonS.pillBtn(true)} onClick={() => navigate("/recipe")}>📖 레시피</button>
                            <button css={commonS.pillBtn(false)} onClick={() => navigate("/login")}>
                                👤 {isLogin ? "로그아웃" : "로그인"}
                            </button>
                        </div>
                    </div>

                    <div css={recipeS.banner}>
                        <div className="tag">🔥 오늘의 추천</div>
                        <h2>냉장고 재료로 만드는<br/>특별한 요리</h2>
                    </div>

                    {/* 레시피 그리드: DB 테이블 컬럼명 매칭 */}
                    <div css={recipeS.recipeGrid}>
                        {loading ? (
                            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '100px', color: '#999'}}>레시피를 찾는 중...</div>
                        ) : (
                            recipes.map(recipe => (
                                <div key={recipe.rcpId} css={recipeS.recipeCard}>
                                    <div className="stats">
                                        {/* DB의 matchRate와 level 사용 */}
                                        <span className="match">일치율 {recipe.matchRate}%</span>
                                        <span className="level">난이도 {recipe.level}</span>
                                    </div>
                                    <div className="thumb">
                                        <img 
                                            src={recipe.rcpImgUrl} 
                                            alt={recipe.rcpName}
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
                                        />
                                    </div>
                                    <h3>{recipe.rcpName}</h3>
                                    
                                    <div className="meta">
                                        <span>⏰ {recipe.cookingTime || '15분'}</span>
                                        <span>👥 {recipe.servings || '2인분'}</span>
                                    </div>

                                    {/* 💡 재료 목록 (에러 방지를 위해 문자열 속성 추출) */}
                                    <div className="ingredients">
                                        <div className="label">필요한 재료</div>
                                        {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
                                            <span key={idx} className="ing">
                                                {/* ing가 객체 {ingName: '...'}라면 ingName을 출력 */}
                                                {typeof ing === 'object' ? ing.ingName : ing}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {isRecipeModalOpen && (
                    <RecipeSearchModal 
                        keyword={recipeSearchTerm} 
                        onClose={() => setIsRecipeModalOpen(false)} 
                    />
                )}
            </div>
        </>
    );
}

export default Recipe;