import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuth2Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. 현재 주소창(window.location.search)에서 직접 파라미터 추출
        const params = new URLSearchParams(window.location.search);
        const token = params.get("accessToken");

        console.log("추출된 토큰 확인:", token);

        if (token) {
            // 2. 반드시 'accessToken' (소문자 a) 이름으로 저장 (axios 설정과 일치)
            localStorage.setItem("accessToken", token);
            console.log("로컬스토리지 저장 완료!");

            // 3. navigate 대신 location.replace를 쓰면 페이지를 새로고침하며 이동하므로 
            // axios가 저장된 토큰을 즉시 인식하여 로그인 상태가 반영됩니다.
            window.location.replace("/home"); 
        } else {
            console.error("주소창에 토큰이 없습니다.");
            navigate("/"); // 실패 시 로그인 페이지나 메인으로
        }
    }, [navigate]);

    return <div>로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
}

export default OAuth2Callback;