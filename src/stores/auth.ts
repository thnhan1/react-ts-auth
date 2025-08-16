import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  user: { id: number; email: string; roles: string[] } | null;
  setAccessToken: (t: string | null) => void;
  setUser: (u: AuthState["user"]) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAccessToken: (t) => set({ accessToken: t }),
      setUser: (u) => set({ user: u }),
      reset: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "auth", // key in localStorage
    },
  ),
);

