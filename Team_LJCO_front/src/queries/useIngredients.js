import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
import { api } from '../configs/axiosConfig';
import {
  getAllIngredients,
  searchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getAllCategories,
} from '../apis/adminApi';
import { queryKeys } from './queryKeys';

export const useUseRecipeIngredientsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rcpId }) => 
        // api.post를 사용하여 인터셉터가 자동으로 토큰을 실어주게 함
        api.post(`/api/user/ingredients/use-recipe/${rcpId}`),
    
    onSuccess: () => {
      // 데이터 동기화를 위해 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.ingredients.all });
      queryClient.invalidateQueries({ queryKey: ['recipes'] }); 
      alert("요리가 완료되었습니다! 식재료가 냉장고에서 차감되었습니다.");
    },
    onError: (error) => {
      console.error("차감 실패:", error);
      alert("인증 세션이 만료되었거나 처리에 실패했습니다. 다시 로그인해 주세요.");
    }
  });
};

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
