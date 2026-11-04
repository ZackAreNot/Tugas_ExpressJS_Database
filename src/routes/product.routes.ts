// src/routes/product.routes.ts
import { Router } from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/productController";

const router = Router();

// Didaftarkan di /products
router.get("/", getProducts);
router.get("/:product_id", getProductById);

export default router;
