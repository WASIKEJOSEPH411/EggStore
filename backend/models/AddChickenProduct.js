import mongoose from "mongoose";

// Define the allowed categories for chicken products
const categoriesEnum = ["kienyeji", "broiler", "layer", "other","Chicken"];

const ChickenProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    img: { type: String, default: "" }, // Store image URL, can be empty initially
    category: {
      type: String,
      required: true,
      enum: categoriesEnum, // Enforcing allowed categories
    },
    quantity: { type: Number, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt fields
);

// Create and export the model
const ChickenProduct = mongoose.model("ChickenProduct", ChickenProductSchema);

export default ChickenProduct; // ✅ Correct export
