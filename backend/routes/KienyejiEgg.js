import express from "express";
import multer from "multer";
import fs from "fs";
import KienyejiEgg from "../models/KienyejiEgg.js";

const router = express.Router();

// ✅ Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// @desc    Get all kienyeji eggs
// @route   GET /api/kienyejieggs
router.get("/", async (req, res) => {
  try {
    const kienyejiEggs = await KienyejiEgg.find();
    res.status(200).json(kienyejiEggs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// @desc    Get a single kienyeji egg by ID
// @route   GET /api/kienyejieggs/:id
router.get("/:id", async (req, res) => {
  try {
    const kienyejiEgg = await KienyejiEgg.findById(req.params.id);
    if (!kienyejiEgg) return res.status(404).json({ message: "Kienyeji egg not found" });

    res.status(200).json(kienyejiEgg);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// @desc    Create a new kienyeji egg with image upload
// @route   POST /api/kienyejieggs
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newKienyejiEgg = new KienyejiEgg({
      name,
      price,
      quantity,
      description,
      imageUrl,
    });

    const savedKienyejiEgg = await newKienyejiEgg.save();
    res.status(201).json(savedKienyejiEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to add kienyeji egg", error });
  }
});

// @desc    Update a kienyeji egg (optional image update)
// @route   PUT /api/kienyejieggs/:id
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let updateData = req.body;

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedKienyejiEgg = await KienyejiEgg.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedKienyejiEgg) return res.status(404).json({ message: "Kienyeji egg not found" });

    res.status(200).json(updatedKienyejiEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to update kienyeji egg", error });
  }
});

// @desc    Delete a kienyeji egg
// @route   DELETE /api/kienyejieggs/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedKienyejiEgg = await KienyejiEgg.findByIdAndDelete(req.params.id);

    if (!deletedKienyejiEgg) return res.status(404).json({ message: "Kienyeji egg not found" });

    res.status(200).json({ message: "Kienyeji egg deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
