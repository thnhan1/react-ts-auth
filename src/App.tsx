// src/App.tsx
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import router from "./router";
export default function App() {

  return (
    <RouterProvider router={router} />
  )
}