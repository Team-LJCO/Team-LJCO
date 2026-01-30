import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../configs/axiosConfig";
import { QUERY_KEYS } from "../queries/queryKeys";

export const useDeleteIngredientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userIngId) => {
      await api.delete(`/api/user/ingredients/${userIngId}`);
    },
    onSuccess: () => {
      // 1. 재료 목록 새로고침
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INGREDIENTS });
      // 2. 레시피 목록도 새로고침 (이걸 추가해야 대시보드 숫자가 즉시 바뀝니다!)
      queryClient.invalidateQueries({ queryKey: ["recipes"] }); 
    },
  });
};
