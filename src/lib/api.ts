import axios from "axios";
import { useAuthStore } from "../stores/auth";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// axios instance
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token ) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const refreshAuthLogic = async (failedRequest: any) => {
    try {
        const res = await axios.post(
            `/auth/refresh`,
            {},
            {
                withCredentials: true
            }
        )
        const newToken = res.data?.accessToken as string;
        useAuthStore.getState().setAccessToken(newToken);

        failedRequest.response.config.headers['Authorization'] = `Bearer ${newToken}`;
        return Promise.resolve();
    } catch (error) {
        useAuthStore.getState().reset();
        return Promise.reject(error);
    }
}

// only refresh when 401. lib queue & retry
createAuthRefreshInterceptor(api, refreshAuthLogic, {
    statusCodes: [401]
})