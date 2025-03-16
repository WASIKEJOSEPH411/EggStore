import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Drink = mongoose.model("Drink", drinkSchema);
export default Drink;
