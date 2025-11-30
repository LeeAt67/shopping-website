import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, User } from '@/types';

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      
      login: async (username: string, password: string): Promise<boolean> => {
        // 模拟登录验证
        if (username && password) {
          const user: User = {
            id: 1,
            username,
            email: `${username}@example.com`,
            isLoggedIn: true
          };
          set({ user });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null });
      },
      
      isLoggedIn: () => {
        return get().user?.isLoggedIn ?? false;
      }
    }),
    {
      name: 'user-storage',
    }
  )
);
