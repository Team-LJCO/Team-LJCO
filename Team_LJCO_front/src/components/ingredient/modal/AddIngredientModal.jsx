/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { s } from "./styles";

function AddIngredientModal({ onClose }) {
    const [keyword, setKeyword] = useState("");
    const [dbList, setDbList] = useState([]);

    // 재료 검색 로직
    useEffect(() => {
        if (!keyword.trim()) { setDbList([]); return; }
        const timer = setTimeout(() => {
            axios.get(`http://localhost:8080/api/ingredients/search?keyword=${keyword}`)
                .then(res => setDbList(res.data))
                .catch(err => console.error(err));
        }, 300);
        return () => clearTimeout(timer);
    }, [keyword]);

    // 💡 재료 클릭 시 바로 등록 (수량/날짜 입력 없이)
    const handleAdd = async (ingId) => {
        const token = localStorage.getItem("AccessToken");
        try {
            await axios.post("http://localhost:8080/api/user/ingredients", 
                { ingId: ingId }, // 수량이나 기한 없이 ID만 전송
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("냉장고에 쏙 넣었습니다!");
            onClose(); // 모달 닫고 새로고침
        } catch (err) {
            alert("이미 냉장고에 있는 재료이거나 등록 실패!");
        }
    };

    return (
        <div css={s.modalOverlay} onClick={onClose}>
            <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <div css={s.modalHeader}>
                    <h2>식재료 담기 🛒</h2>
                    <button onClick={onClose}>×</button>
                </div>
                
                <input 
                    css={s.searchBox} 
                    placeholder="재료 이름을 입력하세요 (예: 간소고기)" 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)}
                    autoFocus
                />

                <div css={s.resultList}>
                    {dbList.map(item => (
                        <div key={item.ingId} css={s.itemCard(false)} onClick={() => handleAdd(item.ingId)}>
                            <img 
                                src={`http://localhost:8080/images/${item.ingImgUrl}`} 
                                alt={item.ingName} 
                                onError={(e) => e.target.src = "http://localhost:8080/images/dicoahdma.png"}
                            />
                            <div className="ing-name">{item.ingName}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AddIngredientModal;