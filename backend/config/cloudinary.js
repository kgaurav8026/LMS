import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const uploadonCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) {
      throw new Error("File path is required");
    }
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "academia",
      resource_type: "auto",
    });
    fs.unlinkSync(filePath); // Delete the file after upload
    return {
      url: result.secure_url,
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export default uploadonCloudinary;
