import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuth2Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. 현재 주소창(window.location.search)에서 직접 파라미터 추출
        const params = new URLSearchParams(window.location.search);
        const token = params.get("accessToken");
        const userId = params.get("userId");

        console.log("추출된 토큰 확인:", token);
        console.log("userId 확인 :", userId);
        console.log("entries:", [...params.entries()]);

        if (token) {

            localStorage.setItem("accessToken", token);
            console.log("로컬스토리지 저장 완료!");
            if(userId) {
                localStorage.setItem("userId",userId);
                  console.log("저장 후:", {
                    accessToken: localStorage.getItem("accessToken"),
                    userId: localStorage.getItem("userId"),
  });
            }


            window.location.replace("/home"); 
        } else {
            console.error("주소창에 토큰이 없습니다.");
            navigate("/"); // 실패 시 로그인 페이지나 메인으로
        }
    }, [navigate]);

    return <div>로그인 처리 중입니다. 잠시만 기다려주세요...</div>;
}

export default OAuth2Callback;