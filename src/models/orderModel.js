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
        // menuItem: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "MenuItem",
        // },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    // totalAmount: {
    //   type: Number,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },

);

// -------------- Define Model ----------------

export const Order = mongoose.model("Order", OrderSchema);
