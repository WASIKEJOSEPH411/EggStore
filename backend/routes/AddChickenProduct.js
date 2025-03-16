import express from "express";
import multer from "multer";
import fs from "fs";
import ChickenProduct from "../models/AddChickenProduct.js";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Add a new chicken product
router.post("/addchickenproduct", upload.single("image"), async (req, res) => {
  try {
    const { name, price, available, category, quantity, description } = req.body;
    if (!name || !price || !quantity || !description || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const img = `/uploads/${req.file.filename}`;

    const newProduct = new ChickenProduct({
      name,
      price,
      available: available === "true",
      img,
      category,
      quantity,
      description,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "✅ Product added successfully!", product: savedProduct });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(400).json({ message: "❌ Failed to add product", error: error.message });
  }
});

// Get all chicken products
router.get("/chicken", async (req, res) => {
  try {
    const products = await ChickenProduct.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update a product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let updateData = req.body;
    if (req.file) updateData.img = `/uploads/${req.file.filename}`;

    const updatedProduct = await ChickenProduct.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await ChickenProduct.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
