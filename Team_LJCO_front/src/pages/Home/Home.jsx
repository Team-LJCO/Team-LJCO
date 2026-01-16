/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { css, Global } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";

import { fontImport, s } from "./styles";
import AddIngredientModal from "../../components/ingredient/modal/AddIngredientModal";
import RecipeSearchModal from "../../components/recipeModal/RecipeSearchModal";
import FridgeChar from "../../assets/fridge-closed.png";

import { useIngredientsQuery } from "../../react-query/queries/ingredients.queries";
import { useDeleteIngredientMutation } from "../../react-query/mutations/ingredients.mutations";
import { QUERY_KEYS } from "../../react-query/queries/queryKeys";


// 초성 검색 유틸리티
const getChoseong = (str) => {
  const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
    else result += str.charAt(i);
  }
  return result;
};

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // 💡 어드민 로그인 상태 추가
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeSearchTerm, setRecipeSearchTerm] = useState("");
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  // 로그인 및 어드민 토큰 체크
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const adminToken = localStorage.getItem("adminToken");
    setIsLogin(!!token);
    setIsAdmin(!!adminToken);
  }, []);

  const { data: ingredients = [], isLoading: isIngredientsLoading, isError: isIngredientsError, error: ingredientsError } = useIngredientsQuery(isLogin);
  const deleteIngredient = useDeleteIngredientMutation();

  // 인증 에러 처리
  useEffect(() => {
    const status = ingredientsError?.response?.status;
    if (isIngredientsError && status === 401) {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      queryClient.removeQueries({ queryKey: QUERY_KEYS.INGREDIENTS });
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

  const getDaysInfo = (createDate) => {
    const d = Math.floor((new Date() - new Date(createDate)) / (1000 * 60 * 60 * 24));
    const getColor = (days) => days < 7 ? "#34C759" : days <= 14 ? "#FFD60A" : days <= 29 ? "#FF9F0A" : "#DBDBDB";
    const getOpacity = (days) => days >= 100 ? 0.3 : days >= 60 ? 0.5 : days >= 50 ? 0.65 : days >= 30 ? 0.7 : 1.0;
    return { text: `D+${d}`, color: getColor(d), opacity: getOpacity(d), isTrash: d >= 30 };
  };

  const handleAuthClick = () => {
    if (isLogin) {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        localStorage.removeItem("accessToken");
        setIsLogin(false);
        queryClient.removeQueries({ queryKey: QUERY_KEYS.INGREDIENTS });
        navigate("/");
      }
    } else { navigate("/login"); }
  };

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
          <div css={s.headerCard}>
            <div css={s.logo} onClick={() => navigate("/home")}>
              <div className="logo-box">🧊</div> 냉장고 파먹기
            </div>
            <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
              <input css={s.recipeSearch} placeholder="오늘은 뭐 해먹지?" value={recipeSearchTerm} onChange={(e) => setRecipeSearchTerm(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setIsRecipeModalOpen(true)} />
              <button onClick={() => setIsRecipeModalOpen(true)} css={searchBtnStyle}>🔍</button>
            </div>
            <div css={s.navGroup}>
              <button css={s.pillBtn(true)} onClick={() => navigate("/home")}>🏠 식재료</button>
              <button css={s.pillBtn(false)} onClick={() => navigate("/recipe")}>📖 레시피</button>
              <button css={s.pillBtn(false)} onClick={handleAuthClick}>👤 {isLogin ? "로그아웃" : "로그인"}</button>
            </div>
          </div>

          {/* 대시보드 요약 정보 */}
          <div css={s.dashboardGrid}>
             <div css={s.summaryCard}>
               <div className="info"><div className="label" style={{ color: "#E9967A" }}>● 전체</div><div className="count">{isLogin ? ingredients.length : 0}</div></div>
               <div className="icon-wrap">📦</div>
             </div>
             <div css={s.summaryCard}>
               <div className="info"><div className="label" style={{ color: "#FFB347" }}>● 소비 필요</div><div className="count">{isLogin ? ingredients.filter(i => Math.floor((new Date() - new Date(i.createdAt)) / 86400000) >= 7).length : 0}</div></div>
               <div className="icon-wrap">⚠️</div>
             </div>
             <div css={s.summaryCard}>
               <div className="info"><div className="label" style={{ color: "#CD5C5C" }}>● 폐기 필요</div><div className="count">{isLogin ? ingredients.filter(i => Math.floor((new Date() - new Date(i.createdAt)) / 86400000) >= 30).length : 0}</div></div>
               <div className="icon-wrap">❌</div>
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
                      <span className="badge" style={{ backgroundColor: dateInfo.color }}>{dateInfo.text}</span>
                      <img 
                        src={`http://localhost:8080/images/${item.ingredient?.ingImgUrl}`} 
                        alt="" 
                        style={{ opacity: dateInfo.opacity }} 
                        onError={(e) => { e.target.src = "http://localhost:8080/images/pork_thin.png"; }} 
                      />
                      <div className="name">{item.ingredient?.ingName}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {isRecipeModalOpen && <RecipeSearchModal keyword={recipeSearchTerm} onClose={() => setIsRecipeModalOpen(false)} />}
        {isLogin && <button css={s.fab} onClick={() => setIsModalOpen(true)}><div className="circle">+</div> 재료 추가하기</button>}
        {isModalOpen && <AddIngredientModal onClose={() => { setIsModalOpen(false); queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INGREDIENTS }); }} />}
      </div>
    </>
  );
}

const searchBtnStyle = css`background: #ff7043; color: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: 0.2s; &:hover { background: #e65a2d; }`;

export default Home;