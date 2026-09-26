import { Router } from "express";
import {
  googleAuth,
  login,
  logout,
  refreshAccessToken,
  register,
  updateUserDetials,
} from "../controller/user.control.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleAuth);

router.put("/update-details", verifyJWT, updateUserDetials);

router.post("/logout", verifyJWT, logout);
router.post("/refresh-token", refreshAccessToken);

export default router;
