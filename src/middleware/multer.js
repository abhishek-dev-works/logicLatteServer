// uploadMiddleware.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.body.user_id || "default"; // Replace with the appropriate field or a default value
    const uploadPath = path.join(__dirname, "uploads", userId); // Save files under user-specific directories

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".gif" &&
      ext !== ".mp4" &&
      ext !== ".avi"
    ) {
      return cb(new Error("Only images and videos are allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
