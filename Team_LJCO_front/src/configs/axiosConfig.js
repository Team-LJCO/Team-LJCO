import axios from 'axios';

// ==========================================
// 1. 일반 사용자용 인스턴스 
// ==========================================
export const api = axios.create({
  baseURL: "http://localhost:8080", //
  timeout: 50000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); //
  if (token) config.headers.Authorization = `Bearer ${token}`; //
  return config;
}, (error) => Promise.reject(error));

// ==========================================
// 2. 어드민 전용 인스턴스 
// ==========================================
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', //
  timeout: 1000000, //
});

axiosInstance.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken'); //
  if (adminToken) config.headers.Authorization = `Bearer ${adminToken}`; //
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러 시 어드민 로그인으로 리다이렉트 로직
    if (error.response?.status === 401 && !error.config.url.includes('/admin/login')) {
      localStorage.removeItem('adminToken'); //
      localStorage.removeItem('auth-storage'); //
      window.location.href = '/admin/login'; //
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; // 어드민 담당자 코드의 호환성을 위해 추가