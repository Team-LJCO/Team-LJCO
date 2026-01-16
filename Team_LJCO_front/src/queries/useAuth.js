import { useMutation } from '@tanstack/react-query';
import { adminLogin, getTestToken } from '../apis/adminApi';

// 로그인 뮤테이션
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ username, password }) => adminLogin(username, password),
  });
};

// 테스트 토큰 발급
export const useTestTokenMutation = () => {
  return useMutation({
    mutationFn: getTestToken,
  });
};
