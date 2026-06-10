import express from "express";
import { registerRoutes } from "./routes";

export function createApp(): express.Application {
  const app = express();
  registerRoutes(app);
  return app;
}
