import { useState } from "react";
import api from "../../Api/api.js";
import { toast } from "react-toastify";

const FIELD_BUTTONS = [
  { key: "noteName", label: "✏️ Title" },
  { key: "description", label: "📝 Description" },
];

const FIELD_NAMES = {
  noteName: "Title",
  description: "Description",
};

export default function AiSuggest({ note, onUpdated }) {
  const [loading, setLoading] = useState(null);
  const [saving, setSaving] = useState(false);

  const [field, setField] = useState(null);
  const [options, setOptions] = useState([]);
  const [picked, setPicked] = useState("");

  const [showVersions, setShowVersions] = useState(false);
  const [versions, setVersions] = useState([]);
  const [pickedIdx, setPickedIdx] = useState(0);

  const [checked, setChecked] = useState({
    noteName: true,
    description: true,
  });

  // Check whether the note has a valid ID.
  const hasNoteId =
    note?.id !== undefined && note?.id !== null && note.id !== "";

  // Generate AI suggestions.
  const callAI = (path, body) => {
    if (!hasNoteId) {
      throw new Error("Note ID is missing.");
    }

    // 2. Use api.post (which automatically includes baseURL and cookies)
    return api.post(`/ai/${path}/${note.id}`, body, { withCredentials: true });
  };

  // Update only the fields supplied in the request.
  const updateNote = (body) => {
    if (!hasNoteId) {
      throw new Error("Note ID is missing.");
    }

    // 3. Use api.put instead of axios.put
    return api.put(`/note/noteupdate/${note.id}`, body, {
      withCredentials: true,
    });
  };

  const getErrorMessage = (err, fallback) => {
    if (err.message === "Note ID is missing.") {
      return "Cannot process this note because its ID is missing.";
    }

    return err.response?.data?.message || fallback;
  };

  // Generate title OR description suggestions.
  const getOptions = async (key) => {
    try {
      setLoading(key);

      const { data } = await callAI("options", {
        field: key,
      });

      if (!Array.isArray(data?.options) || data.options.length === 0) {
        throw new Error("The AI did not return any valid options.");
      }

      setShowVersions(false);
      setField(key);
      setOptions(data.options);
      setPicked(data.options[0]);
    } catch (err) {
      toast.error(getErrorMessage(err, "AI failed. Try again."));
    } finally {
      setLoading(null);
    }
  };

  // Save one selected field.
  const saveField = async () => {
    if (!field || !picked) {
      toast.info("Select one option.");
      return;
    }

    try {
      setSaving(true);

      await updateNote({
        [field]: picked,
      });

      toast.success("Note updated!");

      setField(null);
      setOptions([]);
      setPicked("");

      if (onUpdated) {
        await onUpdated();
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Update failed."));
    } finally {
      setSaving(false);
    }
  };

  // Generate three title + description versions.
  const getVersions = async () => {
    try {
      setLoading("versions");

      const { data } = await callAI("versions", {});

      if (!Array.isArray(data?.versions) || data.versions.length === 0) {
        throw new Error("The AI did not return any valid versions.");
      }

      setField(null);
      setOptions([]);
      setVersions(data.versions);
      setPickedIdx(0);

      setChecked({
        noteName: true,
        description: true,
      });

      setShowVersions(true);
    } catch (err) {
      toast.error(getErrorMessage(err, "AI failed. Try again."));
    } finally {
      setLoading(null);
    }
  };

  // Save selected fields from the chosen version.
  const saveVersion = async () => {
    const version = versions[pickedIdx];

    if (!version) {
      toast.error("Please select a valid version.");
      return;
    }

    const body = {};

    if (checked.noteName) {
      body.noteName = version.noteName;
    }

    if (checked.description) {
      body.description = version.description;
    }

    if (Object.keys(body).length === 0) {
      toast.info("Select at least one field.");
      return;
    }

    if (Object.values(body).some((value) => typeof value !== "string")) {
      toast.error("The selected version contains invalid data.");
      return;
    }

    try {
      setSaving(true);

      await updateNote(body);

      toast.success("Note updated!");

      setShowVersions(false);
      setVersions([]);

      if (onUpdated) {
        await onUpdated();
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Update failed."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* AI action buttons */}
      <div className="flex flex-wrap gap-2 mt-3">
        {FIELD_BUTTONS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => getOptions(item.key)}
            disabled={loading !== null || saving || !hasNoteId}
            className="px-3 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {loading === item.key ? "Thinking..." : item.label}
          </button>
        ))}

        <button
          type="button"
          onClick={getVersions}
          disabled={loading !== null || saving || !hasNoteId}
          className="px-3 py-2 text-sm rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {loading === "versions" ? "Thinking..." : "📄 Title + Description"}
        </button>
      </div>

      {/* Single-field suggestion modal */}
      {field && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            className="bg-white text-gray-900 rounded-xl p-5 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <h3 className="font-bold text-lg mb-1">
              AI options for {FIELD_NAMES[field]}
            </h3>

            <p className="text-sm text-gray-500 mb-4 whitespace-pre-wrap">
              Current: {note?.[field] || "Empty"}
            </p>

            {options.map((option, index) => (
              <label
                key={`${index}-${option}`}
                className={`flex items-start gap-3 border rounded-lg p-3 mb-2 cursor-pointer ${
                  picked === option
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name={`ai-option-${note.id}`}
                  checked={picked === option}
                  onChange={() => setPicked(option)}
                  className="mt-1"
                />

                <span className="text-sm whitespace-pre-wrap wrap-break-word">
                  {option}
                </span>
              </label>
            ))}

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                type="button"
                onClick={saveField}
                disabled={saving || loading !== null}
                className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Use this"}
              </button>

              <button
                type="button"
                onClick={() => getOptions(field)}
                disabled={loading !== null || saving}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 disabled:opacity-50"
              >
                {loading === field ? "Thinking..." : "🔄 More options"}
              </button>

              <button
                type="button"
                onClick={() => setField(null)}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Three-version modal */}
      {showVersions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            className="bg-white text-gray-900 rounded-xl p-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <h3 className="font-bold text-lg mb-1">
              Title + Description Versions
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Select a version, then choose which fields to save. The note type
              will not change.
            </p>

            {versions.map((version, index) => (
              <label
                key={index}
                className={`block border rounded-lg p-4 mb-3 cursor-pointer ${
                  pickedIdx === index
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="radio"
                    name={`ai-version-${note.id}`}
                    checked={pickedIdx === index}
                    onChange={() => setPickedIdx(index)}
                  />

                  <span className="font-semibold text-sm">
                    Version {index + 1}
                    {index === 0 && " (Grammar fixed)"}
                    {index === 1 && " (Clearer)"}
                    {index === 2 && " (Shorter)"}
                  </span>
                </div>

                <p className="text-sm mb-2 wrap-break-word">
                  <strong>Title:</strong> {version.noteName}
                </p>

                <p className="text-sm whitespace-pre-wrap wrap-break-word">
                  <strong>Description:</strong> {version.description}
                </p>
              </label>
            ))}

            <div className="border rounded-lg p-3 mb-4 bg-gray-50">
              <p className="text-sm font-semibold mb-3">
                Save from Version {pickedIdx + 1}
              </p>

              <div className="flex flex-wrap gap-4">
                {["noteName", "description"].map((key) => (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked[key]}
                      onChange={() =>
                        setChecked((previous) => ({
                          ...previous,
                          [key]: !previous[key],
                        }))
                      }
                    />

                    {FIELD_NAMES[key]}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveVersion}
                disabled={saving || loading !== null}
                className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save selected"}
              </button>

              <button
                type="button"
                onClick={getVersions}
                disabled={loading !== null || saving}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 disabled:opacity-50"
              >
                {loading === "versions" ? "Thinking..." : "🔄 New versions"}
              </button>

              <button
                type="button"
                onClick={() => setShowVersions(false)}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
