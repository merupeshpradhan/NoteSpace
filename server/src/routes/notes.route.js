import { Router } from "express";
import {
  noteCreation,
  noteDelete,
  notesView,
  noteUpdate,
} from "../controller/notes.control.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/notecreat", verifyJWT, noteCreation);
router.post("/noteview", notesView);
router.post("/noteupdate", noteUpdate);
router.post("/notedelete", noteDelete);

export default router;
