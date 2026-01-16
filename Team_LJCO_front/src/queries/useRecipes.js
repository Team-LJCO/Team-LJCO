import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllRecipes,
  searchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} from '../apis/adminApi';
import { queryKeys } from './queryKeys';

// 레시피 목록 조회
export const useRecipesQuery = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.recipes.list(),
    queryFn: getAllRecipes,
    ...options,
  });
};

// 레시피 검색
export const useSearchRecipesQuery = (keyword, options = {}) => {
  return useQuery({
    queryKey: queryKeys.recipes.search(keyword),
    queryFn: () => searchRecipes(keyword),
    enabled: !!keyword,
    ...options,
  });
};

// 레시피 상세 조회
export const useRecipeDetailQuery = (rcpId, options = {}) => {
  return useQuery({
    queryKey: ['recipes', 'detail', rcpId],
    queryFn: () => getRecipeById(rcpId),
    enabled: !!rcpId,
    ...options,
  });
};

// 레시피 생성 뮤테이션
export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeData) => createRecipe(recipeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
    },
  });
};

// 레시피 수정 뮤테이션
export const useUpdateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rcpId, recipeData }) => updateRecipe(rcpId, recipeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
    },
  });
};

// 레시피 삭제 뮤테이션
export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rcpId) => deleteRecipe(rcpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
    },
  });
};
