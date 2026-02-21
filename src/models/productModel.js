// import mongoose from "mongoose";

// // -------------- Product Collection Schema ----------------

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     isAvailable: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// // -------------- Define Model ----------------

// export const Product = mongoose.model(
//   "Product",
//   productSchema,
// );

// =================================================

import mongoose from "mongoose";

// -------------- Product Collection Schema ----------------

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      // required: true,
      default: 'https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg',
    },
  },
  {
    timestamps: true,
  },
);

// -------------- Define Model ----------------

export const Product = mongoose.model(
  "Product",
  productSchema,
);
