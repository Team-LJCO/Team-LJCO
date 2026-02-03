/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import AddIngredientModal from "../../components/ingredient/modal/AddIngredientModal";
import FridgeChar from "../../assets/fridge-closed.png";
import CookableRecipesModal from "../../components/common/Modal/CookableRecipesModal";
import RecipeSearchModal from "../../components/recipe/RecipeSearchModal";

import { useFridgeHomeQuery } from "../../queries/fridgeHome";
import { useDeleteIngredientMutation } from "../../react-query/mutations/ingredients.mutations";
import { queryKeys } from "../../queries/queryKeys";
import { fontImport, s } from "./styles";
import { getDaysInfo } from "../../utils/date"; 
import { getChoseong } from "../../utils/korean";

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
  const [isCookableModalOpen, setIsCookableModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const adminToken = localStorage.getItem("adminToken");
    setIsLogin(!!token);
    setIsAdmin(!!adminToken);
  }, []);

  const { data: fridgeHome, isLoading: isIngredientsLoading } = useFridgeHomeQuery(isLogin, 30);
  const deleteIngredient = useDeleteIngredientMutation();

  const ingredients = fridgeHome?.userIngredientList ?? [];
  const expiredIngredientCount = fridgeHome?.expiredIngredientCount ?? 0;
  const matchedRecipeCount = fridgeHome?.matchedRecipeCount ?? 0;
  const matchedRecipeList = fridgeHome?.matchedRecipeList ?? [];

  /* --- 상세 모달용 서버 통신 핸들러 --- */
  const handleFinishRecipe = async (usedItems) => {
    const token = localStorage.getItem("accessToken");
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/user/ingredients/names`, {
      headers: { "Authorization": `Bearer ${token}` },
      data: usedItems
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
  };

  const handleAddMissingIngredients = async (missingItems) => {
    const token = localStorage.getItem("accessToken");
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/ingredients/names`, missingItems, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
  };

  const handleAuthClick = () => {
    if (isLogin && window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      navigate("/");
    } else if (!isLogin) navigate("/login");
  };

  const filteredIngredients = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return ingredients;
    return ingredients.filter((item) => {
      const targetName = item.ingredient?.ingName || "";
      return targetName.toLowerCase().includes(term) || getChoseong(targetName).includes(term);
    });
  }, [searchTerm, ingredients]);

  return (
    <>
      <Global styles={fontImport} />
      <div css={s.wrapper}>
        <button css={s.adminFab} onClick={() => navigate(isAdmin ? "/admin" : "/admin/login")}>⚙️</button>

        <div css={s.container}>
          <header css={s.headerCard}>
            <div css={s.logo} onClick={() => navigate("/home")}><div className="logo-box">🧊</div> 냉장고 파먹기</div>
            <div css={s.searchContainer}>
              <input
                css={s.recipeSearch}
                placeholder="오늘은 뭐 해먹지?"
                value={recipeSearchTerm}
                onChange={(e) => setRecipeSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/recipe?keyword=${recipeSearchTerm}`)}
              />
            </div>
            <nav css={s.navGroup}>
              <button css={s.pillBtn(true)} onClick={() => navigate("/home")}>🏠 <span className="btn-text">식재료</span></button>
              <button css={s.pillBtn(false)} onClick={() => navigate("/recipe")}>📖 <span className="btn-text">레시피</span></button>
              <button css={s.pillBtn(false)} onClick={handleAuthClick}>👤 <span className="btn-text">{isLogin ? "로그아웃" : "로그인"}</span></button>
            </nav>
          </header>

          <section css={s.dashboardGrid}>
            <div css={s.summaryCard}><div className="info"><div className="label" style={{ color: "#E9967A" }}>● 전체</div><div className="count">{isLogin ? ingredients.length : 0}</div></div><div className="icon-wrap">📦</div></div>
            <div css={s.summaryCard}><div className="info"><div className="label" style={{ color: "#FFB347" }}>● 소비 임박</div><div className="count">{isLogin ? expiredIngredientCount : 0}</div></div><div className="icon-wrap">⚠️</div></div>
            <div css={[s.summaryCard, s.summaryCardClickable]} onClick={() => matchedRecipeCount > 0 ? setIsCookableModalOpen(true) : alert("요리 가능한 레시피가 없어요!")}>
              <div className="info"><div className="label" style={{ color: "#CD5C5C" }}>● 요리 가능</div><div className="count">{isLogin ? matchedRecipeCount : 0}</div></div><div className="icon-wrap">🍲</div>
            </div>
          </section>

          <section css={s.listSection}>
            <div css={s.grid}>
              {filteredIngredients.map((item) => {
                const dateInfo = getDaysInfo(item.createdAt || item.created_at);
                return (
                  <div key={item.userIngId} css={s.foodCard} style={{ backgroundColor: dateInfo.isTrash ? "#F5F5F5" : "#FFFFFF" }}>
                    <button className="delete-target" css={s.deleteBtn} onClick={(e) => deleteIngredient.mutate(item.userIngId)}>×</button>
                    <span className="badge" style={{ backgroundColor: dateInfo.color, color: dateInfo.color === "#FFFFFF" ? "#10be1f" : "#FFFFFF" }}>{dateInfo.text}</span>
                    <img src={`${import.meta.env.VITE_API_BASE_URL}/images/${item.ingredient?.ingImgUrl}`} alt="" style={{ opacity: dateInfo.opacity }} />
                    <div className="name">{item.ingredient?.ingName}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* 요리 가능 레시피 목록 모달 */}
        {isCookableModalOpen && (
          <CookableRecipesModal
            recipes={matchedRecipeList}
            onClose={() => setIsCookableModalOpen(false)}
            onSelectRecipe={(recipe) => {
              setIsCookableModalOpen(false);
              setSelectedRecipe(recipe); // 상세 모달 오픈
            }}
          />
        )}

        {/* 레시피 상세 조리법 모달 */}
        {selectedRecipe && (
          <RecipeSearchModal 
            recipe={selectedRecipe} 
            onFinish={handleFinishRecipe}
            onAddMissing={handleAddMissingIngredients}
            onClose={() => {
              setSelectedRecipe(null); 
              setIsCookableModalOpen(true); // 뒤로가기 시 리스트 재오픈
            }} 
          />
        )}

        {isLogin && <button css={s.fab} onClick={() => setIsModalOpen(true)}><div className="circle">+</div> 재료 추가하기</button>}
        {isModalOpen && <AddIngredientModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
}

export default Home;