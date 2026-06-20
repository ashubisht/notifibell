import express from "express";
import { errorHandler } from "../middleware/errorHandler";
import { emailRoutes } from "./email.routes";
import { healthRoutes } from "./health.routes";
import { institutesRoutes } from "./institutes.routes";
import { smsRoutes } from "./sms.routes";
import { snsRoutes } from "./sns.routes";

export function registerRoutes(app: express.Application): void {
  // SNS listener reads the raw request body and must run before express.json()
  app.use(snsRoutes);

  app.use(express.json());

  app.use(healthRoutes);
  app.use(smsRoutes);
  app.use(emailRoutes);
  app.use(institutesRoutes);

  app.use(errorHandler);
}
