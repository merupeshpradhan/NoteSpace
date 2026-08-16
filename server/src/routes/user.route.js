import { Router } from "express";
import {
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controller/user.control.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.post("/refresh-token", refreshAccessToken);

export default router;
