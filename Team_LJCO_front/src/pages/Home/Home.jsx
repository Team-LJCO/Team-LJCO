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

  const { 
    data: fridgeHome, 
    isLoading: isIngredientsLoading,
    isError: isIngredientsError,
    error: ingredientsError
  } = useFridgeHomeQuery(isLogin, 30);
  
  const deleteIngredient = useDeleteIngredientMutation();

  const ingredients = fridgeHome?.userIngredientList ?? [];
  const expiredIngredientCount = fridgeHome?.expiredIngredientCount ?? 0;
  const matchedRecipeCount = fridgeHome?.matchedRecipeCount ?? 0;
  const matchedRecipeList = fridgeHome?.matchedRecipeList ?? [];

  // 401 에러 처리 (토큰 만료 등)
  useEffect(() => {
    const status = ingredientsError?.response?.status;
    if (isIngredientsError && status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      setIsLogin(false);
      queryClient.removeQueries({ queryKey: queryKeys.ingredients.all });
    }
  }, [isIngredientsError, ingredientsError, queryClient]);

  // 삭제 핸들러 (확인 메시지 + 이벤트 전파 방지)
  const handleDelete = (userIngId, e) => {
    e.stopPropagation();
    if (!window.confirm("이 재료를 냉장고에서 꺼낼까요?")) return;
    deleteIngredient.mutate(userIngId, { 
      onError: () => alert("삭제 실패") 
    });
  };

  /* --- 재료 추가 모달 닫기 핸들러 (쿼리 무효화 포함) --- */
  const handleCloseAddModal = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.fridgeHome.all });
  };

  /* --- 상세 모달용 서버 통신 핸들러 --- */
  const handleFinishRecipe = async (usedItems) => {
    console.log("🔴 handleFinishRecipe 호출됨:", usedItems);
    const token = localStorage.getItem("accessToken");
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/user/ingredients/names`, {
        headers: { "Authorization": `Bearer ${token}` },
        data: usedItems
      });
      
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.fridgeHome.all });
      
      console.log("✅ 재료 삭제 성공");
    } catch (error) {
      console.error("❌ 재료 삭제 실패:", error);
      throw error;
    }
  };

  const handleAddMissingIngredients = async (missingItems) => {
    console.log("🔵 handleAddMissingIngredients 호출됨:", missingItems);
    const token = localStorage.getItem("accessToken");
    
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/ingredients/names`, 
        missingItems, 
        {
          headers: { "Authorization": `Bearer ${token}` }
        }
      );
      
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.fridgeHome.all });
      
      console.log("✅ 재료 추가 성공");
    } catch (error) {
      console.error("❌ 재료 추가 실패:", error);
      throw error;
    }
  };

  const handleAuthClick = () => {
    if (isLogin) {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        localStorage.removeItem("accessToken");
        setIsLogin(false);
        queryClient.removeQueries({ queryKey: queryKeys.ingredients.all });
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  };

  const handleCookableClick = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if (matchedRecipeCount === 0) {
      alert("현재 요리 가능한 레시피가 없어요!");
      return;
    }
    setIsCookableModalOpen(true);
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
            <div css={s.logo} onClick={() => navigate("/home")}>
              <div className="logo-box">🧊</div> 냉장고 파먹기
            </div>
            <div css={s.searchContainer}>
              <input
                css={s.recipeSearch}
                placeholder="오늘은 뭐 해먹지?"
                value={recipeSearchTerm}
                onChange={(e) => setRecipeSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && recipeSearchTerm.trim()) {
                    navigate(`/recipe?keyword=${encodeURIComponent(recipeSearchTerm.trim())}`);
                  }
                }}
              />
            </div>
            <nav css={s.navGroup}>
              <button css={s.pillBtn(true)} onClick={() => navigate("/home")}>🏠 <span className="btn-text">식재료</span></button>
              <button css={s.pillBtn(false)} onClick={() => navigate("/recipe")}>📖 <span className="btn-text">레시피</span></button>
              <button css={s.pillBtn(false)} onClick={handleAuthClick}>👤 <span className="btn-text">{isLogin ? "로그아웃" : "로그인"}</span></button>
            </nav>
          </header>

          <section css={s.dashboardGrid}>
            <div css={s.summaryCard}>
              <div className="info">
                <div className="label" style={{ color: "#E9967A" }}>● 전체</div>
                <div className="count">{isLogin ? ingredients.length : 0}</div>
              </div>
              <div className="icon-wrap">📦</div>
            </div>
            <div css={s.summaryCard}>
              <div className="info">
                <div className="label" style={{ color: "#FFB347" }}>● 소비 임박</div>
                <div className="count">{isLogin ? expiredIngredientCount : 0}</div>
              </div>
              <div className="icon-wrap">⚠️</div>
            </div>
            <div css={[s.summaryCard, s.summaryCardClickable]} onClick={handleCookableClick}>
              <div className="info">
                <div className="label" style={{ color: "#CD5C5C" }}>● 요리 가능</div>
                <div className="count">{isLogin ? matchedRecipeCount : 0}</div>
              </div>
              <div className="icon-wrap">🍲</div>
            </div>
          </section>

          <section css={s.listSection}>
            <div css={s.sectionTitle}>
              <div className="square"></div>식재료 목록
            </div>

            {isLogin && ingredients.length > 0 && (
              <div css={s.searchBarWrapper}>
                <span css={s.searchIcon}>🔍</span>
                <input 
                  css={s.innerSearchInput} 
                  placeholder="목록 내 검색..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            )}

            {isLogin && isIngredientsLoading ? (
              <div css={s.emptyState}>
                <div className="bubble">불러오는 중...</div>
                <img src={FridgeChar} alt="" className="refrigerator-img" />
              </div>
            ) : !isLogin || ingredients.length === 0 ? (
              <div css={s.emptyState}>
                <div className="bubble">
                  {isLogin ? "냉장고가 텅 비어있어요!" : "로그인 후 관리해 보세요!"}
                </div>
                <img src={FridgeChar} alt="" className="refrigerator-img" />
              </div>
            ) : (
              <div css={s.grid}>
                {filteredIngredients.map((item) => {
                  const dateValue = item.createdAt || item.created_at;
                  const dateInfo = getDaysInfo(dateValue);

                  return (
                    <div 
                      key={item.userIngId} 
                      css={s.foodCard} 
                      style={{ backgroundColor: dateInfo.isTrash ? "#F5F5F5" : "#FFFFFF" }}
                    >
                      <button 
                        className="delete-target" 
                        css={s.deleteBtn} 
                        onClick={(e) => handleDelete(item.userIngId, e)}
                      >
                        ×
                      </button>

                      <span 
                        className="badge" 
                        style={{ 
                          backgroundColor: dateInfo.color,
                          color: dateInfo.color === "#FFFFFF" ? "#10be1f" : "#FFFFFF",
                          border: dateInfo.color === "#FFFFFF" ? "1px solid #FF704333" : "none"
                        }}
                      >
                        {dateInfo.text}
                      </span>

                      <img 
                        src={`${import.meta.env.VITE_API_BASE_URL}/images/${item.ingredient?.ingImgUrl}`} 
                        alt="" 
                        style={{ opacity: dateInfo.opacity }}
                        onError={(e) => { 
                          e.target.src = import.meta.env.VITE_API_BASE_URL + "/images/pork_thin.png"; 
                        }}
                      />

                      <div className="name">{item.ingredient?.ingName}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* ✅ 요리 가능 레시피 목록 모달 (핸들러 전달) */}
        {isCookableModalOpen && (
          <CookableRecipesModal
            recipes={matchedRecipeList}
            onClose={() => setIsCookableModalOpen(false)}
            onSelectRecipe={(recipe) => {
              setIsCookableModalOpen(false);
              setSelectedRecipe(recipe);
            }}
            onFinish={handleFinishRecipe}
            onAddMissing={handleAddMissingIngredients}
          />
        )}

        {/* ✅ 레시피 상세 조리법 모달 (핸들러 전달) */}
        {selectedRecipe && (
          <RecipeSearchModal 
            recipe={selectedRecipe} 
            onFinish={handleFinishRecipe}
            onAddMissing={handleAddMissingIngredients}
            onClose={() => {
              setSelectedRecipe(null); 
              setIsCookableModalOpen(true);
            }} 
          />
        )}

        {isLogin && (
          <button css={s.fab} onClick={() => setIsModalOpen(true)}>
            <div className="circle">+</div> 재료 추가하기
          </button>
        )}

        {isModalOpen && (
          <AddIngredientModal 
            onClose={handleCloseAddModal}
          />
        )}
      </div>
    </>
  );
}

export default Home;
