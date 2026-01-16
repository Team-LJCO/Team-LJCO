import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllIngredients,
  searchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getAllCategories,
} from '../apis/adminApi';
import { queryKeys } from './queryKeys';

// 재료 목록 조회
export const useIngredientsQuery = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.ingredients.list(),
    queryFn: getAllIngredients,
    ...options,
  });
};

// 재료 검색
export const useSearchIngredientsQuery = (keyword, options = {}) => {
  return useQuery({
    queryKey: queryKeys.ingredients.search(keyword),
    queryFn: () => searchIngredients(keyword),
    enabled: !!keyword,
    ...options,
  });
};

// 카테고리 목록 조회 (자주 변경되지 않으므로 staleTime 길게 설정)
export const useCategoriesQuery = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 30, // 30분
    ...options,
  });
};

// 재료 생성 뮤테이션
export const useCreateIngredientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ingredientData) => createIngredient(ingredientData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
    },
  });
};

// 재료 수정 뮤테이션
export const useUpdateIngredientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ingId, ingredientData }) => updateIngredient(ingId, ingredientData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
    },
  });
};

// 재료 삭제 뮤테이션
export const useDeleteIngredientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ingId) => deleteIngredient(ingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
    },
  });
};
