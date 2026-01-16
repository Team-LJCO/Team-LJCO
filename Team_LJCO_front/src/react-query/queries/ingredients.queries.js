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
