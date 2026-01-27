/**
 * 일반 사용자용 재료 쿼리
 * - api (일반 axios 인스턴스)를 사용
 * - accessToken으로 인증
 * - 사용자 페이지에서만 사용 (Home.jsx 등)
 */
import { useQuery } from "@tanstack/react-query";
import { api } from "../../configs/axiosConfig";
import { QUERY_KEYS } from "./queryKeys";

export const useIngredientsQuery = (enabled) => {
  return useQuery({
    queryKey: QUERY_KEYS.INGREDIENTS,
    queryFn: async () => {
      const res = await api.get("/api/user/ingredients");
      return res.data;
    },
    enabled, // 로그인일 때만 호출
  });
};
