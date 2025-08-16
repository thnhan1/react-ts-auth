import { Link } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import { api } from "../lib/api";
export default function Header() {
   const {user, setAccessToken} = useAuthStore();

   const handleLogout = async () => {
       await api.post("/auth/logout");
       setAccessToken(null);
   }

    return (
        <header className="flex gap-4 p-4 bg-gray-100">
            <Link to="/" className="text-gray-800 no-underline hover:underline">Home</Link>
            <Link to="/dashboard" className="text-gray-800 no-underline hover:underline">Dashboard</Link>
            <Link to="/profile" className="text-gray-800 no-underline hover:underline">Profile</Link>
            {user && (
                <div onClick={handleLogout} className="text-gray-800 no-underline hover:underline cursor-pointer">Logout</div>
            )}
        </header>
    )
}