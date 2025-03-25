import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import GradeEgg from "../models/GradeEgg.js";

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Validate file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, and PNG files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Get all grade eggs
router.get("/gradeeggs", async (req, res) => {
  try {
    const gradeEggs = await GradeEgg.find();
    res.status(200).json(gradeEggs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch grade eggs", error: error.message });
  }
});

// ✅ Get single grade egg by ID
router.get("/gradeeggs/:id", async (req, res) => {
  try {
    const gradeEgg = await GradeEgg.findById(req.params.id);
    if (!gradeEgg) return res.status(404).json({ message: "Grade egg not found" });
    res.status(200).json(gradeEgg);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID or Server error", error: error.message });
  }
});

// ✅ Create new grade egg
router.post("/gradeeggs", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, size, description } = req.body;
    if (!name || !price || !quantity || !size || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

    const newGradeEgg = new GradeEgg({ name, price, quantity, size, description, imageUrl });
    const savedGradeEgg = await newGradeEgg.save();
    res.status(201).json(savedGradeEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to add grade egg", error: error.message });
  }
});

// ✅ Update grade egg by ID
router.put("/gradeeggs/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, size, description } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : undefined;

    const gradeEgg = await GradeEgg.findById(req.params.id);
    if (!gradeEgg) return res.status(404).json({ message: "Grade egg not found" });

    // Remove old image if a new one is uploaded
    if (imageUrl && gradeEgg.imageUrl) {
      const oldImagePath = path.join("uploads", path.basename(gradeEgg.imageUrl));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedData = { name, price, quantity, size, description };
    if (imageUrl) updatedData.imageUrl = imageUrl;

    const updatedGradeEgg = await GradeEgg.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedGradeEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to update grade egg", error: error.message });
  }
});

// ✅ Delete grade egg by ID
router.delete("/gradeeggs/:id", async (req, res) => {
  try {
    const deletedGradeEgg = await GradeEgg.findByIdAndDelete(req.params.id);
    if (!deletedGradeEgg) return res.status(404).json({ message: "Grade egg not found" });

    // Remove associated image
    if (deletedGradeEgg.imageUrl) {
      const imagePath = path.join("uploads", path.basename(deletedGradeEgg.imageUrl));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "Grade egg deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete grade egg", error: error.message });
  }
});

export default router;
