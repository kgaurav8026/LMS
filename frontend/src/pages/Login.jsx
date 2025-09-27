import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${serverUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for token
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      dispatch(setUserData(data));
      // Show success toast
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect after a delay to allow toast visibility
      setTimeout(() => {
        navigate("/"); // Navigate to home
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center p-4">
      <div
        class20
        className="w-full max-w-[600px] min-h-[450px] bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden"
      >
        <div className="flex-1 bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-center space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-4 sm:mb-6 text-center">
            Please sign in to your account
          </p>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057 .458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="text-center my-2 text-gray-500">OR</div>
          <button
            type="button"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center text-sm sm:text-base"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4285F4"
                d="M24 9.5c3.32 0 6.29 1.17 8.63 3.45l6.42-6.42C34.287 3.198 29.63 1 24 1 14.58 1 6.73 6.01 3.07 13.5l7.76 6.01C12.74 15.37 17.89 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.99 24.1c0-1.45-.12-2.85-.33-4.2H24v7.98h11.61c-.52 2.68-2.04 4.96-4.35 6.49l6.92 5.36C43.94 37.81 46.99 32.51 46.99 24.1z"
              />
              <path
                fill="#FBBC05"
                d="M10.83 28.81c-.37-1.09-.58-2.25-.58-3.41s.21-2.32.58-3.41l-7.76-6.01C2.05 18.83 1 22.12 1 25.5s1.05 6.67 3.07 9.42l7.76-6.01z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.48 0 11.93-2.15 15.89-5.81l-6.92-5.36c-1.91 1.28-4.36 2.04-7.97 2.04-6.17 0-11.39-4.17-13.26-9.76l-7.76 6.01C6.73 41.99 14.58 48 24 48z"
              />
            </svg>
            Sign in with Google
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </p>
          </div>
          <div className="mt-2 text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="hidden md:flex md:flex-1 bg-black flex-col items-center justify-center text-white">
          <div className="text-6xl font-bold mb-2">VC</div>
          <div className="text-xl font-semibold">VIRTUAL COURSES</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
