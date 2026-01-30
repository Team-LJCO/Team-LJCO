import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuth2Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. 현재 주소창(window.location.search)에서 직접 파라미터 추출
        const params = new URLSearchParams(window.location.search);
        const token = params.get("accessToken");
        const userId = params.get("userId");

        if (token) {
            localStorage.setItem("accessToken", token);
            if(userId) {
                localStorage.setItem("userId", userId);
            }
            window.location.replace("/home");
        } else {
            navigate("/");
        }
    }, [navigate]);

    return <div>로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
}

export default OAuth2Callback;