import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include", // Include cookies if auth is session-based
      });

      if (response.ok) {
        dispatch(clearUserData());
        toast.success("Logged out successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/login");
      } else {
        toast.error("Logout failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Error during logout", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const displayName = userData ? userData.name : "Guest";
  // Assuming name is "First Last", extract initials
  const nameParts = displayName.split(" ");
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : displayName[0]?.toUpperCase() || "";

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">VC</div>
      <div className="flex items-center space-x-4">
        {userData && userData.role === "educator" && (
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded text-white hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>
        )}
        {userData && (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden">
              {userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white">{initials}</span>
              )}
            </div>
            <span className="ml-2">{displayName}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
