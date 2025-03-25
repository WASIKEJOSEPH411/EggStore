import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true }
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        image: { type: String } // Optional image for product preview
      }
    ],
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending"
    },
    notes: { type: String, default: "" }, // Optional field for special instructions
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
