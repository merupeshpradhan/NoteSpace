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

export async function notesView(req, res) {
  try {
    const userId = req.user.id;

    const userNotes = await prisma.note.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({
      success: true,
      notes: userNotes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

export async function noteUpdate(req, res) {
  try {
    const { noteName, description } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      throw new ApiError(400, "This note avilable in Database.");
    }

    const existingNote = await prisma.note.findFirst({
      where: {
        id: Number(id),
        userId: userId,
      },
    });

    if (!existingNote) {
      throw new ApiError(
        404,
        "Note not found or unauthorized to update this note.",
      );
    }

    const updatedNote = await prisma.note.update({
      where: { id: Number(id) },
      data: {
        noteName: noteName || existingNote.noteName,
        description: description || existingNote.description,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      note: updatedNote,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

export async function noteDelete(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const userNote = await prisma.note.findFirst({
      where: {
        id: Number(id),
        userId: userId,
      },
    });

    if (!userNote) {
      throw new ApiError(404, "Select currecttask to delete.");
    }

    const deleteNote = await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Note now delete.",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: true,
      message: error.message || "Internal server error",
    });
  }
}
