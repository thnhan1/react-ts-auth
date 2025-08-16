import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

export function ProtectedRoute() {
  const { accessToken, initialized } = useAuthStore((s) => ({
    accessToken: s.accessToken,
    initialized: s.initialized,
  }));

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
