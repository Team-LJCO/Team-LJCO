import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import LoginPage from '../pages/LoginPage';
import { UserManagement, IngredientManagement, RecipeManagement } from '../pages/admin';
import useAuthStore from '../stores/authStore';

const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h2>대시보드</h2>
    <p>관리자 대시보드입니다.</p>
  </div>
);

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
      {/* 💡 중첩 라우팅이므로 /admin을 빼야 합니다. (실제 주소: /admin/login) */}
      <Route path="login" element={<LoginPage />} />

      {/* 💡 관리자 메인(/admin) 접속 시 대시보드로 리다이렉트 */}
      <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* /admin 접속 시 바로 dashboard가 보이게 설정 */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="ingredients" element={<IngredientManagement />} />
        <Route path="recipes" element={<RecipeManagement />} />
      </Route>

      {/* 알 수 없는 경로는 로그인 페이지로 */}
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;