// import express from "express";
// import {
//     createProduct,
//     deleteProductById,
//     getAllProducts,
//     getProductById,
//     patchProductById,
//     updateProductById,
// } from "../../controllers/productController.js";

// export const productRoutes = express.Router();

// productRoutes.get("/", getAllProducts);
// productRoutes.get("/:id", getProductById);
// productRoutes.post("/create", createProduct);
// productRoutes.put("/update/:id", updateProductById);
// productRoutes.patch("/patch/:id", patchProductById);
// productRoutes.delete("/delete/:id", deleteProductById);

// =================================================================

import express from "express";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById,
} from "../controllers/productController.js";
import { upload } from "../middleware/uploadMiddleware.js";

export const productRoutes = express.Router();

/* =================
    User + Admin
================= */
// roleMiddleware( ["user" , "manager" , "admin"] ),

productRoutes.get("/" , getAllProducts);
productRoutes.get("/:id" , getProductById);

/* =================
    Admin Only
================= */

productRoutes.post("/", roleMiddleware( ["admin" , "manager"] ), upload.single('image'), createProduct);
productRoutes.put("/:id", roleMiddleware( ["admin" , "manager"] ), updateProductById);
productRoutes.delete("/:id", roleMiddleware( ["admin" , "manager"] ), deleteProductById);
