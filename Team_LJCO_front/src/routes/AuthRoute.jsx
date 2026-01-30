import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/** [로직]: 로그인 여부를 체크하여 비로그인 시 로그인 페이지로 강제 이동 */
function AuthRoute() {
    const isLogin = !!localStorage.getItem("accessToken");

    if (!isLogin) {
        alert("로그인이 필요한 서비스입니다.");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // 로그인 상태면 하위 페이지(Home 등)를 보여줌
}
export default AuthRoute;
