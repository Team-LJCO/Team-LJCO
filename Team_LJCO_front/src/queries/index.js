/**
 * 관리자용 React Query 훅
 * - adminApi (axiosInstance)를 사용
 * - adminToken으로 인증
 * - 관리자 페이지에서만 사용 (UserManagement, IngredientManagement, RecipeManagement 등)
 */

// Query Keys
export { queryKeys } from './queryKeys';

// User Queries
export {
  useUsersQuery,
  useSearchUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from './useUsers';

// Ingredient Queries
export {
  useIngredientsQuery,
  useSearchIngredientsQuery,
  useCategoriesQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} from './useIngredients';

// Auth Mutations
export { useLoginMutation, useTestTokenMutation } from './useAuth';

// Recipe Queries
export {
  useRecipesQuery,
  useSearchRecipesQuery,
  useRecipeDetailQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from './useRecipes';
