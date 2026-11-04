// src/routes/product.routes.ts
import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/productController";

const router = Router();

// Didaftarkan di /products
router.get("/", getProducts);
router.get("/:product_id", getProductById);
router.post("/", createProduct);

export default router;
