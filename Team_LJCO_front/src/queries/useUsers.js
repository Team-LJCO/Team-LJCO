import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, searchUsers, updateUserRole, deleteUser } from '../apis/adminApi';
import { queryKeys } from './queryKeys';

// 사용자 목록 조회
export const useUsersQuery = (page = 0, size = 10, options = {}) => {
  return useQuery({
    queryKey: queryKeys.users.list({ page, size }),
    queryFn: () => getAllUsers(page, size),
    ...options,
  });
};

// 사용자 검색
export const useSearchUsersQuery = (params, options = {}) => {
  return useQuery({
    queryKey: queryKeys.users.search(params),
    queryFn: () => searchUsers(params),
    enabled: !!params?.keyword,
    ...options,
  });
};

// 역할 변경 뮤테이션
export const useUpdateUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: () => {
      // 사용자 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

// 사용자 삭제 뮤테이션
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};
