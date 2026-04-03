import { Lock, Mail, User2Icon, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import api from "../configs/api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload =
        state === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const { data } = await api.post(`/api/users/${state}`, payload);

      dispatch(login({ token: data.token, user: data.user }));
      localStorage.setItem("token", data.token);

      toast.success(data.message);
      navigate("/app");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Image/Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center p-8">
          <div className="text-center">


            {/* You can replace this SVG with your own image */}

            
            <div className="mb-6">
              <svg
                className="w-full max-w-sm mx-auto"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="50"
                  y="50"
                  width="300"
                  height="200"
                  rx="10"
                  fill="#f3f4f6"
                  stroke="#d1d5db"
                  strokeWidth="2"
                />
                <rect
                  x="70"
                  y="70"
                  width="120"
                  height="40"
                  rx="5"
                  fill="#3b82f6"
                />
                <rect
                  x="70"
                  y="125"
                  width="260"
                  height="20"
                  rx="5"
                  fill="#e5e7eb"
                />
                <rect
                  x="70"
                  y="155"
                  width="220"
                  height="20"
                  rx="5"
                  fill="#e5e7eb"
                />
                <rect
                  x="70"
                  y="185"
                  width="180"
                  height="20"
                  rx="5"
                  fill="#e5e7eb"
                />
                <circle cx="320" cy="100" r="30" fill="#10b981" />
                <path
                  d="M305 100 L315 115 L335 90"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="200"
                  y="40"
                  textAnchor="middle"
                  className="text-lg font-semibold"
                  fill="#374151"
                >
                  Resume Builder Pro
                </text>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Build Your Professional Resume
            </h2>
            <p className="text-gray-600 max-w-md">
              Create stunning resumes that stand out to employers. Easy to use,
              professionally designed templates.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {state === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-600">
                {state === "login"
                  ? "Sign in to continue to your resume builder"
                  : "Start building your professional resume today"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {state !== "login" && (
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <User2Icon className="size-5 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="size-5 text-gray-600" />
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Lock className="size-5 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4 inline mr-1" />
                    ) : (
                      <Eye className="size-4 inline mr-1" />
                    )}
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {state === "login" ? "Signing in..." : "Creating account..."}
                  </span>
                ) : state === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => (prev === "login" ? "register" : "login"))
                  }
                  className="w-full text-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {state === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <span className="font-semibold text-blue-600 hover:text-blue-800">
                    {state === "login" ? "Sign up now" : "Sign in here"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;