import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, logout } from "../apis/authApi";

/** [로직]: 현재 로그인한 사용자 상태 관리 */
export const useUserQuery = () => {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: getUserInfo,
        retry: false, // 로그인하지 않은 경우 재시도 방지
        staleTime: 1000 * 60 * 30, // 30분 동안 데이터 유지
    });
};

/** [로직]: 로그아웃 처리 및 캐시 무효화 */
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["userInfo"], null); // 로컬 사용자 정보 즉시 초기화
            window.location.href = "/"; // 홈으로 리다이렉트
        }
    });
};
