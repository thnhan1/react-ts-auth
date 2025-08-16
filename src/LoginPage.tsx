// src/features/auth/LoginPage.tsx
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./stores/auth";
import { LoginForm } from "./features/auth/LoginForm";

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.accessToken);

  // Nếu đã login thì tự chuyển qua dashboard
  if (token) {
    navigate("/");
  }

  const handleSuccess = () => {
    navigate("/"); // chuyển vào dashboard sau khi login thành công
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
}
