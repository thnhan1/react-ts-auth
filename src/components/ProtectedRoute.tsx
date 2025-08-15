import React from 'react';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Hiển thị loading khi trạng thái xác thực chưa hoàn tất
    return null;
  }

  if (!isAuthenticated) {
    return <div>Bạn cần đăng nhập để truy cập!</div>;
  }
  

  return <>{children}</>;
};

export default ProtectedRoute;