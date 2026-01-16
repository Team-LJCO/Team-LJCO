/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { s } from "./styles";

function RecipeDetailModal({ rcpId, rcpName, onClose }) {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSteps = async () => {
            try {
                // 💡 DB rcp_steps 테이블 조회 API (백엔드 구현 필요)
                const res = await axios.get(`http://localhost:8080/api/recipes/${rcpId}/steps`);
                setSteps(res.data); // [{stepNo: 1, stepDesc: "...", stepImgUrl: "..."}, ...]
            } catch (err) {
                console.error("조리 과정 로드 실패", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSteps();
    }, [rcpId]);

    return (
        <div css={s.detailOverlay} onClick={onClose}>
            <div css={s.detailContent} onClick={(e) => e.stopPropagation()}>
                <button className="back-btn" onClick={onClose}>← 검색 결과로 돌아가기</button>
                <h2 style={{ marginBottom: '30px', fontSize: '22px' }}>{rcpName} 조리 순서</h2>
                
                {loading ? (
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>조리법을 읽어오는 중...</div>
                ) : (
                    <div className="steps-list">
                        {steps.map((step) => (
                            <div key={step.stepNo} className="step-item">
                                <div className="step-num">STEP {step.stepNo}</div>
                                {step.stepImgUrl && (
                                    <div className="step-img">
                                        <img src={step.stepImgUrl} alt="" />
                                    </div>
                                )}
                                <div className="step-desc">{step.stepDesc}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeDetailModal;