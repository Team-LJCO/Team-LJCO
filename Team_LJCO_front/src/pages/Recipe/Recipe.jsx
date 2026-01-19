/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Global } from "@emotion/react"; 
import { fontImport, s as commonS } from "../Home/styles"; 
import { s as recipeS } from "./styles"; 
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";

function Recipe() {
    const navigate = useNavigate();
    const [isLogin] = useState(!!localStorage.getItem("accessToken")); // 대소문자 주의: accessToken
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // 💡 페이지 상태 추가
    const [hasMore, setHasMore] = useState(true); // 💡 더 불러올 데이터가 있는지 확인

    const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

    // 💡 무한 스크롤 관찰을 위한 Ref
    const observer = useRef();
    const lastRecipeElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1); // 바닥에 닿으면 페이지 증가
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // 💡 데이터 페칭 로직 수정
    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            try {
                const res = await axios.get(`http://localhost:8080/api/recipes`, {
                    params: { page: page, userId: 0 }, // 페이지 번호 전달
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // 💡 핵심: 기존 데이터에 새 데이터를 합쳐야 함 (concat)
                setRecipes(prev => [...prev, ...res.data]);
                
                // 불러온 데이터가 10개 미만이면 더 이상 데이터가 없는 것으로 판단
                if (res.data.length < 10) {
                    setHasMore(false);
                }
            } catch (err) {
                console.error("레시피 로딩 실패:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [page]); // 💡 페이지가 바뀔 때마다 실행

    const handleRecipeSearch = () => {
        if (!recipeSearchTerm.trim()) return;
        setIsRecipeModalOpen(true);
    };

    return (
        <>
            <Global styles={fontImport} /> 
            <div css={commonS.wrapper}>
                <div css={commonS.container}>
                    {/* 상단 헤더 (변화 없음) */}
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

                    <div css={recipeS.recipeGrid}>
                        {recipes.map((recipe, index) => {
                            // 💡 마지막 요소에 Ref를 달아줍니다.
                            if (recipes.length === index + 1) {
                                return (
                                    <div ref={lastRecipeElementRef} key={recipe.rcpId} css={recipeS.recipeCard}>
                                        <RecipeCardContent recipe={recipe} />
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={recipe.rcpId} css={recipeS.recipeCard}>
                                        <RecipeCardContent recipe={recipe} />
                                    </div>
                                );
                            }
                        })}
                        {loading && <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '20px'}}>추가 레시피 로딩 중...</div>}
                    </div>
                </div>

                {isRecipeModalOpen && <RecipeSearchModal keyword={recipeSearchTerm} onClose={() => setIsRecipeModalOpen(false)} />}
            </div>
        </>
    );
}

// 💡 반복되는 카드 내용을 별도 컴포넌트로 분리
function RecipeCardContent({ recipe }) {
    return (
        <>
            <div className="stats">
                <span className="match">일치율 {recipe.matchRate || 0}%</span>
                <span className="level">난이도 {recipe.level}</span>
            </div>
            <div className="thumb">
                <img src={recipe.rcpImgUrl} alt={recipe.rcpName} onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }} />
            </div>
            <h3>{recipe.rcpName}</h3>
            <div className="meta">
                <span>⏰ {recipe.cookingTime || '15분'}</span>
                <span>👥 {recipe.servings || '2인분'}</span>
            </div>
            <div className="ingredients">
                <div className="label">필요한 재료</div>
                {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
                    <span key={idx} className="ing">
                        {typeof ing === 'object' ? ing.ingName : ing}
                    </span>
                ))}
            </div>
        </>
    );
}

export default Recipe;