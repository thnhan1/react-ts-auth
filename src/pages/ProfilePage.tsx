import { useAuthStore } from "../stores/auth";

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  return <div>Profile: {user?.email}</div>;
}

