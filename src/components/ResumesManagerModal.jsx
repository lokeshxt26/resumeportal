import React, { useState } from "react";
import { 
  X, Plus, FileText, Trash2, Copy, Check, 
  Calendar, LayoutTemplate, Sparkles, FolderOpen, ExternalLink 
} from "lucide-react";
import { RESUME_TEMPLATES } from "./templates";

export default function ResumesManagerModal({
  isOpen,
  onClose,
  resumesList,
  activeResumeId,
  onSelectResume,
  onCreateNew,
  onDuplicate,
  onDelete
}) {
  const [newTitle, setNewTitle] = useState("");
  const [showCreatePrompt, setShowCreatePrompt] = useState(false);

  if (!isOpen) return null;

  const handleCreate = (useSample = false) => {
    onCreateNew(newTitle || (useSample ? "Software Engineer Resume" : "New Blank Resume"), useSample);
    setNewTitle("");
    setShowCreatePrompt(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">My Saved Resumes</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                  {resumesList.length} Stored
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Switch between different resumes or create new ones for various job applications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCreatePrompt(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Resume</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Create Prompt Inline */}
        {showCreatePrompt && (
          <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Frontend Engineer Resume, Google Application..."
              className="flex-1 px-3 py-2 text-xs sm:text-sm border border-indigo-200 rounded-lg outline-hidden bg-white focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleCreate(true)}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-xs transition"
              >
                With Sample Data
              </button>
              <button
                type="button"
                onClick={() => handleCreate(false)}
                className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-300 transition"
              >
                Blank Canvas
              </button>
              <button
                type="button"
                onClick={() => setShowCreatePrompt(false)}
                className="px-2 py-2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Resumes Grid */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {resumesList.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700">No saved resumes found</p>
              <p className="text-xs text-slate-500 mt-1">Click "New Resume" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {resumesList.map((item) => {
                const isActive = item.id === activeResumeId;
                const tmpl = RESUME_TEMPLATES.find((t) => t.id === item.templateId) || RESUME_TEMPLATES[0];
                const candidateName = item.data?.personalInfo?.fullName || "Unnamed Candidate";
                const candidateRole = item.data?.personalInfo?.jobTitle || "No role specified";

                return (
                  <div
                    key={item.id}
                    className={`relative p-4 rounded-xl border transition-all ${
                      isActive 
                        ? "bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md" 
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    {/* Top Row: Title & Active Badge */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-slate-900 truncate">
                            {item.title}
                          </h3>
                          {isActive && (
                            <span className="shrink-0 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                              Currently Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
                          {candidateName} • <span className="text-slate-400">{candidateRole}</span>
                        </p>
                      </div>
                    </div>

                    {/* Metadata: Template & Date */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <LayoutTemplate className="w-3 h-3 text-indigo-500" />
                        {tmpl.name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(item.lastModified).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectResume(item.id);
                          onClose();
                        }}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700"
                        }`}
                      >
                        {isActive ? <Check className="w-3.5 h-3.5" /> : null}
                        <span>{isActive ? "Editing Now" : "Open Resume"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDuplicate(item.id)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                        title="Duplicate this resume"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {resumesList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete resume "${item.title}"?`)) {
                              onDelete(item.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete this resume"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
