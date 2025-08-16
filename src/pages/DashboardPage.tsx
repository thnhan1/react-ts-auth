import React from "react";
import { useAuthStore } from "../stores/auth";

export function DashboardPage() {
  const {user} = useAuthStore();

  return (
    <div className="p-8 bg-red-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-4 text-lg">
        Hi {user?.email}
      </div>
      <div className="text-gray-700">
        {user?.roles}
      </div>
    </div>
  );
}
