import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { toast } from "react-toastify";

const UserProfile = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    photoUrl: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${serverUrl}/api/user/getcurrentuser`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            description: data.user.description || "",
            photoUrl: null,
          });
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        toast.error("Error fetching user data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, photoUrl: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      if (formData.photoUrl) {
        form.append("photoUrl", formData.photoUrl);
      }

      const res = await fetch(`${serverUrl}/api/user/updateuserprofile`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        // Show success toast FIRST
        toast.success("Profile updated successfully!");

        // Then update state and close modal
        setUser(data.user);

        // Close modal after a short delay to allow toast to be visible
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 100);
      } else {
        toast.error(data.message || "Profile update failed");
      }
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "G";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        User Profile
      </h2>
      {isLoading && !user ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      ) : user ? (
        <div className="bg-white rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4 object-cover border-4 border-teal-100"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-teal-500 flex items-center justify-center mb-4 text-white font-bold text-2xl border-4 border-teal-100">
                  {getInitials(user.name)}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed text-gray-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                name="photoUrl"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPG, PNG, GIF. Max size: 5MB
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Failed to load profile. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
