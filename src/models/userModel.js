// import mongoose from "mongoose";

// // -------------- User Schema ----------------

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// // -------------- Define Model ----------------

// export const User = mongoose.model("User", UserSchema);

// =========================================================

import mongoose from "mongoose";

// -------------- User Schema ----------------

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "manager" , "admin"],
      default: "user",
    },
  },
  { 
    timestamps: true
  },
);

// -------------- Define Model ----------------

export const User = mongoose.model("User", UserSchema);
