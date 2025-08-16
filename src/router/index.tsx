import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { ProfilePage } from "../pages/ProfilePage";
import { SettingsPage } from "../pages/SettingsPage";
import NotFoundPage from "../components/not-found";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        element: <ProtectedRoute />,
        path: "/",
        children: [
            { index: true, element: <MainLayout children={<DashboardPage />} /> },
            { path: "/dashboard", element: <MainLayout children={<DashboardPage />} /> },
            { path: "/profile", element: <MainLayout children={<ProfilePage />} /> },
            { path: "/settings", element: <MainLayout children={<SettingsPage />} /> },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
