import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Destination folder
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    // File naming convention
    cb(null, file.originalname);
  },
});

// Initialize multer with storage engine and file filter
const upload = multer({
  storage: storage,
});

export default upload;
