import { Router } from "express";
import { aiNoteAction } from "../controller/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/note/:noteId", verifyJWT, aiNoteAction);

export default router;
