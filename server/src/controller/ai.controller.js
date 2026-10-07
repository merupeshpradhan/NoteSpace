import { ai, MODEL } from "../lib/ai.js";
import { prisma } from "../lib/prisma.js";

const PROMPTS = {
  summarize: "Summarize this note in 3 short bullet points.",
  improve: "Fix grammar and improve clarity. Return only the improved text.",
  tags: "Suggest 3 short tags for this note. Return them comma-separated, nothing else.",
};

export const aiNoteAction = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { action } = req.body;

    if (!PROMPTS[action]) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    const note = await prisma.note.findFirst({
      where: { id: Number(noteId), userId: req.user.id },
    });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `${PROMPTS[action]}\n\nTitle: ${note.noteName}\n\n${note.description}`,
    });

    return res.status(200).json({ success: true, result: response.text });
  } catch (err) {
    console.error("AI error:", err);
    return res
      .status(500)
      .json({ success: false, message: "AI request failed" });
  }
};
