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
export const useRecipesQuery = (userId, options = {}) => {
  return useQuery({
    // userId가 바뀔 때마다 쿼리를 다시 실행하도록 키에 추가합니다.
    queryKey: [...queryKeys.recipes.list(), userId], 
    queryFn: async () => {
      // 💡 주소창에 직접 쳤을 때 성공했던 그 주소(/api/recipes/all)를 직접 찌릅니다.
      const response = await fetch(`http://localhost:8080/api/recipes/all?userId=${userId || 0}`);
      if (!response.ok) throw new Error('레시피 로드 실패');
      return response.json();
    },
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
