import { Router } from "express";
import {
  aiNoteAction,
  aiSuggestNote,
  aiFieldOptions,
} from "../controller/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/note/:noteId", verifyJWT, aiNoteAction);
router.post("/suggest/:noteId", verifyJWT, aiSuggestNote);
router.post("/options/:noteId", verifyJWT, aiFieldOptions);

export default router;
