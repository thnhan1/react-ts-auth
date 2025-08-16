import {Link} from "react-router-dom";
export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
            <p className="text-lg text-gray-700 mb-6">The page you are looking for does not exist.</p>
            <img src="public/for-you.jpg" alt="" className="w-64 h-64 object-cover rounded shadow" />
        <Link to="/" className="rounded bg-blue-200 px-2 py-2 mt-4 text-blue-500 hover:underline">
            Home
        </Link>
        </div>
    )
}