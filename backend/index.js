import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Load Environment Variables
dotenv.config();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import Routes
import AuthRouter from "./routes/auth.js";
import AdminRouter from "./routes/Admin.js";
import AddChickenProductRouter from "./routes/AddChickenProduct.js";
import DrinksRouter from "./routes/Drinks.js";
import GradeEggRouter from "./routes/GradeEgg.js";
import KienyejiEggRouter from "./routes/KienyejiEgg.js";
import OrderRouter from "./routes/order.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/auth", AuthRouter);
app.use("/admin", AdminRouter);
app.use("/addchickenproduct", AddChickenProductRouter);
app.use("/drinks", DrinksRouter);
app.use("/gradeegg", GradeEggRouter);
app.use("/kienyejiegg", KienyejiEggRouter);
app.use("/order", OrderRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Egg Grading System API!");
});

// Database Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  });
