import mongoose from "mongoose";

// -------------- Order Collection Schema ----------------

const OrderSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  items: [
    {
      product: { type: ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: { type: String, enum: ["pending", "preparing", "delivered"] },
  createdAt: Date
});

// -------------- Define Model ----------------

export const Order = mongoose.model(
  "Order",
  OrderSchema,
);
