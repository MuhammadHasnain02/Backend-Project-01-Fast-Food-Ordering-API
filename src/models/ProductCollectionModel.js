import mongoose from "mongoose";

// -------------- Product Collection Schema ----------------

const ProductCollectionSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  isAvailable: Boolean,
  createdAt: Date,
});

// -------------- Define Model ----------------

export const ProductCollection = mongoose.model(
  "ProductCollection",
  ProductCollectionSchema,
);
