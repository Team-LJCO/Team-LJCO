/** @jsxImportSource @emotion/react */
import { useState, useMemo } from "react";
import { s } from "./styles";
import { IoExitOutline, IoCartOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const FinishRecipe = ({ ingredients = [], onFinish, onAddMissing, onClose }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);

    // ✅ 데이터 유효성 검사 및 정렬 로직 (부족한 재료 'N'이 뒤로 가게 설정)
    const sortedIngredients = useMemo(() => {
        if (!Array.isArray(ingredients)) return [];
        return [...ingredients].sort((a, b) => (a.matchedColor === 'N' ? 1 : -1));
    }, [ingredients]);

    // ✅ 아이템 선택/해제 토글
    const toggleItem = (name) => {
        if (!name) return;
        setSelectedItems(prev => 
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        );
    };

    // ✅ 선택된 아이템들을 '비울 것(Delete)'과 '채울 것(Add)'으로 분리
    const selectedDetails = useMemo(() => {
        const toDelete = selectedItems.filter(name => {
            const target = ingredients.find(ing => ing.ingName === name);
            return target && target.matchedColor !== 'N'; // 매칭된 재료 (주황색 테마)
        });
        const toAdd = selectedItems.filter(name => {
            const target = ingredients.find(ing => ing.ingName === name);
            return target && target.matchedColor === 'N'; // 부족한 재료 (파란색 테마)
        });
        return { toDelete, toAdd };
    }, [selectedItems, ingredients]);

    // ✅ 서버 통신 및 액션 핸들러
const handleAction = async (type) => {
    const { toDelete, toAdd } = selectedDetails;
    
    console.log("🔍 handleAction 호출됨");
    console.log("Type:", type);
    console.log("toDelete:", toDelete);
    console.log("toAdd:", toAdd);
    console.log("onFinish 함수:", onFinish);
    console.log("onAddMissing 함수:", onAddMissing);
    
    try {
        if (type === 'ALL') {
            if (toDelete.length > 0 && onFinish) {
                console.log("✅ onFinish 호출 시도:", toDelete);
                await onFinish(toDelete);
                console.log("✅ onFinish 완료");
            }
            if (toAdd.length > 0 && onAddMissing) {
                console.log("✅ onAddMissing 호출 시도:", toAdd);
                await onAddMissing(toAdd);
                console.log("✅ onAddMissing 완료");
            }
            alert("냉장고 정리가 완료되었습니다! ✨");
        } else if (type === 'ADD_ONLY') {
            if (onAddMissing) {
                console.log("✅ onAddMissing 호출 시도 (ADD_ONLY):", toAdd);
                await onAddMissing(toAdd);
                console.log("✅ onAddMissing 완료");
            }
            alert("선택한 재료가 냉장고에 추가되었습니다! ✅");
        } else if (type === 'COUPANG') {
            if (toAdd.length > 0) {
                window.open(`https://www.coupang.com/np/search?q=${encodeURIComponent(toAdd[0])}`, '_blank');
                return;
            }
        }
        if (onClose) onClose();
    } catch (err) {
        console.error("❌ Action 처리 중 오류:", err);
        console.error("❌ 에러 상세:", err.response?.data || err.message);
        alert("처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
};

    return (
        <div css={s.finishContainer}>
            {/* 상단 텍스트 가이드 */}
            <div className="text-section">
                <h3 className="finish-title">냉장고 정리 ✨</h3>
                <p className="finish-desc">
                    다 사용한 재료<span className="orange">
                        <IoExitOutline size={18} style={{verticalAlign:'middle', margin:'0 4px', transform: 'rotate(-90deg)'}}/>
                    </span>는 <span className="orange">비우고</span>,<br/> 
                    조금 부족한 재료<span className="blue">
                        <IoCartOutline size={18} style={{verticalAlign:'middle', margin:'0 4px'}}/>
                    </span>는 <span className="blue">채워보세요</span>.
                </p>
            </div>

            {/* 재료 리스트 영역 */}
            <div className="ingredient-list">
                {sortedIngredients.length === 0 ? (
                    <div style={{ width: '100%', padding: '60px 20px', textAlign: 'center', color: '#bbb', fontWeight: '800' }}>
                        불러올 재료 정보가 없습니다 🧐
                    </div>
                ) : (
                    sortedIngredients.map((ing, idx) => {
                        const isMissing = ing.matchedColor === 'N'; // 부족한 재료 여부
                        const isChecked = selectedItems.includes(ing.ingName);
                        const isHovered = hoveredItem === ing.ingName;
                        const themeColor = isMissing ? '33, 150, 243' : '255, 112, 67'; // 파랑 vs 주황

                        return (
                            <div key={idx} className="ing-card"
                                onMouseEnter={() => setHoveredItem(ing.ingName)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onClick={(e) => { e.stopPropagation(); toggleItem(ing.ingName); }}
                                style={{
                                    backgroundColor: isChecked ? (isMissing ? '#f0f9ff' : '#fff9f5') : '#fff',
                                    borderColor: isChecked ? (isMissing ? '#2196f3' : '#ff7043') : '#f5f5f5',
                                    boxShadow: isChecked || isHovered ? `0 10px 25px rgba(${themeColor}, 0.15)` : 'none'
                                }}>
                                <div className="icon-badge" style={{ backgroundColor: isChecked ? 'white' : (isMissing ? '#f0f7ff' : '#fff5f2') }}>
                                    <span style={{ fontSize: '26px', display: 'flex', alignItems: 'center' }}>
                                        {isChecked ? (
                                            <IoCheckmarkCircleOutline color={isMissing ? '#2196f3' : '#ff7043'} />
                                        ) : isMissing ? (
                                            <IoCartOutline color="#2196f3" />
                                        ) : (
                                            <IoExitOutline color="#ff7043" style={{ transform: 'rotate(-90deg)' }} />
                                        )}
                                    </span>
                                </div>
                                <span style={{ fontWeight: '900', fontSize: '15px', color: isChecked ? (isMissing ? '#1976d2' : '#e64a19') : '#444' }}>
                                    {ing.ingName}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>

            {/* 하단 버튼 액션 영역 */}
            <div className="bottom-action">
                {selectedItems.length === 0 ? (
                    <button className="complete-btn default" onClick={onClose}>그대로 완료하기</button>
                ) : (selectedDetails.toDelete.length > 0 && selectedDetails.toAdd.length > 0) ? (
                    <button className="complete-btn finish" onClick={() => handleAction('ALL')}>냉장고 정리 하기 ✨</button>
                ) : selectedDetails.toDelete.length > 0 ? (
                    <button className="complete-btn finish" onClick={() => handleAction('ALL')}>{selectedDetails.toDelete.length}개의 재료 비우기</button>
                ) : (
                    <div className="btn-row">
                        <button className="complete-btn add" onClick={() => handleAction('ADD_ONLY')} style={{ flex: 1.2 }}>
                            {selectedDetails.toAdd.length}개의 재료 추가
                        </button>
                        {selectedDetails.toAdd.length === 1 && (
                            <button className="complete-btn shop" onClick={() => handleAction('COUPANG')} style={{ flex: 0.8 }}>
                                장보기 🛒
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinishRecipe;
