import React from "react";

function AiSuggest({
  noteData,
  FIELD_BUTTONS,
  field,
  FIELD_NAMES,
  saveField,
  saving,
  setField,
  getOptions,
  aiLoading,
  options,
  picked,
  setPicked,
  hasNoteId,
  showVersions,
  versions,
  pickedIdx,
  setPickedIdx,
  checked,
  setChecked,
  saveVersion,
  getVersions,
  setShowVersions
}) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">
        Choose what you want the AI to optimize:
      </p>

      {/* AI Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {FIELD_BUTTONS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => getOptions(item.key)}
            disabled={aiLoading !== null || saving || !hasNoteId}
            className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50 ${
              field === item.key
                ? "bg-purple-700 text-white ring-2 ring-purple-400"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {aiLoading === item.key ? "Thinking..." : item.label}
          </button>
        ))}

        <button
          type="button"
          onClick={getVersions}
          disabled={aiLoading !== null || saving || !hasNoteId}
          className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50 ${
            showVersions
              ? "bg-teal-700 text-white ring-2 ring-teal-400"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
        >
          {aiLoading === "versions" ? "Thinking..." : "📄 Title + Description"}
        </button>
      </div>

      {/* Single-field options display area */}
      {field && (
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 animate-in fade-in duration-200 mt-3">
          <h4 className="font-bold text-sm text-white mb-1">
            AI Options for {FIELD_NAMES[field]}
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Current: {noteData?.[field] || "Empty"}
          </p>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {options.map((option, index) => (
              <label
                key={`${index}-${option}`}
                className={`flex items-start gap-3 border rounded-xl p-3 cursor-pointer text-xs transition-all ${
                  picked === option
                    ? "border-teal-500 bg-teal-500/10 text-white"
                    : "border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name={`ai-option-${noteData.id}`}
                  checked={picked === option}
                  onChange={() => setPicked(option)}
                  className="mt-0.5 accent-teal-500"
                />
                <span className="whitespace-pre-wrap break-words">
                  {option}
                </span>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={saveField}
              disabled={saving || aiLoading !== null}
              className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Use This"}
            </button>
            <button
              type="button"
              onClick={() => getOptions(field)}
              disabled={aiLoading !== null || saving}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
            >
              {aiLoading === field ? "Thinking..." : "🔄 More"}
            </button>
            <button
              type="button"
              onClick={() => setField(null)}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-slate-800/50 text-slate-400 text-xs hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Versions view display area */}
      {showVersions && (
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/60 max-h-80 overflow-y-auto animate-in fade-in duration-200 mt-3">
          <h4 className="font-bold text-sm text-white mb-1">
            Title + Description Versions
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Select a version and fields to save:
          </p>

          {versions.map((version, index) => (
            <label
              key={index}
              className={`block border rounded-xl p-3 mb-2.5 cursor-pointer text-xs transition-all ${
                pickedIdx === index
                  ? "border-teal-500 bg-teal-500/10 text-white"
                  : "border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name={`ai-version-${noteData.id}`}
                  checked={pickedIdx === index}
                  onChange={() => setPickedIdx(index)}
                  className="accent-teal-500"
                />
                <span className="font-semibold text-teal-400">
                  Version {index + 1}
                </span>
              </div>
              <p className="mb-1">
                <strong className="text-slate-400">Title:</strong>{" "}
                {version.noteName}
              </p>
              <p className="whitespace-pre-wrap">
                <strong className="text-slate-400">Description:</strong>{" "}
                {version.description}
              </p>
            </label>
          ))}

          <div className="flex gap-4 my-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
            {["noteName", "description"].map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked[key]}
                  onChange={() =>
                    setChecked((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                  className="accent-teal-500"
                />
                Save {FIELD_NAMES[key]}
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={saveVersion}
              disabled={saving || aiLoading !== null}
              className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Save Selected"}
            </button>
            <button
              type="button"
              onClick={getVersions}
              disabled={aiLoading !== null || saving}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
            >
              {aiLoading === "versions" ? "Thinking..." : "🔄 New Versions"}
            </button>
            <button
              type="button"
              onClick={() => setShowVersions(false)}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-slate-800/50 text-slate-400 text-xs hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiSuggest;
