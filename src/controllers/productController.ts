// src/controllers/productController.ts
import type { Request, Response } from "express";
import prisma from "../config/prisma";
import { HttpError } from "../utils/http-error";
import { parseId } from "../utils/parse";
import { sendSuccess } from "../utils/response";

// Validasi body POST dan PUT (name wajib teks, price wajib bilangan bulat >= 0)
const parseProductBody = (body: Record<string, unknown>) => {
  const { name, price } = body;

  if (typeof name !== "string" || name.trim() === "" || price === undefined || price === null || price === "") {
    throw new HttpError(400, "name dan price wajib diisi");
  }
  if (typeof price !== "number" || !Number.isInteger(price) || price < 0) {
    throw new HttpError(400, "price harus berupa bilangan bulat 0 atau lebih");
  }

  return { name: name.trim(), price };
};

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

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  const data = parseProductBody(req.body ?? {});

  const product = await prisma.product.create({ data });

  sendSuccess(res, 201, "Produk berhasil dibuat", product);
};

// PUT /products (id di body) atau PUT /products/:product_id
export const updateProduct = async (req: Request, res: Response) => {
  const body = req.body ?? {};

  // ID boleh dari body (sesuai soal) atau dari path. Kalau dua-duanya ada, harus sama
  const idParam = req.params.product_id;
  if (body.id === undefined && idParam === undefined) {
    throw new HttpError(400, "id wajib diisi");
  }
  const id = parseId(body.id ?? idParam);
  if (idParam !== undefined && body.id !== undefined && parseId(idParam) !== id) {
    throw new HttpError(400, "id pada path dan body harus sama");
  }

  const data = parseProductBody(body);

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, "Produk tidak ditemukan");

  const product = await prisma.product.update({ where: { id }, data });

  sendSuccess(res, 200, "Produk berhasil diperbarui", product);
};
