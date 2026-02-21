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
    upload.single('image'),
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
