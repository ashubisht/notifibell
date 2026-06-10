import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).send("This is a test page confirming the site is up");
});

export { router as healthRoutes };
