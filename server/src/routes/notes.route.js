import { Router } from "express";
import {
  noteCreation,
  noteDelete,
  notesView,
  noteUpdate,
  starNote,
} from "../controller/notes.control.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Apply varifyJWT to all note routes so req.user exists
router.use(verifyJWT);

router.post("/notecreat", noteCreation);
router.get("/", notesView);
router.put("/noteupdate/:noteId", noteUpdate);
router.post("/star/:noteId", starNote);
router.delete("/notedelete/:noteId", noteDelete);

export default router;
