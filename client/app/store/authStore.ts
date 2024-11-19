import { create } from "zustand";

export interface User {
  id: number;
  email: string;
  role: string[]; // Asumiendo que 'role' es un array de cadenas
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  setAccessToken: (value: string) => void;
  user: User | null;
  setUser: (newUser: any) => void;
  setIsAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: "",
  setAccessToken: (value) => set({ accessToken: value }),
  user: null,
  setUser: (newUser) =>
    set({ user: { id: newUser.id, email: newUser.email, role: newUser.role } }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
}));
