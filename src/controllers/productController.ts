// src/controllers/productController.ts
import type { Request, Response } from "express";
import prisma from "../config/prisma";
import { sendSuccess } from "../utils/response";

// GET /products
export const getProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  sendSuccess(res, 200, "Berhasil mengambil data produk", products);
};
