import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_KEYS } from "./queryKeys"; 

export const useFridgeHomeQuery = (isLogin) => {
  return useQuery({
    queryKey: [QUERY_KEYS.INGREDIENTS, "FRIDGE_HOME"],
    enabled: !!isLogin,
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `http://localhost:8080/api/user/ingredients?limit=${limit}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      return res.data; 
    },
  });
};
