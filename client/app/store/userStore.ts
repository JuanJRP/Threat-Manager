import { create } from "zustand";

interface UserState {
  user: {
    id: string | number;
    email: string;
    role: string;
  };
  setUser: (user: { id: string | number; email: string; role: string }) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {
    id: "",
    email: "",
    role: "",
  },
  setUser: (user) => set({ user }),
}));

export default useUserStore;