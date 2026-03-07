import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

export const router = express.Router();

// Read — any logged-in user
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Create, Update, Delete — admin/manager only
router.post("/", roleMiddleware("admin", "manager"), createCategory);
router.put("/:id", roleMiddleware("admin", "manager"), updateCategory);
router.delete("/:id", roleMiddleware("admin", "manager"), deleteCategory);