import mongoose from "mongoose";

// -------------- Order Collection Schema ----------------

const OrderCollectionSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  isAvailable: Boolean,
  createdAt: Date,
});

// -------------- Define Model ----------------

export const OrderCollection = mongoose.model(
  "OrderCollection",
  OrderCollectionSchema,
);
