import express from "express";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

import {
    getAllOrders,
    updateOrderStatus,
    getMyOrders,
    createOrder,
    deleteOrderById,
} from "../controllers/orderController.js";

export const orderRoutes = express.Router();

/* =================
    Admin Only
================= */

orderRoutes.get(
    "/",
    roleMiddleware( ["admin"] ),
    getAllOrders
);

orderRoutes.put(
    "/update/:id",
    roleMiddleware(["admin"]),
    updateOrderStatus
);

/* =================
    User + Admin
================= */

orderRoutes.get(
    "/my-orders",
    roleMiddleware(["user"]),
    getMyOrders
);

orderRoutes.post(
    "/",
    roleMiddleware( ["user", "admin"] ),
    createOrder
);

orderRoutes.delete(
    "/:id",
    roleMiddleware( ["user", "admin"] ),
    deleteOrderById
);
