/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { api } from "../../configs/axiosConfig";
import { Global } from "@emotion/react"; 
import { fontImport, s } from "../Home/styles";
import { s as recipeS } from "./styles"; 
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";
import { useNavigate, useLocation } from "react-router-dom"; 
import Pagination from "../../components/common/Pagination";
import RecipeIngredientMark from "./RacipeIngredientMark";
import { getLevelText } from "../../components/recipe/RecipeCard";
import RecipeCardContent from "../../components/recipe/RecipeCardContent";
import { useQueryClient } from "@tanstack/react-query";


const Icons = {
    Logo: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 2h14a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M3 10h18"/><path d="M7 6v2"/><path d="M7 14v4"/></svg>
  ),
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Recipe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
};

function Recipe() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryClient = useQueryClient();

    const handleAuthClick = () => {
    const isLogin = !!localStorage.getItem("accessToken");
    if (isLogin) {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userId");
            
            // 수정: clear() 대신 removeQueries() 사용 혹은 일단 주석 처리
            // queryClient.removeQueries(); 
            
            navigate("/");
            window.location.reload();
        }
    } else {
        navigate("/login");
    }
};

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
            const currentUserId = localStorage.getItem("userId");

            try {
                const res = await api.get("/api/recipes", {
                    params: {
                        page: urlPage,
                        userId: currentUserId,
                        keyword: urlKeyword || undefined,
                        sort: urlSort,
                    },
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
            <div css={s.wrapper}> {/* commonS를 s로 수정 */}
                <div css={s.container}> {/* commonS를 s로 수정 */}
                    <div css={s.headerCard}> {/* commonS를 s로 수정 */}
                        <div css={s.logo} onClick={() => navigate("/home")}>
                            <div className="logo-box">
                                <Icons.Logo /> {/* ✅ 🧊 대신 새 아이콘 적용 */}
                            </div> 
                            냉장고 파먹기
                        </div>
                        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input 
                                css={s.recipeSearch} 
                                style={{ flex: 1 }}
                                placeholder="오늘은 뭐 해먹지?" 
                                value={recipeSearchTerm}
                                onChange={(e) => setRecipeSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleRecipeSearch()}
                            /> {/* <--- 여기에 /> 태그를 확실히 닫아주세요 */}
                        </div>
                        
                        {/* 기존 정렬 버튼 있던 곳 -> 삭제됨 */}
                        
                        <div css={s.navGroup}>
                        <button css={s.pillBtn(false)} onClick={() => navigate("/home")}>
                            <Icons.Home /> <span className="btn-text">식재료</span>
                        </button>
                        <button css={s.pillBtn(true)} onClick={() => navigate("/recipe")}>
                            <Icons.Recipe /> <span className="btn-text">레시피</span>
                        </button>
                        <button css={s.pillBtn(false)} onClick={handleAuthClick}>
                            <Icons.User /> <span className="btn-text">{isLogin ? "로그아웃" : "로그인"}</span>
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

export default Recipe;