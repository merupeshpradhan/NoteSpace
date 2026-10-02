import { Router } from "express";

import { resetPassword, sendOtp, verifyOtp } from "../controller/otp.controller.js";

const router = Router();

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

export default router;
