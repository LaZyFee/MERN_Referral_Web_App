import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import showToast from "../../utils/ShowToast";
import { useAuth } from "../../store/useAuthStore";
import { useForm } from "react-hook-form";
import { HiUserGroup } from "react-icons/hi2";
import { Lock, Eye, EyeOff, AlertCircle, Loader2, User } from "lucide-react";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleLogin = async (data) => {
    const { username, password } = data;
    setLoginError("");

    try {
      await login(username, password);

      showToast({
        title: "Success",
        text: "Login successful",
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const msg = "Invalid username or password, please try again";
        setLoginError(msg);

        showToast({
          title: "Error",
          text: msg,
          icon: "error",
        });
      } else {
        const msg = error.message || "Error logging in";
        setLoginError(msg);

        showToast({
          title: "Error",
          text: msg,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-blue-50 to-pink-100 flex items-center justify-center py-24 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 to-blue-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <HiUserGroup className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-indigo-100">Sign in to access your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your user name"
                  {...register("username", {
                    required: "User name is required",
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{loginError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
