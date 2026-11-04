// src/routes/product.routes.ts
import { Router } from "express";
import {
  getProducts,
} from "../controllers/productController";

const router = Router();

// Didaftarkan di /products
router.get("/", getProducts);

export default router;
