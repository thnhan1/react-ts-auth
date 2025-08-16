import React from 'react';
import { useAuthStore } from '../stores/auth';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = useAuthStore((s) => s.accessToken);

  return token ? <Outlet /> : <Navigate to={"/login"} replace />;
}