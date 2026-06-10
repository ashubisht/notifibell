import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { sendSms } from "../services/sms/sms.service";
import type { SmsMessage } from "../types/sms";

const router = Router();

router.post(
  "/sms",
  asyncHandler(async (req, res) => {
    const message = req.body as SmsMessage;
    const result = await sendSms(message);
    res.status(200).json({ messageId: result.MessageId });
  }),
);

export { router as smsRoutes };
