// src/features/auth/LoginPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./features/auth/LoginForm";
import { useAuthStore } from "./stores/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.accessToken);
  const initialized = useAuthStore((s) => s.initialized);

  useEffect(() => {
    if (initialized && token) navigate("/");
  }, [initialized, token, navigate]);

  const handleSuccess = () => {
    navigate("/"); // chuyển vào dashboard sau khi login thành công
  };

  if (!initialized) {
    return <div />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
}

