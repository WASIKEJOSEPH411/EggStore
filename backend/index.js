import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import AdminRouter from "./routes/Admin.js";
import AddChickenProductRouter from "./routes/AddChickenProduct.js";
import DrinksRouter from "./routes/Drinks.js";
import GradeEggRouter from "./routes/GradeEgg.js";
import KienyejiEggRouter from "./routes/KienyejiEgg.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true 
}));
app.use(cookieParser());

// Serve uploaded images statically
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/admin", AdminRouter);
app.use("/addchickenproduct", AddChickenProductRouter);
app.use("/drinks", DrinksRouter);
app.use("/gradeegg", GradeEggRouter);
app.use("/kienyejiegg", KienyejiEggRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Egg Grading System API!");
});

const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
