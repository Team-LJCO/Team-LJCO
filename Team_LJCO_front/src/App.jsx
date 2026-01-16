/** @jsxImportSource @emotion/react */
import { Routes, Route, Navigate } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './configs/queryClient';

// 컴포넌트 임포트
import AdminRoutes from './routes/adminRoutes'; 
import Intro from "./pages/Intro/Intro"; 
import Home from "./pages/Home/Home"; 
import Recipe from "./pages/Recipe/Recipe"; 
import LoginPage from "./pages/Login/LoginPage"; 
import OAuth2Callback from "./pages/Login/OAuth2Callback"; 
import { fontImport } from "./pages/Home/styles"; 

const globalStyles = css`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    background-color: #F2E8DA;
    overflow-x: hidden;
  }
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyles} />
      <Global styles={fontImport} />
      
      <Routes>
        {/* === 유저 영역 === */}
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/oauth2/callback" element={<OAuth2Callback />} />

        {/* === 어드민 영역 === */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* 잘못된 경로는 홈으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;