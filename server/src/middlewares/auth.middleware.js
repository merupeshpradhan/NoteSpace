import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../lib/prisma.js";

export async function verifyJWT(req, res, next) {
  try {
    // Get token from the cookies
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "Unauthorized request. No token provided.");
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      throw new ApiError(401, "Invalid Access Token. User not found.");
    }

    req.user = user;

    next();
  } catch (error) {
    const statusCode = error.statusCode || 401;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Invalid or expired token.",
    });
  }
}
