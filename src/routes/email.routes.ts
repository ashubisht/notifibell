import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { sendEmail } from "../services/email/email.service";

const router = Router();

router.post(
  "/email",
  asyncHandler(async (_req, res) => {
    const result = await sendEmail();
    res.status(200).json({ messageId: result.MessageId });
  }),
);

export { router as emailRoutes };
