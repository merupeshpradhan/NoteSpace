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
router.get("/noteview", verifyJWT, notesView);
router.put("/noteupdate/:id", verifyJWT, noteUpdate);
router.delete("/notedelete/:id", verifyJWT, noteDelete);

export default router;
