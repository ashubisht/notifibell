import type { ErrorRequestHandler } from "express";
import { HttpError } from "./httpError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Request failed:", err);

  if (res.headersSent) {
    return;
  }

  const statusCode = err instanceof HttpError ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    error: err instanceof Error ? err.message : "Internal server error",
  });
};
