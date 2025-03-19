import express from "express";
import multer from "multer";
import GradeEgg from "../models/GradeEgg.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Get all grade eggs
router.get("/gradeeggs", async (req, res) => {
  try {
    const gradeEggs = await GradeEgg.find();
    res.status(200).json(gradeEggs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch grade eggs", error: error.message });
  }
});

// Get single grade egg
router.get("/gradeeggs", async (req, res) => {
  try {
    const gradeEgg = await GradeEgg.findById(req.params.id);
    if (!gradeEgg) return res.status(404).json({ message: "Grade egg not found" });
    res.status(200).json(gradeEgg);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID or Server error", error: error.message });
  }
});

// Create new grade egg
router.post("/gradeeggs", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, size, description } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

    if (!name || !price || !quantity || !size || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGradeEgg = new GradeEgg({ name, price, quantity, size, description, imageUrl });
    const savedGradeEgg = await newGradeEgg.save();
    res.status(201).json(savedGradeEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to add grade egg", error: error.message });
  }
});

// Update grade egg
router.put("/gradeeggs", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, size, description } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : undefined;

    const updatedData = { name, price, quantity, size, description };
    if (imageUrl) updatedData.imageUrl = imageUrl;

    const updatedGradeEgg = await GradeEgg.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedGradeEgg) return res.status(404).json({ message: "Grade egg not found" });
    res.status(200).json(updatedGradeEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to update grade egg", error: error.message });
  }
});

// Delete grade egg
router.delete("/gradeeggs/:id", async (req, res) => {
  try {
    const deletedGradeEgg = await GradeEgg.findByIdAndDelete(req.params.id);
    if (!deletedGradeEgg) return res.status(404).json({ message: "Grade egg not found" });

    res.status(200).json({ message: "Grade egg deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete grade egg", error: error.message });
  }
});

export default router;
