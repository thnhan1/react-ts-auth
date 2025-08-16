import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

export function ProtectedRoute() {
  // Select slices separately to avoid creating a new object each render
  const accessToken = useAuthStore((s) => s.accessToken);
  const initialized = useAuthStore((s) => s.initialized);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
