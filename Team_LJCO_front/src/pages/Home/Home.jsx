/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { css, Global } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";


import AddIngredientModal from "../../components/ingredient/modal/AddIngredientModal";
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";
import FridgeChar from "../../assets/fridge-closed.png";
import CookableRecipesModal from "../../components/common/Modal/CookableRecipesModal";

import { useFridgeHomeQuery } from "../../queries/fridgeHome";
import { useDeleteIngredientMutation } from "../../react-query/mutations/ingredients.mutations";
import { queryKeys } from "../../queries/queryKeys";
import { fontImport, s } from "./styles";
import { getDaysInfo } from "../../utils/date";
import { getChoseong } from "../../utils/korean";

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
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  )
};

function Home() {
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  const [isCookableModalOpen, setIsCookableModalOpen] = useState(false);

  // 로그인 및 어드민 토큰 체크
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
    } =  useFridgeHomeQuery(isLogin, 30);

  const deleteIngredient = useDeleteIngredientMutation();

  const ingredients = fridgeHome?.userIngredientList ?? [];
  const expiredIngredientCount = fridgeHome?.expiredIngredientCount ?? 0;
  const matchedRecipeCount = fridgeHome?.matchedRecipeCount ?? 0;
  const matchedRecipeList = fridgeHome?.matchedRecipeList ?? [];

  useEffect(() => {
    const status = ingredientsError?.response?.status;
    if (isIngredientsError && status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      setIsLogin(false);
      queryClient.removeQueries({ queryKey: queryKeys.ingredients.all });
    }
  }, [isIngredientsError, ingredientsError, queryClient]);

  const handleDelete = (userIngId, e) => {
    e.stopPropagation();
    if (!window.confirm("이 재료를 냉장고에서 꺼낼까요?")) return;
    deleteIngredient.mutate(userIngId, { onError: () => alert("삭제 실패") });
  };

  const filteredIngredients = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return ingredients;
    return ingredients.filter((item) => {
      const targetName = item.ingredient?.ingName || "";
      return targetName.toLowerCase().includes(term) || getChoseong(targetName).includes(term);
    });
  }, [searchTerm, ingredients]);

  const handleAuthClick = () => {
    if (isLogin) {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        localStorage.removeItem("accessToken");
        setIsLogin(false);
        queryClient.removeQueries({ queryKey: queryKeys.ingredients.all });
        navigate("/");
      }
    } else { navigate("/login"); }
  };

  const handleCookableClick = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if(matchedRecipeCount === 0) {
      alert("현재 요리 가능한 레시피가 없어요!");
      return;
    }
    setIsCookableModalOpen(true);


  }

  return (
    <>
      <Global styles={fontImport} />
      <div css={s.wrapper}>
        {/* 💡 관리자 페이지 버튼 개선: 토큰 없으면 로그인으로, 있으면 대시보드로 */}
        <button 
          onClick={() => navigate(isAdmin ? "/admin" : "/admin/login")}
          style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
        >
          {isAdmin ? "📊 관리자 대시보드" : "⚙️ 관리자 로그인"}
        </button>

        <div css={s.container}>

          {/* 헤더 카드 */}
          <div css={s.headerCard}>
            <div css={s.logo} onClick={() => navigate("/home")}>
             <div className="logo-box">
                <Icons.Logo /> {/* 🧊 대신 아이콘 컴포넌트 삽입 */}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && recipeSearchTerm.trim()) {
                    // ✅ 모달 대신 레시피 페이지로 검색어를 쿼리 스트링에 담아 보냅니다.
                    navigate(`/recipe?keyword=${encodeURIComponent(recipeSearchTerm.trim())}`);
                  }
                }}
              />
            </div>
            <div css={s.navGroup}>
              <button css={s.pillBtn(true)} onClick={() => navigate("/home")}>
                <Icons.Home /> <span className="btn-text">식재료</span>
              </button>
              <button css={s.pillBtn(false)} onClick={() => navigate("/recipe")}>
                <Icons.Recipe /> <span className="btn-text">레시피</span>
              </button>
              <button css={s.pillBtn(false)} onClick={handleAuthClick}>
                <Icons.User /> <span className="btn-text">{isLogin ? "로그아웃" : "로그인"}</span>
              </button>
            </div>
          </div>

          {/* 대시보드 요약 정보 */}
          <div css={s.dashboardGrid}>
             <div css={s.summaryCard}>
               <div className="info"><div className="label" style={{ color: "#E9967A" }}>● 전체</div><div className="count">{isLogin ? ingredients.length : 0}</div></div>
               <div className="icon-wrap">📦</div>
             </div>
             <div css={s.summaryCard}>
               <div className="info"><div className="label" style={{ color: "#FFB347" }}>● 소비 임박</div><div className="count">{isLogin ? expiredIngredientCount : 0 }</div></div>
               <div className="icon-wrap">⚠️</div>
             </div>
              <div
              css={[s.summaryCard, s.summaryCardClickable]}
              onClick={handleCookableClick}
            >
               <div className="info"><div className="label" style={{ color: "#CD5C5C" }}>● 요리 가능</div><div className="count">{isLogin ? matchedRecipeCount : 0}</div></div>
               <div className="icon-wrap">🍲</div>
             </div>
          </div>

          <div css={s.listSection}>
            <div css={s.sectionTitle}><div className="square"></div>식재료 목록</div>
            {isLogin && ingredients.length > 0 && (
              <div css={s.searchBarWrapper}><span css={s.searchIcon}>🔍</span><input css={s.innerSearchInput} placeholder="목록 내 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
            )}
            {isLogin && isIngredientsLoading ? (
              <div css={s.emptyState}><div className="bubble">불러오는 중...</div><img src={FridgeChar} alt="" className="refrigerator-img" /></div>
            ) : !isLogin || ingredients.length === 0 ? (
              <div css={s.emptyState}><div className="bubble">{isLogin ? "냉장고가 텅 비어있어요!" : "로그인 후 관리해 보세요!"}</div><img src={FridgeChar} alt="" className="refrigerator-img" /></div>
            ) : (
              <div css={s.grid}>
                {filteredIngredients.map((item) => {
                  const dateInfo = getDaysInfo(item.createdAt);
                  return (
                    <div key={item.userIngId} css={s.foodCard} style={{ backgroundColor: dateInfo.isTrash ? "#F5F5F5" : "#FFFFFF" }}>
                      <button className="delete-target" css={s.deleteBtn} onClick={(e) => handleDelete(item.userIngId, e)}>×</button>
                      <span 
  className="badge" 
  style={{ 
    backgroundColor: dateInfo.bgColor, // ✅ 연한 파스텔 배경
    color: dateInfo.textColor,         // ✅ 진한 포인트 글자색
    border: `1px solid ${dateInfo.textColor}22`, // 미세한 테두리로 선명도 업
    fontWeight: "900",                 // 파스텔 톤에서 가독성 확보
  }}
>
  {dateInfo.text}
</span>
                      <img 
                        src={`${import.meta.env.VITE_API_BASE_URL}/images/${item.ingredient?.ingImgUrl}`} 
                        alt="" 
                        style={{ opacity: dateInfo.opacity }} 
                        onError={(e) => { e.target.src = import.meta.env.VITE_API_BASE_URL + "/images/pork_thin.png"; }} 
                      />
                      <div className="name">{item.ingredient?.ingName}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {isCookableModalOpen && (
          <CookableRecipesModal
            recipes={matchedRecipeList}
            onClose={() => setIsCookableModalOpen(false)}
            onSelectRecipe={(recipe) => {
              setIsCookableModalOpen(false);
              navigate(`/recipe?keyword=${encodeURIComponent(recipe.rcpName)}`);
            }}
          />
        )}


        {isRecipeModalOpen && <RecipeSearchModal keyword={recipeSearchTerm} onClose={() => setIsRecipeModalOpen(false)} />}
          {isLogin && (
      <button css={s.fab} onClick={() => setIsModalOpen(true)}>
        <div className="circle">
          <Icons.Plus /> {/* ✅ 기존 '+' 대신 SVG 아이콘 적용 */}
        </div> 
        재료 추가하기
      </button>
    )}
        {isModalOpen && <AddIngredientModal onClose={() => { setIsModalOpen(false); queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all }); }} />}
      </div>
    </>
  );
}

const searchBtnStyle = css`background: #ff7043; color: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: 0.2s; &:hover { background: #e65a2d; }`;

export default Home;