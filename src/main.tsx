import { QueryClientProvider } from "@tanstack/react-query";
import { api } from "./lib/api";
import { useAuthStore } from "./stores/auth";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import {createRoot} from "react-dom/client";

async function bootstrap() {
  try {
    const res = await api.post('/auth/refresh', {});
    useAuthStore.getState().setAccessToken(res.data.accessToken);
  } catch (error) {
    useAuthStore.getState().reset();
}}

await bootstrap();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)