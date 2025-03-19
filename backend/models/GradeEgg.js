import mongoose from "mongoose";

const gradeEggSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  size: { type: String, required: true, enum: ["Small", "Medium", "Large"] },
  description: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true, trim: true },
}, { timestamps: true });

const GradeEgg = mongoose.model("GradeEgg", gradeEggSchema);

export default GradeEgg;
