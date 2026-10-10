import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../Api/api.js";
import { FaTimes, FaPenNib, FaMagic } from "react-icons/fa";
import AiSuggest from "../../AI/AiSuggest.jsx";
import ManualUpdate from "./ManualUpdate.jsx";

const FIELD_BUTTONS = [
  { key: "noteName", label: "✏️ Title" },
  { key: "description", label: "📝 Description" },
];

const FIELD_NAMES = {
  noteName: "Title",
  description: "Description",
};

function UpdateNote({ noteData, viewUpdateNote, onUpdateSuccess }) {
  const [activeTab, setActiveTab] = useState("manual"); // 'manual' | 'ai'
  const [type, setType] = useState(noteData?.type || "");
  const [noteName, setNoteName] = useState(noteData?.noteName || "");
  const [description, setDescription] = useState(noteData?.description || "");
  const [loading, setLoading] = useState(false);

  // AI Suggest States
  const [aiLoading, setAiLoading] = useState(null);
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

  const hasNoteId =
    noteData?.id !== undefined && noteData?.id !== null && noteData.id !== "";

  const callAI = (path, body) => {
    if (!hasNoteId) {
      throw new Error("Note ID is missing.");
    }
    return api.post(`/ai/${path}/${noteData.id}`, body, {
      withCredentials: true,
    });
  };

  const updateNoteApi = (body) => {
    if (!hasNoteId) {
      throw new Error("Note ID is missing.");
    }
    return api.put(`/note/noteupdate/${noteData.id}`, body, {
      withCredentials: true,
    });
  };

  const getErrorMessage = (err, fallback) => {
    if (err.message === "Note ID is missing.") {
      return "Cannot process this note because its ID is missing.";
    }
    return err.response?.data?.message || fallback;
  };

  const getOptions = async (key) => {
    try {
      setAiLoading(key);
      setField(key);
      setShowVersions(false);

      const { data } = await callAI("options", { field: key });

      if (!Array.isArray(data?.options) || data.options.length === 0) {
        throw new Error("The AI did not return any valid options.");
      }

      setOptions(data.options);
      setPicked(data.options[0]);
    } catch (err) {
      toast.error(getErrorMessage(err, "AI failed. Try again."));
      setField(null);
    } finally {
      setAiLoading(null);
    }
  };

  const saveField = async () => {
    if (!field || !picked) {
      toast.info("Select one option.");
      return;
    }

    try {
      setSaving(true);
      await updateNoteApi({ [field]: picked });
      toast.success("Note updated!");

      if (field === "noteName") setNoteName(picked);
      if (field === "description") setDescription(picked);

      setField(null);
      setOptions([]);
      setPicked("");

      if (onUpdateSuccess) {
        await onUpdateSuccess();
      }
      viewUpdateNote();
    } catch (err) {
      toast.error(getErrorMessage(err, "Update failed."));
    } finally {
      setSaving(false);
    }
  };

  const getVersions = async () => {
    try {
      setAiLoading("versions");
      setShowVersions(true);
      setField(null);

      const { data } = await callAI("versions", {});

      if (!Array.isArray(data?.versions) || data.versions.length === 0) {
        throw new Error("The AI did not return any valid versions.");
      }

      setVersions(data.versions);
      setPickedIdx(0);
      setChecked({ noteName: true, description: true });
    } catch (err) {
      toast.error(getErrorMessage(err, "AI failed. Try again."));
      setShowVersions(false);
    } finally {
      setAiLoading(null);
    }
  };

  const saveVersion = async () => {
    const version = versions[pickedIdx];
    if (!version) {
      toast.error("Please select a valid version.");
      return;
    }

    const body = {};
    if (checked.noteName) body.noteName = version.noteName;
    if (checked.description) body.description = version.description;

    if (Object.keys(body).length === 0) {
      toast.info("Select at least one field.");
      return;
    }

    try {
      setSaving(true);
      await updateNoteApi(body);
      toast.success("Note updated!");

      if (body.noteName) setNoteName(body.noteName);
      if (body.description) setDescription(body.description);

      setShowVersions(false);
      setVersions([]);

      if (onUpdateSuccess) {
        await onUpdateSuccess();
      }
      viewUpdateNote();
    } catch (err) {
      toast.error(getErrorMessage(err, "Update failed."));
    } finally {
      setSaving(false);
    }
  };

  async function handleManualUpdate(e) {
    e.preventDefault();

    if (!type) {
      toast.error("Please select a note type!");
      return;
    }

    if (!noteName.trim()) {
      toast.error("Please enter a note name!");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description!");
      return;
    }

    setLoading(true);
    const todoId = toast.loading("Updating note...");

    try {
      const res = await updateNoteApi({ type, noteName, description });

      toast.update(todoId, {
        render: "Successfully updated note!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      if (res.data.note) {
        onUpdateSuccess(res.data.note);
      }

      viewUpdateNote();
    } catch (error) {
      console.log(error);
      toast.update(todoId, {
        render: "Please signIn again to access your notes.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto lg:pl-64">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={viewUpdateNote}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 z-20"
        >
          <FaTimes className="text-xs" />
        </button>

        {/* Header */}
        <div className="relative flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 shadow-inner">
            <FaPenNib className="text-lg" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
              Update Note
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Modify details yourself or use AI assistant suggestions.
            </p>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 mb-6 bg-slate-950/60 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("manual")}
            className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === "manual"
                ? "bg-teal-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Own Update
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "ai"
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FaMagic className="text-[10px]" /> AI Suggest
          </button>
        </div>

        {/* AI Suggest View */}
        {activeTab === "ai" ? (
          <AiSuggest
            noteData={noteData}
            FIELD_BUTTONS={FIELD_BUTTONS}
            field={field}
            FIELD_NAMES={FIELD_NAMES}
            saveField={saveField}
            saving={saving}
            setField={setField}
            getOptions={getOptions}
            aiLoading={aiLoading}
            options={options}
            picked={picked}
            setPicked={setPicked}
            hasNoteId={hasNoteId}
            showVersions={showVersions}
            versions={versions}
            pickedIdx={pickedIdx}
            setPickedIdx={setPickedIdx}
            checked={checked}
            setChecked={setChecked}
            saveVersion={saveVersion}
            getVersions={getVersions}
            setShowVersions={setShowVersions}
          />
        ) : (
          /* Manual Update Form View */
          <ManualUpdate
            handleManualUpdate={handleManualUpdate}
            type={type}
            setType={setType}
            noteName={noteName}
            setNoteName={setNoteName}
            description={description}
            setDescription={setDescription}
            viewUpdateNote={viewUpdateNote}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

export default UpdateNote;
