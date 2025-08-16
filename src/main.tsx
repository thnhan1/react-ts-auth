import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import { api } from "./lib/api";
import { queryClient } from "./lib/queryClient";
import { useAuthStore } from "./stores/auth";

async function bootstrap() {
  await new Promise((resolve) => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      unsub();
      resolve(null);
    });
  });

  try {
    const res = await api.post("/auth/refresh", {});
    useAuthStore.getState().setAccessToken(res.data.accessToken);
    if (res.data.user) {
      useAuthStore.getState().setUser(res.data.user);
    }
  } catch {
    useAuthStore.getState().reset();
  } finally {
    useAuthStore.getState().setInitialized(true);

  }
}

await bootstrap();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
