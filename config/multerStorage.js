// middleware/parser.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// Define Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "student_images", // 👈 your Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.split(".")[0],
  },
});

// Initialize multer
const parser = multer({ storage });

export default parser;
