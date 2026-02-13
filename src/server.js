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

// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import mongoose from "mongoose";

// import { authMiddleware } from "./middleware/authMiddleware.js";
// import { roleMiddleware } from "./middleware/roleMiddleware.js";
// import { userRoutes } from "./routes/user-routes/userRoutes.js";
// import { productRoutes } from "./routes/admin-routes/productRoutes.js";

// const app = express();

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

// // -------------- Auth Middleware ----------------

// app.use(authMiddleware);

// // -------------- Role Middleware ----------------

// app.use(roleMiddleware(['user' , 'admin']));

// // -------------- Products Page ----------------

// app.get("/api/product", async (req, res) => {
//   res.send("Products");
// });

// // -------------- Role Middleware ----------------

// app.use(roleMiddleware(['admin']));

// // -------------- Admin Routes ----------------

// app.use('/api/product' , productRoutes)

// // -------------- Server Listner ----------------

// app.listen(process.env.PORT, () => {
//   console.log(`Server Running On Port: ${process.env.PORT}`);
// });

// ========================================================

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import { authMiddleware } from "./middleware/authMiddleware.js";
// import { roleMiddleware } from "./middleware/roleMiddleware.js";

// ============ ROUTES ============

import { userRoutes } from "./routes/userRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());

// -------------- Define Mongoose Server --------------

mongoose.connect("mongodb://127.0.0.1:27017/Auth-System")
    .then(() => {
        console.log("DB connected!");
    })
    .catch((err) => {
        console.log(err);
    });

// -------------- Home Page --------------

app.get("/api", (req, res) => {
    res.send("Fast-Food Ordering Backend API System :)");
});

// -------------- User Routes --------------

app.use('/api' , userRoutes)

// -------------- Auth Middleware --------------

app.use(authMiddleware);

// -------------- Product Order Routes --------------

app.use('/api/product' , productRoutes)
app.use('/api/order' , orderRoutes)

// -------------- Server Listner --------------

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port: ${process.env.PORT}`);
});
