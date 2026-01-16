import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // 상태
      adminToken: null,
      user: null,
      isAuthenticated: false,

      // 액션
      login: (token, userData) => {
        localStorage.setItem('adminToken', token);
        set({
          adminToken: token,
          user: userData,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('auth-storage');
        set({
          adminToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        adminToken: state.adminToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
