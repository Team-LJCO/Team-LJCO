import { api } from "../configs/axiosConfig";

/** [API]: OAuth2 로그인 성공 후 사용자 정보 가져오기 */
export const getUserInfo = () => api.get("/api/user/me");

/** [API]: 로그아웃 (서버 세션 또는 토큰 무효화) */
export const logout = () => api.post("/api/auth/logout");
