import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import LoginPage from '../pages/LoginPage';
import { UserManagement, IngredientManagement, RecipeManagement } from '../pages/admin';
import useAuthStore from '../stores/authStore';

// TODO: 추후 구현 예정인 페이지들
const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h2>대시보드</h2>
    <p>관리자 대시보드입니다.</p>
  </div>
);

// 인증 필요 라우트 보호 컴포넌트
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const adminToken = localStorage.getItem('adminToken');

  if (!isAuthenticated && !adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* 관리자 로그인 페이지 */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* 루트 경로는 /admin/dashboard로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* 관리자 레이아웃 (인증 필요) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* 기본 경로는 dashboard로 리다이렉트 */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        {/* 대시보드 */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* 사용자 관리 */}
        <Route path="users" element={<UserManagement />} />

        {/* 재료 관리 */}
        <Route path="ingredients" element={<IngredientManagement />} />

        {/* 레시피 관리 */}
        <Route path="recipes" element={<RecipeManagement />} />
      </Route>

      {/* 알 수 없는 경로는 로그인 페이지로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
