import express from "express";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById,
} from "../controllers/productController.js";

export const productRoutes = express.Router();

/* =================
    User + Admin
================= */

productRoutes.get(
    "/",
    roleMiddleware( ["user", "admin"] ),
    getAllProducts
);

productRoutes.get(
    "/:id",
    roleMiddleware( ["user", "admin"] ),
    getProductById
);

/* =================
    Admin Only
================= */

productRoutes.post(
    "/",
    roleMiddleware( ["admin"] ),
    createProduct
);
productRoutes.put(
    "/:id",
    roleMiddleware( ["admin"] ),
    updateProductById
);
productRoutes.delete(
    "/:id",
    roleMiddleware( ["admin"] ),
    deleteProductById
);
