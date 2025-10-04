import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import UserProfile from "./userProfile.jsx";

const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(clearUserData());
        setShowProfile(false);
        toast.success("Logged out successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Error during logout");
    }
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const displayName = userData ? userData.name : "Guest";
  const nameParts = displayName.split(" ");
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : displayName[0]?.toUpperCase() || "G";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-30 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-teal-600 tracking-wide"
          >
            ACADEMIA
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6 font-medium text-gray-700">
            <Link to="/" className="hover:text-teal-600 transition">
              Home
            </Link>
            <Link to="/courses" className="hover:text-teal-600 transition">
              Courses
            </Link>
            <Link to="/#benefits" className="hover:text-teal-600 transition">
              Benefits
            </Link>
            <Link to="/about" className="hover:text-teal-600 transition">
              About
            </Link>
            <Link to="/pricing" className="hover:text-teal-600 transition">
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-teal-600 transition">
              Contact
            </Link>
            {userData && userData.role === "educator" && (
              <Link to="/dashboard" className="hover:text-teal-600 transition">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Profile & Logout */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {userData && (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleProfile}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden text-white font-semibold shadow-md">
                  {userData.photoUrl ? (
                    <img
                      src={userData.photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm sm:text-base">{initials}</span>
                  )}
                </div>
                <span className="hidden sm:block font-medium text-gray-800 text-sm sm:text-base">
                  {displayName}
                </span>
              </div>
            )}

            {userData ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-white font-medium shadow transition text-sm sm:text-base"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-teal-600 hover:bg-teal-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-white font-medium shadow transition text-sm sm:text-base"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* User Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Profile</h3>
              <button
                onClick={toggleProfile}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <UserProfile onClose={toggleProfile} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
