import { Router } from "express";
import {
  aiNoteAction,
  aiFieldOptions,
  aiVersions,
} from "../controller/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/note/:noteId", verifyJWT, aiNoteAction);
router.post("/options/:noteId", verifyJWT, aiFieldOptions);
router.post("/versions/:noteId", verifyJWT, aiVersions);

export default router;