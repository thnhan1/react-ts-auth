import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { clearAccessToken, setAccessToken } from "./tokenMemory";

interface AuthContextProps {
    accessToken: string | null;
    login: (identifier: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, _setAccessToken] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const res = await api.post('/auth/refresh');
                const token = res.data.accessToken;
                setAccessToken(token);
                _setAccessToken(token);
            } catch (error) {
                clearAccessToken();
                _setAccessToken(null);
            } finally{
                setLoading(false)
            }
        }
        fetchAccessToken();
    }, []);
    

    const login = async (identifier: string, password: string) => {
        const res = await api.post('/auth/login', { identifier, password });
        const token = res.data.accessToken;
        setAccessToken(token);
        _setAccessToken(token);
        // refresh token saved in httponly cookie
    };

    const logout = async () => {
        await api.post('/auth/logout');
        clearAccessToken();
        _setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{
            accessToken,
            login,
            logout,
            isAuthenticated: !!accessToken,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}