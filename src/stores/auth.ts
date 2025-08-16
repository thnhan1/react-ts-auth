import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  user: { id: number; email: string; roles: string[] } | null;
  initialized: boolean;
  setAccessToken: (t: string | null) => void;
  setUser: (u: AuthState["user"]) => void;
  setInitialized: (v: boolean) => void;

  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      initialized: false,
      setAccessToken: (t) => set({ accessToken: t }),
      setUser: (u) => set({ user: u }),
      setInitialized: (v) => set({ initialized: v }),

      reset: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "auth", // key in localStorage
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);

