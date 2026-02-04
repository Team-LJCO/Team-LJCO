/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "@emotion/react"; 
import { useQueryClient } from "@tanstack/react-query";
import { fontImport, s as commonS } from "../Home/styles"; 
import { s as recipeS } from "./styles"; 
import RecipeSearchModal from "../../components/recipe/RecipeSearchModal";
import { useNavigate, useLocation } from "react-router-dom"; 
import Pagination from "../../components/common/Pagination";
import RecipeIngredientMark from "../../components/recipe/RacipeIngredientMark";

// ==================== 헬퍼 함수 ====================

const getLevelText = (level) => {
    if (level === 1) return "쉬움";
    if (level === 2) return "보통";
    return "어려움";
};

const getMatchRateStyle = (rate) => {
    if (rate === 100) return { text: "지금 바로 도전 가능!", color: "#28a745" };
    if (rate >= 80) return { text: "거의 만들 수 있어요", color: "#FF9800" };
    if (rate >= 50) return { text: "조금만 더 있으면 돼요", color: "#FF7043" }; 
    return { text: "재료를 구매하셔야 해요!", color: "#999999" };
};

// ==================== 레시피 카드 컴포넌트 ====================

function RecipeCardContent({ recipe }) {
    const matchRate = Number(recipe.matchRate ?? 0);
    const matchStyle = getMatchRateStyle(matchRate);

    return (
        <div style={{ borderRadius: '30px', overflow: 'hidden', height: '100%' }}>
            <div className="thumb" style={{ position: 'relative' }}>
                <img 
                    src={recipe.rcpImgUrl} 
                    alt={recipe.rcpName} 
                    style={{ width: '100%', height: '240px', objectFit: 'cover' }}
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
                        background: matchStyle.color, 
                        color: 'white', 
                        padding: '6px 16px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '800',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                        {matchStyle.text}{'\u00A0\u00A0'}{matchRate}%
                    </span>
                </div>
            </div>

            <div className="content" style={{ padding: '20px' }}>
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
                    <div className="label" style={{ 
                        fontSize: '11px', 
                        fontWeight: '550', 
                        color: '#000000', 
                        marginBottom: '8px' 
                    }}>
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

// ==================== 메인 Recipe 컴포넌트 ====================

function Recipe() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    
    // ==================== State 관리 ====================
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("VIEW_DESC");
    const [isLogin] = useState(!!localStorage.getItem("accessToken")); 
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // ==================== 데이터 패칭 ====================
    const fetchRecipes = async () => {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const currentUserId = localStorage.getItem("userId");
        const urlParams = new URLSearchParams(location.search);
        const urlPage = Number(urlParams.get("page") ?? 1);
        const urlKeyword = urlParams.get("keyword");
        const urlSort = urlParams.get("sort") ?? "VIEW_DESC";

        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/api/recipes`;
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

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const urlSort = urlParams.get("sort") ?? "VIEW_DESC";
        const urlPage = Number(urlParams.get("page") ?? 1);
        setSort(urlSort);
        setPage(urlPage);
        
        fetchRecipes();
    }, [location.search, refreshTrigger]);

    // ==================== 이벤트 핸들러 ====================
    const handleSort = (sort) => {
        const params = new URLSearchParams(location.search);
        params.set("sort", sort);
        params.set("page", "1");
        setPage(1);
        navigate(`/recipe?${params.toString()}`);
    };

    const handleRecipeSearch = () => {
        if (!recipeSearchTerm.trim()) return;
        const params = new URLSearchParams(location.search);
        params.set("keyword", recipeSearchTerm);
        params.set("sort", sort);
        params.set("page", "1");
        navigate(`/recipe?${params.toString()}`);
    };

    const handleFinishRecipe = async (usedItems) => {
        const token = localStorage.getItem("accessToken");
        
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/ingredients/names`, 
                {
                    headers: { "Authorization": `Bearer ${token}` },
                    data: usedItems
                }
            );
            
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            queryClient.invalidateQueries({ queryKey: ['fridgeHome'] });
        } catch (error) {
            console.error("재료 삭제 실패:", error);
            throw error;
        }
    };

    const handleAddMissingIngredients = async (missingItems) => {
        const token = localStorage.getItem("accessToken");
        
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/ingredients/names`, 
                missingItems, 
                {
                    headers: { "Authorization": `Bearer ${token}` }
                }
            );
            
            queryClient.invalidateQueries({ queryKey: ['ingredients'] });
            queryClient.invalidateQueries({ queryKey: ['fridgeHome'] });
        } catch (error) {
            console.error("재료 추가 실패:", error);
            throw error;
        }
    };

    const handleCloseModal = () => {
        setIsRecipeModalOpen(false);
        setSelectedRecipe(null);
        setRefreshTrigger(prev => prev + 1);
    };

    // ==================== 렌더링 ====================
    return (
        <>
            <Global styles={fontImport} /> 
            <div css={commonS.wrapper}>
                <div css={commonS.container}>
                    {/* 헤더 */}
                    <div css={commonS.headerCard}>
                        <div css={commonS.logo} onClick={() => navigate("/home")}>
                            <div className="logo-box">🧊</div> 냉장고 파먹기
                        </div>
                        
                        <div style={{ 
                            position: 'relative', 
                            flex: 1, 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px' 
                        }}>
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
                            <button css={commonS.pillBtn(false)} onClick={() => navigate("/home")}>
                                🏠 <span className="btn-text">식재료</span>
                            </button>
                            <button css={commonS.pillBtn(true)} onClick={() => navigate("/recipe")}>
                                📖 <span className="btn-text">레시피</span>
                            </button>
                            <button css={commonS.pillBtn(false)} onClick={() => navigate("/login")}>
                                👤 <span className="btn-text">{isLogin ? "로그아웃" : "로그인"}</span>
                            </button>
                        </div>
                    </div>

                    {/* 배너 */}
                    <div css={recipeS.banner}>
                        <div className="tag">🔥 오늘의 추천</div>
                        <h2>냉장고 재료로 만드는<br/>특별한 요리</h2>
                    </div>

                    {/* 정렬 버튼 */}
                    <div css={recipeS.controlBar}>
                        <button 
                            css={recipeS.sortBtn(sort === "VIEW_DESC")} 
                            onClick={() => handleSort("VIEW_DESC")}
                        >
                            👁️ 조회수순
                        </button>
                        <button 
                            css={recipeS.sortBtn(sort === "LEVEL_DESC")} 
                            onClick={() => handleSort("LEVEL_DESC")}
                        >
                            🔥 난이도순
                        </button>
                        <button 
                            css={recipeS.sortBtn(sort === "MATCHRATE_DESC")} 
                            onClick={() => handleSort("MATCHRATE_DESC")}
                        >
                            🛒 매치율순
                        </button>
                    </div>

                    {/* 레시피 그리드 */}
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
                        
                        {loading && (
                            <div style={{ 
                                gridColumn: '1/-1', 
                                textAlign: 'center', 
                                padding: '20px' 
                            }}>
                                추가 레시피 로딩 중...
                            </div>
                        )}
                    </div>

                    {/* 페이지네이션 */}
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

                {/* 레시피 상세 모달 */}
                {isRecipeModalOpen && (
                    <RecipeSearchModal 
                        recipe={selectedRecipe} 
                        onFinish={handleFinishRecipe}
                        onAddMissing={handleAddMissingIngredients}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>
    );
}

export default Recipe;
