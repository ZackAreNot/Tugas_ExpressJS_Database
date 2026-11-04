// src/utils/response.ts
import type { Response } from "express";

// Format response sukses: { status, message, data }
export const sendSuccess = (
  res: Response,
  status: number,
  message: string,
  data?: unknown,
): void => {
  res.status(status).json({ status: true, message, data });
};
