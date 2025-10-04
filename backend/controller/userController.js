import User from "../model/userModel.js";
import uploadonCloudinary from "../config/cloudinary.js";
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "GetCurrentUser Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body; // Fixed destructuring

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID found" });
    }

    let photoUrl;
    if (req.file) {
      const uploadResult = await uploadonCloudinary(req.file.path);
      photoUrl = uploadResult.url; // Use only the URL string
    }

    const updateData = {
      description,
      name,
      ...(photoUrl && { photoUrl }), // Only include photoUrl if it exists
    };

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res
      .status(500)
      .json({ message: `Update Profile Error: ${error.message}` });
  }
};
