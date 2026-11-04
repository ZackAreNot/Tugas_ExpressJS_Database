// src/routes/product.routes.ts
import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = Router();

// Didaftarkan di /products
router.get("/", getProducts);
router.get("/:product_id", getProductById);
router.post("/", createProduct);
router.put("/", updateProduct); // id dikirim di body
router.put("/:product_id", updateProduct); // id juga boleh di path

export default router;
