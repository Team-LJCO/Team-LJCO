/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Global } from "@emotion/react"; 
import { fontImport, s as commonS } from "../Home/styles"; 
import { s as recipeS } from "./styles"; 
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";
import { useNavigate, useLocation } from "react-router-dom"; // 💡 useLocation 추가

function Recipe() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogin] = useState(!!localStorage.getItem("accessToken")); // 대소문자 주의: accessToken
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // 💡 페이지 상태 추가
    const [hasMore, setHasMore] = useState(true); // 💡 더 불러올 데이터가 있는지 확인

    const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    

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
   // Recipe.jsx 내부의 useEffect를 이 내용으로 교체하세요.
useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keywordParam = params.get("keyword");
    
    const fetchRecipes = async () => {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        
        try {
            // 💡 검색어가 있으면 search API, 없으면 기본 목록 API 호출
            const url = keywordParam 
                ? `http://localhost:8080/api/recipes/search` 
                : `http://localhost:8080/api/recipes`;

            const res = await axios.get(url, {
                // 💡 검색어가 없을 때는 keyword를 보내지 않도록 설정
                params: { 
                    page: page, 
                    userId: 0, 
                    keyword: keywordParam || undefined 
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // 💡 페이지가 1이면(검색이나 첫 진입) 리스트를 새로 만들고, 
            // 💡 페이지가 2 이상(무한 스크롤)이면 기존 리스트에 추가합니다.
            setRecipes(prev => page === 1 ? res.data : [...prev, ...res.data]);
            
            // 데이터가 10개 미만이면 더 이상 가져올 데이터가 없다고 판단
            if (res.data.length < 10) setHasMore(false);
            
            // 입력창에 현재 검색어 표시 (없으면 빈 칸)
            if (keywordParam) setRecipeSearchTerm(keywordParam);

        } catch (err) {
            console.error("데이터 로딩 실패:", err);
        } finally {
            setLoading(false);
        }
    };

    fetchRecipes();
}, [page, location.search]); // ✅ 페이지 번호나 주소(검색어)가 바뀔 때마다 실행

    const handleRecipeSearch = async () => {
    if (!recipeSearchTerm.trim()) return;
    
    setLoading(true);
    setPage(1); // 검색 시 페이지 초기화
    const token = localStorage.getItem("accessToken");
    
    try {
        // 💡 모달을 여는 대신, 검색 API를 직접 호출해서 목록을 갈아끼웁니다.
        const res = await axios.get(`http://localhost:8080/api/recipes/search`, {
            params: { 
                page: 1, 
                userId: 0, 
                keyword: recipeSearchTerm 
            },
            headers: { Authorization: `Bearer ${token}` }
        });
        
        setRecipes(res.data); // 💡 기존 목록을 지우고 검색 결과로 덮어씌움
        setHasMore(false);    // 검색 결과에서는 무한 스크롤을 일단 끔 (필요 시 로직 추가)
    } catch (err) {
        console.error("검색 실패:", err);
    } finally {
        setLoading(false);
    }
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
                            const isLast = recipes.length === index + 1;
                            return (
                                <div 
                                    ref={isLast ? lastRecipeElementRef : null} 
                                    key={`${recipe.rcpId}-${index}`} // 💡 중복 키 에러 방지를 위해 index 조합
                                    css={recipeS.recipeCard}
                                    onClick={() => {
                                        // 💡 카드를 클릭했을 때만 모달이 뜨게 합니다.
                                        setSelectedRecipe(recipe); 
                                        setIsRecipeModalOpen(true);
                                    }}
                                    style={{ cursor: 'pointer' }} // 클릭 가능하다는 시각적 표시
                                >
                                    <RecipeCardContent recipe={recipe} />
                                </div>
                            );
                        })}
                        {loading && <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '20px'}}>추가 레시피 로딩 중...</div>}
                    </div>
                </div>

                {isRecipeModalOpen && <RecipeSearchModal 
        recipe={selectedRecipe} // 💡 검색어가 아니라 선택된 '레시피 객체'를 넘김
        onClose={() => {
            setIsRecipeModalOpen(false);
            setSelectedRecipe(null);
        }} 
    />}
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
