
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BlurContainer from "../components/ui/BlurContainer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Admin login check
    if (email === "admin@skyjourney.com" && password === "admin123") {
      // Redirect to admin dashboard
      navigate("/admin");
    } else {
      // In a real app, you would validate credentials with a backend
      setError("Invalid email or password");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-6">
          <BlurContainer className="mb-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to your SkyJourney account to manage your bookings and enjoy personalized features.
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    placeholder="Enter your email"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-sm text-sky-600 hover:text-sky-700">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-sky-600 hover:text-sky-700 font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center mb-4">
                <span className="text-sm text-gray-500">Or continue with</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M12 5c1.617 0 3.082.602 4.211 1.594.103.088.208.176.307.267l2.572-2.572C17.115 2.584 14.677 1.5 12 1.5c-3.866 0-7.1 2.244-8.664 5.495L6.3 9.37A6.475 6.475 0 0 1 12 5Z"
                    />
                    <path
                      fill="#34A853"
                      d="M5 12c0-.85.164-1.66.462-2.402L2.5 6.995C1.545 8.445 1 10.16 1 12c0 1.84.546 3.556 1.5 5.005l2.962-2.602A6.479 6.479 0 0 1 5 12Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12 19a6.477 6.477 0 0 1-5.7-3.368L3.339 17.99A10.459 10.459 0 0 0 12 22.5c2.68 0 5.117-1.054 7.057-2.773l-2.74-2.493C15.256 18.383 13.674 19 12 19Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M19 12c0-.612-.076-1.203-.193-1.777h-6.811v3.527h3.936a3.45 3.45 0 0 1-1.45 2.223l2.714 2.516C18.885 16.582 19 14.432 19 12Z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#1877F2"
                      d="M24 12.073c0-5.8-4.698-10.5-10.5-10.5s-10.5 4.7-10.5 10.5c0 5.244 3.84 9.584 8.86 10.373v-7.337H8.313v-3.036h3.547V9.91c0-3.498 2.08-5.437 5.278-5.437 1.527 0 3.124.273 3.124.273v3.437h-1.76c-1.735 0-2.275 1.078-2.275 2.183v2.623h3.874l-.62 3.036h-3.254v7.337C20.16 21.658 24 17.317 24 12.073Z"
                    />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </BlurContainer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
