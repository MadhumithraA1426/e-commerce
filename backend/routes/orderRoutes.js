import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrder
} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/admin", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrder);

export default router;
