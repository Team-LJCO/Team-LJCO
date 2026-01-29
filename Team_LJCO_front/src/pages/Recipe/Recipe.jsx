/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "@emotion/react"; 
import { fontImport, s as commonS } from "../Home/styles"; 
import { s as recipeS } from "./styles"; 
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";
import { useNavigate, useLocation } from "react-router-dom"; 
import Pagination from "../../components/common/Pagination";
import RecipeIngredientMark from "./RacipeIngredientMark";

function Recipe() {
    const navigate = useNavigate();
    const location = useLocation();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("VIEW_DESC");

    const [isLogin] = useState(!!localStorage.getItem("accessToken")); 
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const urlPage = Number(urlParams.get("page") ?? 1);
        const urlKeyword = urlParams.get("keyword");
        const urlSort = urlParams.get("sort") ?? "VIEW_DESC";
        setSort(urlSort);
        setPage(urlPage);
        
        const fetchRecipes = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            const currentUserId = localStorage.getItem("userId") || 32;

            try {
                const url = `http://localhost:8080/api/recipes`;
                const res = await axios.get(url, {
                    params: { 
                        page: urlPage, 
                        userId: currentUserId, 
                        keyword: urlKeyword || undefined,
                        sort: urlSort,
                    },
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = res.data;
                setRecipes(Array.isArray(data.recipes) ? data.recipes : []);
                setTotalPages(typeof data.totalPages === "number" ? data.totalPages : 0);

            } catch (err) {
                console.error("데이터 로딩 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [location.search]);

    const handleSort = (sort) => {
        const params = new URLSearchParams(location.search);
        params.set("sort", sort);
        params.set("page", "1");
        setPage(1);
        navigate(`/recipe?${params.toString()}`);
    }

    const handleRecipeSearch = () => {
        if (!recipeSearchTerm.trim()) return;
        const params = new URLSearchParams(location.search);
        params.set("keyword", recipeSearchTerm);
        params.set("sort", sort);
        params.set("page", "1");
        navigate(`/recipe?${params.toString()}`);
    };

    return (
        <>
            <Global styles={fontImport} /> 
            <div css={commonS.wrapper}>
                <div css={commonS.container}>
                    {/* 1. 헤더 카드 (검색창, 로고, 메뉴) */}
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
                        
                        {/* 기존 정렬 버튼 있던 곳 -> 삭제됨 */}
                        
                        <div css={commonS.navGroup}>
                            <button css={commonS.pillBtn(false)} onClick={() => navigate("/home")}>🏠 식재료</button>
                            <button css={commonS.pillBtn(true)} onClick={() => navigate("/recipe")}>📖 레시피</button>
                            <button css={commonS.pillBtn(false)} onClick={() => navigate("/login")}>
                                👤 {isLogin ? "로그아웃" : "로그인"}
                            </button>
                        </div>
                    </div>

                    {/* 2. 메인 배너 */}
                    <div css={recipeS.banner}>
                        <div className="tag">🔥 오늘의 추천</div>
                        <h2>냉장고 재료로 만드는<br/>특별한 요리</h2>
                    </div>

                    {/* 3. 정렬 버튼 (배너 아래로 이동됨) */}
                    <div css={recipeS.controlBar}>
                        <button css={recipeS.sortBtn(sort === "VIEW_DESC")} onClick={() => handleSort("VIEW_DESC")}>
                            👁️ 조회수순
                        </button>
                        <button css={recipeS.sortBtn(sort === "LEVEL_DESC")} onClick={() => handleSort("LEVEL_DESC")}>
                            🔥 난이도순
                        </button>
                        <button css={recipeS.sortBtn(sort === "MATCHRATE_DESC")} onClick={() => handleSort("MATCHRATE_DESC")}>
                            🛒 매치율순
                        </button>
                    </div>

                    {/* 4. 레시피 그리드 */}
                    <div css={recipeS.recipeGrid}>
                        {recipes.map((recipe, index) => (
                            <div 
                                key={`${recipe.rcpId}-${index}`} 
                                css={recipeS.recipeCard}
                                onClick={() => {
                                    setSelectedRecipe(recipe); 
                                    setIsRecipeModalOpen(true);
                                }}
                                style={{ cursor: 'pointer' }} 
                            >
                                <RecipeCardContent recipe={recipe} />
                            </div>
                        ))}
                        {loading && <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '20px'}}>
                        추가 레시피 로딩 중...</div>}
                    </div>

                    {/* 5. 페이지네이션 */}
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onChange={(p) => {
                            const params = new URLSearchParams(location.search);
                            params.set("page", String(p));
                            navigate(`/recipe?${params.toString()}`);
                        }}
                    />
                </div>

                {/* 6. 모달 */}
                {isRecipeModalOpen && (
                    <RecipeSearchModal 
                        recipe={selectedRecipe} 
                        onClose={() => {
                            setIsRecipeModalOpen(false);
                            setSelectedRecipe(null);
                        }} 
                    />
                )}
            </div>
        </>
    );
}

function RecipeCardContent({ recipe }) {
    const matchRate = Number(recipe.matchRate ?? 0);

    const getMatchRateText = (rate) => {
        if(rate <= 0) return '재료를 구매하셔야 해요!';
        if(rate < 50) return '조금만 더 있으면 돼요';
        if(rate < 70) return '거의 만들 수 있어요';
        return '지금 바로 도전 가능!';
    };

    const getLevelText = (level) => {
        if (level === 1) return '쉬움';
        if (level === 2) return '보통';
        if (level === 3) return '어려움';
        return '미정';
    };

    return (
        <div style={{ borderRadius: '30px', overflow: 'hidden', height: '100%' }}>
            <div className="thumb">
                <img 
                    src={recipe.rcpImgUrl} 
                    alt={recipe.rcpName} 
                />
                
                <div style={{ 
                    position: 'absolute', 
                    top: '15px', 
                    left: '15px', 
                    right: '15px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    zIndex: 10
                }}>
                    <span style={{ 
                        background: '#FF7043', 
                        color: 'white', 
                        padding: '6px 14px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: '800',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}>
                        {getMatchRateText(matchRate)}{'\u00A0\u00A0'}{matchRate}%
                    </span>
                </div>
            </div>

            <div className="content">
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>
                    {recipe.rcpName}
                </h3>
                
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px', 
                    marginBottom: '15px' 
                }}>
                    <span style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        color: '#FF7043', 
                        fontSize: '15px', 
                        fontWeight: '800' 
                    }}>
                        🔥 {getLevelText(recipe.level)}
                    </span>

                    <span style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        color: '#FF7043', 
                        fontSize: '15px', 
                        fontWeight: '700' 
                    }}>
                        👁 {recipe.rcpViewCount?.toLocaleString() || 0}
                    </span>
                </div>

                <div style={{ 
                    width: '100%', 
                    height: '1px', 
                    background: '#E0E0E0', 
                    margin: '15px 0' 
                }}></div>

                <div className="ingredients">
                    <div className="label" style={{ fontSize: '11px', color: '#999', marginBottom: '8px' }}>
                        필요한 재료
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {recipe.ingredients?.map((ingredients, idx) => (
                            <RecipeIngredientMark key={idx} ingredients={ingredients} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recipe;