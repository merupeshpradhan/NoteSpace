import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../lib/generateToken.js";

export async function refreshAccessToken(req, res) {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request. No refresh token.",
      });
    }

    try {
      // Verify Token
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (!user || user.refreshToken !== incomingRefreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token is expired or Invalid.",
        });
      }

      // Generate brand new Access Token
      const newAccessToken = generateAccessToken(user.id);

      // Send new access token cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Access token refreshed successfully.",
      });
    } catch (error) {
      console.log(error);

      if (error.name === "TokenExpiredError") {
        const decodedToken = jwt.decode(incomingRefreshToken);

        if (decodedToken?.id) {
          await prisma.user.updateMany({
            where: {
              id: decodedToken.id,
              refreshToken: incomingRefreshToken,
            },
            data: {
              refreshToken: null,
            },
          });
        }

        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");

        return res.status(401).json({
          success: false,
          message: "Refresh token expired. User logged out.",
        });
      }

      return res.status(403).json({
        success: false,
        message: "Invalid refresh token.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
}

export async function register(req, res) {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      throw new ApiError(400, "Please provide your all detials.");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(409, "User with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const updatedUser = await prisma.user.update({
      where: {
        id: newUser.id,
      },
      data: { refreshToken: refreshToken },
    });

    // Send Access Token to cookie (Expire in 15 minute)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    // Send Refresh Token to cookie (Expire in 7 days)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000, // Send Refresh Token to cookie (Expire in 7 day + 5 minutes)
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return res.status(201).json({
      success: true,
      message: "User register successfully!",
      user: userWithoutPassword,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "internal Server Error.",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All field are required.");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid email or password");
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    // Send Access Token to cookie (Expire in 15 mins)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    // Send Refresh Token to cookie (Expire in 7 Days)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000, // Send Refresh Token to cookie (Expire in 7 day + 5 minutes)
    });

    const { password: _, ...userWithoutPassword } = updateUser;

    return res.status(200).json({
      success: true,
      message: "User login successfully!",
      user: userWithoutPassword,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

export async function updateUserDetials(req, res) {
  try {
    const { name, email, phoneNumber } = req.body;
    // Fix: extract id from req.user (or req.user.id depending on your auth middleware implementation)
    const userId = req.user?.id || req.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthorized. Please login again." 
      });
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, phoneNumber },
    });

    // Remove password before sending user object back
    const { password: _, ...userWithoutPassword } = updateUser;

    return res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully",
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error("Update profile error:", error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false, 
        message: "This email is already registered with another account." 
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: "Internal server error. Failed to update profile." 
    });
  }
}

export async function logout(req, res) {
  try {
    const userId = req.user?.id;

    if (userId) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshToken: null,
        },
      });
    }

    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        success: true,
        message: "Logged out successfully.",
      });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error during logout.",
    });
  }
}
