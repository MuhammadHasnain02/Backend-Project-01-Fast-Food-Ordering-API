import mongoose from "mongoose";

// -------------- Order Collection Schema ----------------

const OrderSchema = new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalPrice: Number,
    status: { type: String, enum: ["pending", "preparing", "delivered"] },
  },
  {
    timestamps: true,
  },

);

// -------------- Define Model ----------------

export const Order = mongoose.model("Order", OrderSchema);
