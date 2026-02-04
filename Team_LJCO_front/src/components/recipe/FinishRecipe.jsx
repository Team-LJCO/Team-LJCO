/** @jsxImportSource @emotion/react */
import { useState, useMemo } from "react";
import { s } from "./styles";
import { IoExitOutline, IoCartOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const FinishRecipe = ({ ingredients = [], onFinish, onAddMissing, onClose }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false); // ✅ 로딩 상태 추가

    const sortedIngredients = useMemo(() => {
        if (!Array.isArray(ingredients)) return [];
        return [...ingredients].sort((a, b) => (a.matchedColor === 'N' ? 1 : -1));
    }, [ingredients]);

    const toggleItem = (name) => {
        if (!name) return;
        setSelectedItems(prev => 
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        );
    };

    const selectedDetails = useMemo(() => {
        const toDelete = selectedItems.filter(name => {
            const target = ingredients.find(ing => ing.ingName === name);
            return target && target.matchedColor !== 'N';
        });
        const toAdd = selectedItems.filter(name => {
            const target = ingredients.find(ing => ing.ingName === name);
            return target && target.matchedColor === 'N';
        });
        return { toDelete, toAdd };
    }, [selectedItems, ingredients]);

    // ✅ 수정된 액션 핸들러 (새로고침 제거, 순차 처리 보장)
    const handleAction = async (type) => {
        const { toDelete, toAdd } = selectedDetails;
        
        // 쿠팡 바로가기는 서버 통신 없이 바로 실행
        if (type === 'COUPANG') {
            if (toAdd.length > 0) {
                window.open(`https://www.coupang.com/np/search?q=${encodeURIComponent(toAdd[0])}`, '_blank');
            }
            return;
        }

        setIsProcessing(true); // 로딩 시작

        try {
            if (type === 'ALL') {
                // 순차적으로 처리 (삭제 → 추가)
                if (toDelete.length > 0) {
                    await onFinish(toDelete);
                }
                if (toAdd.length > 0) {
                    await onAddMissing(toAdd);
                }
                alert("냉장고 정리가 완료되었습니다! ✨");
            } else if (type === 'ADD_ONLY') {
                await onAddMissing(toAdd);
                alert("선택한 재료가 냉장고에 추가되었습니다! ✅");
            }

            // ✅ 서버 통신 완료 후 모달 닫기 (새로고침 삭제)
            if (onClose) {
                onClose(); // 모달 닫기 → Home.jsx의 쿼리 무효화가 자동 실행됨
            }

        } catch (err) {
            console.error("Action 처리 중 오류:", err);
            alert("처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsProcessing(false); // 로딩 종료
        }
    };

    return (
        <div css={s.finishContainer}>
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

            <div className="ingredient-list">
                {sortedIngredients.length === 0 ? (
                    <div style={{ width: '100%', padding: '60px 20px', textAlign: 'center', color: '#bbb', fontWeight: '800' }}>
                        불러올 재료 정보가 없습니다 🧐
                    </div>
                ) : (
                    sortedIngredients.map((ing, idx) => {
                        const isMissing = ing.matchedColor === 'N';
                        const isChecked = selectedItems.includes(ing.ingName);
                        const isHovered = hoveredItem === ing.ingName;
                        const themeColor = isMissing ? '33, 150, 243' : '255, 112, 67';

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

            <div className="bottom-action">
                {selectedItems.length === 0 ? (
                    <button 
                        className="complete-btn default" 
                        onClick={onClose}
                        disabled={isProcessing}
                    >
                        그대로 완료하기
                    </button>
                ) : (selectedDetails.toDelete.length > 0 && selectedDetails.toAdd.length > 0) ? (
                    <button 
                        className="complete-btn finish" 
                        onClick={() => handleAction('ALL')}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "처리 중..." : "냉장고 정리 하기 ✨"}
                    </button>
                ) : selectedDetails.toDelete.length > 0 ? (
                    <button 
                        className="complete-btn finish" 
                        onClick={() => handleAction('ALL')}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "처리 중..." : `${selectedDetails.toDelete.length}개의 재료 비우기`}
                    </button>
                ) : (
                    <div className="btn-row">
                        <button 
                            className="complete-btn add" 
                            onClick={() => handleAction('ADD_ONLY')} 
                            style={{ flex: 1.2 }}
                            disabled={isProcessing}
                        >
                            {isProcessing ? "추가 중..." : `${selectedDetails.toAdd.length}개의 재료 추가`}
                        </button>
                        {selectedDetails.toAdd.length === 1 && (
                            <button 
                                className="complete-btn shop" 
                                onClick={() => handleAction('COUPANG')} 
                                style={{ flex: 0.8 }}
                                disabled={isProcessing}
                            >
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
