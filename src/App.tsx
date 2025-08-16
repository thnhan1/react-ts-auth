// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Các route cần đăng nhập */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div> Dash board</div>} />
          <Route path="/profile" element={<div>Profile page</div>} />
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}