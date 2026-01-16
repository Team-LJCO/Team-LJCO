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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INGREDIENTS });
    },
  });
};
