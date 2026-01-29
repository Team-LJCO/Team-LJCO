import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "../react-query/queries/queryKeys"; 

export const useFridgeHomeQuery = (isLogin, limit = 30) => {
  return useQuery({
    queryKey: [queryKeys.INGREDIENTS, "FRIDGE_HOME"],
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
