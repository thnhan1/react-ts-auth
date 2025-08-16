import { create } from "zustand";
type AuthState = {
    accessToken: string | null;
    user: {id: number; email: string; roles: string[] } | null;
    setAccessToken: (t: string | null) => void;
    setUser: (u : AuthState['user']) => void;
    reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,
    setAccessToken: (t) => set({accessToken: t}),
    setUser: (u) => set({user: u}),
    reset: () => set({accessToken: null, user: null}),
}));
