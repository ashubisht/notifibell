import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Request failed:", err);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    success: false,
    error: err instanceof Error ? err.message : "Internal server error",
  });
};
