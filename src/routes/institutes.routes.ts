import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { HttpError } from "../middleware/httpError";
import { searchCoachingInstitutes } from "../services/institutes/institute.service";
import { runInstituteOutreach } from "../services/institutes/outreach.service";
import type { InstituteOutreachRequest, InstituteSearchRequest } from "../types/institutes";

const router = Router();

router.post(
  "/institutes/search",
  asyncHandler(async (req, res) => {
    const body = req.body as InstituteSearchRequest;

    if (!body.city?.trim()) {
      throw new HttpError("City name is required");
    }

    const result = await searchCoachingInstitutes(body);
    res.status(200).json({ success: true, ...result });
  })
);

router.post(
  "/institutes/outreach",
  asyncHandler(async (req, res) => {
    const result = await runInstituteOutreach(req.body as InstituteOutreachRequest);
    res.status(200).json({ success: true, ...result });
  })
);

export { router as institutesRoutes };
