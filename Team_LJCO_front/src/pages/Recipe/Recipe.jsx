/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { Global } from "@emotion/react";
import { fontImport, s as commonS } from "../Home/styles";
import { s as recipeS } from "./styles";
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import { RecipeCard } from "../../components/recipe";


function Recipe() {
    const navigate = useNavigate();
    const location = useLocation();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("VIEW_DESC");

    const [isLogin] = useState(!!localStorage.getItem("accessToken")); // 대소문자 주의: accessToken
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
        
        // 유저 없을시 32번 유저로 로그인(비로그인 기능 만들어야함)
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
    params.set("keyword",recipeSearchTerm);
    params.set("sort", sort);
    params.set("page", "1");

    navigate(`/recipe?${params.toString()}`);
    };
    return (
        <>
            <Global styles={fontImport} /> 
            <div css={commonS.wrapper}>
                <div css={commonS.container}>
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
                        <div>
                            <button onClick={() => handleSort("VIEW_DESC")}>
                                조회수순
                            </button>
                            <button onClick={() => handleSort("LEVEL_DESC")}>
                                난이도순
                            </button>
                            <button onClick={() => handleSort("MATCHRATE_DESC")}>
                                매치율순
                            </button>
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
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                        {loading && <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '20px'}}>
                        추가 레시피 로딩 중...</div>}
                    </div>
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

                {isRecipeModalOpen && <RecipeSearchModal 
        recipe={selectedRecipe} 
        onClose={() => {
            setIsRecipeModalOpen(false);
            setSelectedRecipe(null);
        }} 
    />}
            </div>
        </>
    );
}

export default Recipe;
