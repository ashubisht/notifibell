import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { handleSnsNotification } from "../services/sns/listener.service";
import { publishToTopic } from "../services/sns/publish.service";

const router = Router();

router.post("/listener", (req, res) => {
  console.log("SNS listener request:", req.body, req.headers);
  handleSnsNotification(req, res);
});

router.get("/listener", (_req, res) => {
  res.status(200).send("Use post method to receive listener items");
});

router.post(
  "/publish",
  asyncHandler(async (_req, res) => {
    const result = await publishToTopic("This is a test message");
    res.status(200).json({ success: true, messageId: result.MessageId });
  }),
);

export { router as snsRoutes };
