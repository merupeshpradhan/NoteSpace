import { ai, MODEL } from "../lib/ai.js";
import { prisma } from "../lib/prisma.js";

// Find a note that belongs to the logged-in user
const findUserNote = (noteId, userId) =>
  prisma.note.findFirst({
    where: { id: Number(noteId), userId },
  });

// The AI can READ the type for context, but it never changes it
const noteText = (note) =>
  `Category: ${note.type}\nCurrent title: ${note.noteName}\nCurrent description: ${note.description}`;

// ---------- 1. Summarize / Improve / Tags ----------
const PROMPTS = {
  summarize: "Summarize this note in 3 short bullet points.",
  improve:
    "Fix grammar and improve clarity of the note description only. Return ONLY the improved description text. Do not include the title or any extra words.",
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

    const note = await findUserNote(noteId, req.user.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `${PROMPTS[action]}\n\n${noteText(note)}`,
    });

    return res.status(200).json({ success: true, result: response.text });
  } catch (err) {
    console.error("AI error:", err);
    return res
      .status(500)
      .json({ success: false, message: "AI request failed" });
  }
};

// ---------- 2. Three options for ONE field (title OR description) ----------
const FIELD_PROMPTS = {
  noteName:
    'Give 3 different short, clear titles for this note. Return JSON: {"options": ["title1", "title2", "title3"]}',
  description:
    'Give 3 different improved versions of the description: (1) only grammar fixed, (2) clearer and better written, (3) shorter. Keep the same meaning and language. Do not add new information. Return JSON: {"options": ["version1", "version2", "version3"]}',
};

export const aiFieldOptions = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { field } = req.body; // "noteName" | "description"

    if (!FIELD_PROMPTS[field]) {
      return res.status(400).json({ success: false, message: "Invalid field" });
    }

    const note = await findUserNote(noteId, req.user.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: `${FIELD_PROMPTS[field]}\n\n${noteText(note)}`,
      config: { responseMimeType: "application/json" },
    });

    const data = JSON.parse(response.text);
    const options = Array.isArray(data.options) ? data.options.slice(0, 3) : [];

    return res.status(200).json({ success: true, field, options });
  } catch (err) {
    console.error("AI options error:", err);
    return res
      .status(500)
      .json({ success: false, message: "AI request failed" });
  }
};

// ---------- 3. Three full versions (title + description together) ----------
export const aiVersions = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await findUserNote(noteId, req.user.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    const prompt = `You help improve notes. Create 3 different versions of this note.
- Version 1: only fix grammar and spelling
- Version 2: clearer and better written
- Version 3: shorter and to the point
Keep the same meaning and language. Do not add new information.
Each version must have exactly these 2 keys:
- "noteName": a short, clear title
- "description": the improved description

Return JSON: {"versions": [ {...}, {...}, {...} ]}

${noteText(note)}`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const data = JSON.parse(response.text);
    const raw = Array.isArray(data.versions) ? data.versions : [];

    const versions = raw.slice(0, 3).map((v) => ({
      noteName: v.noteName || note.noteName,
      description: v.description || note.description,
    }));

    return res.status(200).json({ success: true, versions });
  } catch (err) {
    console.error("AI versions error:", err);
    return res
      .status(500)
      .json({ success: false, message: "AI request failed" });
  }
};
