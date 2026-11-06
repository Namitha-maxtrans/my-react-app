import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/axios";
import toast from "react-hot-toast";
import { login } from "../features/authSlice";
import { useAppDispatch } from "../hooks/reduxHooks";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch=useAppDispatch()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onBlur",
  });

  // Submit Login Form
  const onSubmit = async (data: LoginFormData) => {
    try {
      // Send email and password to NestJS API
      const response = await api.post("/auth/login", data);

      // Store JWT token
      localStorage.setItem("access_token", response.data.access_token);

      // Store logged-in user details
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(login(response.data.user));
      console.log("Login API user:", response.data.user);

      toast.success("Login successful!");

      navigate("/employees");
    } catch (error: any) {
      console.error("Login error:", error);

      const message = error.response?.data?.message;

      toast.error(
        Array.isArray(message)
          ? message.join(", ")
          : message || "Invalid email or password",
      );
    }
  };

  return (
    <div className="min-h-screen bg-cyan-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl text-center text-gray-700 font-semibold mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-600"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-600"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Show Password */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="cursor-pointer"
            />

            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show Password
            </label>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-700 text-white py-3 rounded-md font-semibold text-sm hover:bg-cyan-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "SIGN IN"}
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-7 space-y-3 text-sm">
          <p>
            <Link
              to="/forgot-password"
              className="text-cyan-700 hover:underline"
            >
              Forgot Username / Password?
            </Link>
          </p>

          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-700 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


