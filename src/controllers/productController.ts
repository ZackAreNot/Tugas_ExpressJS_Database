// src/controllers/productController.ts
import type { Request, Response } from "express";
import prisma from "../config/prisma";
import { HttpError } from "../utils/http-error";
import { parseId } from "../utils/parse";
import { sendSuccess } from "../utils/response";

// GET /products
export const getProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  sendSuccess(res, 200, "Berhasil mengambil data produk", products);
};

// GET /products/:product_id
export const getProductById = async (req: Request, res: Response) => {
  const id = parseId(req.params.product_id);

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new HttpError(404, "Produk tidak ditemukan");

  sendSuccess(res, 200, "Berhasil mengambil data produk", product);
};
