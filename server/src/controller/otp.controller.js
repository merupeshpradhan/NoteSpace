import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // OTP expires after 5 minuts
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save Otp in databse
    await prisma.user.update({
      where: {
        email,
      },

      data: {
        otp,
        otpExpiresAt,
      },
    });

    // Send OTP email
    await sendEmail(email, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("Send OTP error:", error);

    return res.status(500).json({
      message: "Faild to send otp",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "This email is not registered.",
      });
    }

    // check OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // Check OTP expiry
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // OTP is correct
    await prisma.user.update({
      where: {
        email,
      },

      data: {
        otp: null,
        otpExpiresAt: null,
      },
    });

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      message: "Failed to verify OTP",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check email and new password
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password are required." });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "This email is not use.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      message: "password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({ message: "Faild to updat password." });
  }
};
