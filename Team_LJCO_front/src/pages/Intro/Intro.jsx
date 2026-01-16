/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { s } from "./styles";
import logoImg from "../../assets/logo.png";
import closedImg from "../../assets/fridge-closed.png";
import openImg from "../../assets/fridge-open.png";

function Intro() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleStart = () => {
        if (isOpen) return;
        setIsOpen(true);
        setTimeout(() => navigate("/home"), 1000);
    };

    return (
        <div css={s.wrapper} onClick={handleStart}>
            <div css={s.logoWrapper}>
                <img src={logoImg} alt="로고" css={s.logoImg} />
            </div>

            <div css={s.mainCard}>
                <div css={s.fridgeBox}>
                    {/* 💡 s.fridgeImg(isOpen)으로 정확히 호출하여 에러 해결 */}
                    <img 
                        src={isOpen ? openImg : closedImg} 
                        alt="냉장고" 
                        css={s.fridgeImg(isOpen)}
                    />
                </div>
                <div css={s.guideText}>냉장고를 터치하세요</div>
            </div>
        </div>
    );
}

export default Intro;