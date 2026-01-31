// server.js

// 1. IMPORTS
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Keep this import
import path from "path";
import { fileURLToPath } from "url";

// IMPORT ROUTERS
import studentRouter from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookRouter from "./routes/bookRoutes.js";

// 🚨 FIX: CALL DOTENV.CONFIG() IMMEDIATELY AFTER IMPORTS
dotenv.config();
// The environment variables are now loaded into process.env

const app = express();

// ----------------------
// 🧩 DB CONNECTION (MOVE VARIABLES HERE, AFTER dotenv.config())
// ----------------------
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

// Mongoose connection code remains the same
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------
// 🧩 MIDDLEWARE (Can remain here)
// ----------------------
app.use(
  cors({
    origin: [
      "https://libfront.vercel.app",
      "http://localhost:5173",
      "https://your-render-app-name.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// ----------------------
// 🧩 ROUTES
// ----------------------
app.get("/api", (req, res) => {
  res.send("✅ Backend is working and connected successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api", studentRouter);
app.use("/api/books", bookRouter);

// ----------------------
// 🧩 PRODUCTION: Serve Frontend (remains at the bottom)
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  // Serve React index.html for all unknown routes
  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
