import express from "express";
import Order from "../models/order.js";

const router = express.Router();

// ✅ Create a New Order
router.post("/orders", async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || !total) {
      return res.status(400).json({ message: "Customer, items, and total are required" });
    }

    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      return res.status(400).json({ message: "All customer details are required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items must be a non-empty array" });
    }

    for (const item of items) {
      if (!item.productId || !item.name || !item.quantity || !item.price) {
        return res.status(400).json({ message: "Each item must have productId, name, quantity, and price" });
      }
    }

    const newOrder = new Order({
      customer,
      items,
      total,
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get All Orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get a Single Order by ID
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Update Order Status
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status field is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Delete an Order
router.delete("/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
