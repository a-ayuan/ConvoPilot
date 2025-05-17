import { create } from 'zustand';

interface User { email: string }

interface AuthState {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  login: user => set({ user }),
  logout: () => set({ user: null })
}));
