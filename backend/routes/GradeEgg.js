import express from "express";
import GradeEgg from "../models/GradeEgg.js";

const router = express.Router();

// @desc    Get all grade eggs
// @route   GET /api/gradeeggs
router.get("/", async (req, res) => {
  try {
    const gradeEggs = await GradeEgg.find();
    res.status(200).json(gradeEggs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// @desc    Get a single grade egg by ID
// @route   GET /api/gradeeggs/:id
router.get("/:id", async (req, res) => {
  try {
    const gradeEgg = await GradeEgg.findById(req.params.id);
    if (!gradeEgg) return res.status(404).json({ message: "Grade egg not found" });

    res.status(200).json(gradeEgg);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// @desc    Create a new grade egg
// @route   POST /api/gradeeggs
router.post("/", async (req, res) => {
  try {
    const { name, price, quantity, description, imageUrl } = req.body;

    const newGradeEgg = new GradeEgg({
      name,
      price,
      quantity,
      description,
      imageUrl
    });

    const savedGradeEgg = await newGradeEgg.save();
    res.status(201).json(savedGradeEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to add grade egg", error });
  }
});

// @desc    Update a grade egg
// @route   PUT /api/gradeeggs/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedGradeEgg = await GradeEgg.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedGradeEgg) return res.status(404).json({ message: "Grade egg not found" });

    res.status(200).json(updatedGradeEgg);
  } catch (error) {
    res.status(400).json({ message: "Failed to update grade egg", error });
  }
});

// @desc    Delete a grade egg
// @route   DELETE /api/gradeeggs/:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedGradeEgg = await GradeEgg.findByIdAndDelete(req.params.id);

    if (!deletedGradeEgg) return res.status(404).json({ message: "Grade egg not found" });

    res.status(200).json({ message: "Grade egg deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
