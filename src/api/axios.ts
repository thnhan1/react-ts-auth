import axios from "axios";
import { getAccessToken, setAccessToken } from "../auth/tokenMemory";

const api = axios.create({
    baseURL: '/api',
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

let isRefreshing = false;
let subscribers : Array<(token: string) => void> = [];

function subscribe(cb: (token: string) => void) {
    subscribers.push(cb);
}

function onRefreshed(token: string) {
    subscribers.forEach(cb => cb(token));
    subscribers = [];
}

api.interceptors.response.use(
    (response) => response,
    async(error) => {
        const {config, response} = error;
        if (response?.status === 401 && !config._retry) {
            config._retry = true;
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const res = await api.post('/auth/refresh');
                    const newToken = res.data.accessToken;
                    setAccessToken(newToken);
                    onRefreshed(newToken);
                } catch (e) {
                    // handle logout if refresh failed
                } finally {
                    isRefreshing = false;
                }
            }
            return new Promise((resolve) => {
                subscribe((token : string) => {
                    config.headers['Authorization'] = `Bearer ${token}`;
                    resolve(api(config));
                })
            })
        }
        return Promise.reject(error);
    }
)
export default api;