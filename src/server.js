// import express from "express";
// import mongoose from "mongoose";
// import { userRoutes } from "./routes/userRoutes.js";

// const app = express();
// const port = 3000;

// app.use(express.json());

// // -------------- Define Mongoose Server ----------------

// mongoose.connect("mongodb://127.0.0.1:27017/Auth-System")
//     .then(() => {
//         console.log("DB connected!");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// // -------------- Routes ----------------

// app.get("/", (req, res) => {
//     res.send("Auth System :)");
// });

// // -------------- User Routes ----------------

// app.use('/api' , userRoutes)

// // -------------- Server Listner ----------------

// app.listen(port, () => {
//   console.log(`Server Running On Port: ${port}`);
// });

// ========================================================

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { userRoutes } from "./routes/userRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();
const port = 3000;

app.use(express.json());

// -------------- Define Mongoose Server ----------------

mongoose.connect("mongodb://127.0.0.1:27017/Auth-System")
    .then(() => {
        console.log("DB connected!");
    })
    .catch((err) => {
        console.log(err);
    });

// -------------- Routes ----------------

app.get("/", (req, res) => {
    res.send("Auth System :)");
});

// -------------- User Routes ----------------

app.use('/api' , userRoutes)

// -------------- Auth Middleware ----------------

app.use(authMiddleware);

// -------------- Main Page ----------------

app.get("/api/products", async (req, res) => {
  res.send("Products");
});

// -------------- Admin Routes ----------------

// app.get("/api/users", async (req, res) => {
//     const users = await User.find()
//     res.json(users)
// });

// -------------- Server Listner ----------------

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port: ${process.env.PORT}`);
});
