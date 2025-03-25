import express from "express";
import multer from "multer";
import Drink from "../models/Drinks.js";

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Get all drinks
router.get("/drinks", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.status(200).json(drinks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get single drink
router.get("/drinks/:id", async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) return res.status(404).json({ message: "Drink not found" });
    res.status(200).json(drink);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Add a new drink with image upload
router.post("/drinks", upload.single("image"), async (req, res) => {
  try {
    console.log("Uploaded file:", req.file); // Debugging
    const { name, price, quantity, description } = req.body;
    const newDrink = new Drink({
      name,
      price,
      quantity,
      description,
      img: `/uploads/${req.file.filename}`,
    });

    const savedDrink = await newDrink.save();
    res.status(201).json(savedDrink);
  } catch (error) {
    res.status(400).json({ message: "Failed to add drink", error });
  }
});

// Update a drink
router.put("/drinks/:id", async (req, res) => {
  try {
    const updatedDrink = await Drink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDrink) return res.status(404).json({ message: "Drink not found" });
    res.status(200).json(updatedDrink);
  } catch (error) {
    res.status(400).json({ message: "Failed to update drink", error });
  }
});

// Delete a drink
router.delete("/drinks/:id", async (req, res) => {
  try {
    const deletedDrink = await Drink.findByIdAndDelete(req.params.id);
    if (!deletedDrink) return res.status(404).json({ message: "Drink not found" });
    res.status(200).json({ message: "Drink deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;