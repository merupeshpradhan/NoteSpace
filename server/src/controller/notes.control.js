import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";

export async function noteCreation(req, res) {
  try {
    const { noteName, description } = req.body;

    if (!noteName || !description) {
      throw new ApiError(401, "Please provide all detials to create note.");
    }

    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized. Please log in first.");
    }

    const NewNote = await prisma.note.create({
      data: {
        noteName,
        description,
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Note created successfully.",
      note: NewNote,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server error.",
    });
  }
}

export async function notesView(req, res) {}

export async function noteUpdate(req, res) {}

export async function noteDelete(req, res) {}
