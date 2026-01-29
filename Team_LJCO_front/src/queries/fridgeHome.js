import { useQuery } from "@tanstack/react-query";
import { api } from "../configs/axiosConfig";
import { queryKeys } from "../queries/queryKeys"; 

export const useFridgeHomeQuery = (isLogin, limit = 30) => {
  return useQuery({
    queryKey: [...queryKeys.ingredients.all, "FRIDGE_HOME",limit],
    enabled: !!isLogin,
    queryFn: async () => {
      const res =  await api.get(
        `/api/user/ingredients?limit=${limit}`);
        return res.data;
      },
  });
};
