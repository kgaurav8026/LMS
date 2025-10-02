import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverUrl } from "../App";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${serverUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      toast.success("OTP sent to your email!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setStep(2); // Move to OTP step
    } catch (error) {
      toast.error(error.message || "Failed to send OTP", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${serverUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid or expired OTP");
      }

      toast.success("OTP verified successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setStep(3); // Move to New Password step
    } catch (error) {
      toast.error(error.message || "Failed to verify OTP", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${serverUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      toast.success("Password reset successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "Failed to reset password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] min-h-[450px] bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-center space-y-4 sm:space-y-6">
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
                Forgot Password
              </h2>
              <p className="text-gray-500 mb-4 sm:mb-6 text-center">
                Enter your email to receive an OTP
              </p>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Back to{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
                Verify OTP
              </h2>
              <p className="text-gray-500 mb-4 sm:mb-6 text-center">
                Enter the OTP sent to {email}
              </p>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Back to{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                    onClick={() => setStep(1)}
                  >
                    Email
                  </button>
                </p>
              </div>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
                Reset Password
              </h2>
              <p className="text-gray-500 mb-4 sm:mb-6 text-center">
                Enter your new password
              </p>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base disabled:bg-blue-400"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Back to{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                    onClick={() => setStep(2)}
                  >
                    OTP
                  </button>
                </p>
              </div>
            </form>
          )}
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

export default ForgotPassword;
