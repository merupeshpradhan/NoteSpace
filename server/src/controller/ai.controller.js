import { ai, MODEL } from "../lib/ai.js";
import { prisma } from "../lib/prisma.js";

// Note types (same values of create-note dropdown)
const TYPES = ["study", "marketing-dates", "movie-watching-time"];

// Find a note that belongs to the logged-in user
const findUserNote = (noteId, userId) =>
  prisma.note.findFirst({
    where: { id: Number(noteId), userId },
  });

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

// ---------- 2. Suggest title + description + type together ----------
export const aiSuggestNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await findUserNote(noteId, req.user.id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    const prompt = `You help improve notes. Read the note and return JSON with exactly these 3 keys:
- "noteName": a short, clear title
- "description": the description with grammar fixed and clarity improved (keep the same meaning and language)
- "type": choose ONE value from this list only:
  "study" (learning, exams, homework, courses),
  "marketing-dates" (campaigns, promotions, deadlines, launches),
  "movie-watching-time" (movies, shows, watch plans)
- If the title or description is already clear or too short to improve, return it unchanged. Never add new information or filler sentences.

Current title: ${note.noteName}
Current description: ${note.description}`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const data = JSON.parse(response.text);
    const type = TYPES.includes(data.type) ? data.type : note.type;

    return res.status(200).json({
      success: true,
      suggestion: {
        noteName: data.noteName || note.noteName,
        description: data.description || note.description,
        type,
      },
    });
  } catch (err) {
    console.error("AI suggest error:", err);
    return res
      .status(500)
      .json({ success: false, message: "AI request failed" });
  }
};

// ---------- 3. Many options for ONE field ----------
const FIELD_PROMPTS = {
  noteName:
    'Give 3 different short, clear titles for this note. Return JSON: {"options": ["title1", "title2", "title3"]}',
  description:
    'Give 3 different improved versions of the description: (1) only grammar fixed, (2) clearer and better written, (3) shorter. Keep the same meaning and language. Return JSON: {"options": ["version1", "version2", "version3"]}',
  type: `Rank these note types from best match to worst match for this note: ${TYPES.join(", ")}. Return JSON: {"options": ["best", "second", "third"]} using only values from that list.`,
};

export const aiFieldOptions = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { field } = req.body; // "noteName" | "description" | "type"

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
      contents: `${FIELD_PROMPTS[field]}\n\nCurrent title: ${note.noteName}\nCurrent description: ${note.description}`,
      config: { responseMimeType: "application/json" },
    });

    const data = JSON.parse(response.text);
    let options = Array.isArray(data.options) ? data.options : [];

    if (field === "type") {
      // keep only valid types, then add any missing ones
      options = options.filter((t) => TYPES.includes(t));
      TYPES.forEach((t) => {
        if (!options.includes(t)) options.push(t);
      });
    }

    return res.status(200).json({ success: true, field, options });
  } catch (err) {
    console.error("AI options error:", err);
    return res
      .status(500)
      .json({ success: false, message: "AI request failed" });
  }
};
