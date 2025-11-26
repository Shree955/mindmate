import { Link } from "react-router-dom";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
        <h2 className="text-3xl font-bold text-purple-800 mb-8">Welcome to MindMate</h2>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-md">
          Join our supportive community or sign in to continue your mental wellness journey.
        </p>

        <div className="flex space-x-6">
          <Link
            to="/login"
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-gray-200 text-purple-700 rounded-full hover:bg-gray-300 transition"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
