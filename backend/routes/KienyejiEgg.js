import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import KienyejiEgg from "../models/KienyejiEgg.js";

const router = express.Router();

// Fix "__dirname" for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ GET all kienyeji eggs
router.get("/kienyejiegg", async (req, res) => {
  try {
    const kienyejiEggs = await KienyejiEgg.find();
    res.status(200).json(kienyejiEggs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ GET a single kienyeji egg by ID
router.get("/kienyejiegg/:id", async (req, res) => {
  try {
    const kienyejiEgg = await KienyejiEgg.findById(req.params.id);
    if (!kienyejiEgg) return res.status(404).json({ message: "Kienyeji egg not found" });

    res.status(200).json(kienyejiEgg);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ POST - Create a new kienyeji egg
router.post("/kienyejiegg", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    if (!name || !price || !quantity || !description || !req.file) {
      return res.status(400).json({ message: "All fields including an image are required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newKienyejiEgg = new KienyejiEgg({ name, price, quantity, description, imageUrl });
    await newKienyejiEgg.save();

    res.status(201).json(newKienyejiEgg);
  } catch (error) {
    res.status(500).json({ message: "Failed to add kienyeji egg", error });
  }
});

// ✅ PUT - Update a kienyeji egg
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const kienyejiEgg = await KienyejiEgg.findById(req.params.id);
    if (!kienyejiEgg) return res.status(404).json({ message: "Kienyeji egg not found" });

    let updateData = req.body;

    if (req.file) {
      const oldImagePath = path.join(uploadDir, path.basename(kienyejiEgg.imageUrl));
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedKienyejiEgg = await KienyejiEgg.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedKienyejiEgg);
  } catch (error) {
    res.status(500).json({ message: "Failed to update kienyeji egg", error });
  }
});

// ✅ DELETE - Remove a kienyeji egg
router.delete("/kienyejiegg/:id", async (req, res) => {
  try {
    const kienyejiEgg = await KienyejiEgg.findById(req.params.id);
    if (!kienyejiEgg) return res.status(404).json({ message: "Kienyeji egg not found" });

    // Delete image file if it exists
    if (kienyejiEgg.imageUrl) {
      const imagePath = path.join(uploadDir, path.basename(kienyejiEgg.imageUrl));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await KienyejiEgg.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Kienyeji egg deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
