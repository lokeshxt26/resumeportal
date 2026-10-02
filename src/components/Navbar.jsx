import React, { useRef, useState } from "react";
import { 
  FileText, Download, Upload, Trash2, RotateCcw, 
  Palette, Type, Sliders, ChevronDown, Check, Sparkles, 
  LayoutTemplate, Printer, FolderOpen, User, Edit2, Loader2 
} from "lucide-react";
import confetti from "canvas-confetti";
import { RESUME_TEMPLATES, COLOR_THEMES, FONT_OPTIONS } from "./templates";
import { initialResumeData, emptyResumeData } from "../data/initialData";

export default function Navbar({
  selectedTemplateId,
  setSelectedTemplateId,
  themeColor,
  setThemeColor,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  resumeData,
  setResumeData,
  activeResumeTitle,
  setActiveResumeTitle,
  resumesCount = 1,
  onOpenResumesManager,
  currentUser,
  onOpenAuth,
  onDirectDownload,
  isGeneratingPDF
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const fileInputRef = useRef(null);

  const selectedTemplate = RESUME_TEMPLATES.find((t) => t.id === selectedTemplateId) || RESUME_TEMPLATES[0];

  const handleLoadSample = () => {
    if (window.confirm("Load sample company resume data? This will overwrite your current inputs.")) {
      setResumeData(JSON.parse(JSON.stringify(initialResumeData)));
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all fields and start fresh?")) {
      setResumeData(JSON.parse(JSON.stringify(emptyResumeData)));
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeData.personalInfo.fullName || "resume"}_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.personalInfo) {
          setResumeData(parsed);
          alert("Resume loaded successfully!");
        } else {
          alert("Invalid resume JSON structure.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Active Resume Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight text-slate-900">
                Resumify
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                ATS Pro
              </span>
            </div>

            {/* Editable Title */}
            <div className="flex items-center gap-1.5 mt-0.5">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={activeResumeTitle}
                  onChange={(e) => setActiveResumeTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => { if (e.key === "Enter") setIsEditingTitle(false); }}
                  autoFocus
                  className="text-xs font-bold text-indigo-700 border-b-2 border-indigo-600 outline-hidden bg-transparent py-0 px-1"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingTitle(true)}
                  className="text-xs font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-1 truncate max-w-[200px] sm:max-w-xs group"
                  title="Click to rename this resume"
                >
                  <span className="truncate">{activeResumeTitle || "Untitled Resume"}</span>
                  <Edit2 className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Customization Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* My Saved Resumes Button */}
          <button
            type="button"
            onClick={onOpenResumesManager}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 shadow-2xs transition active:scale-95"
            title="Manage and switch between your saved resumes"
          >
            <FolderOpen className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">My Resumes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-200 text-indigo-800 text-[10px] font-black">
              {resumesCount}
            </span>
          </button>

          {/* Template Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTemplateMenu(!showTemplateMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-indigo-600" />
              <span>{selectedTemplate.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showTemplateMenu && (
              <div 
                className="absolute left-0 sm:right-0 sm:left-auto mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 max-h-96 overflow-y-auto"
                onClick={() => setShowTemplateMenu(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                  <span>Choose Resume Template</span>
                  <span className="text-[10px] text-indigo-600 font-bold">{RESUME_TEMPLATES.length} Styles</span>
                </div>
                {RESUME_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`w-full text-left px-3 py-2 flex items-start justify-between text-xs hover:bg-slate-50 transition ${
                      selectedTemplateId === tmpl.id ? "bg-indigo-50/70 text-indigo-900 font-bold" : "text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span>{tmpl.name}</span>
                        {tmpl.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                            tmpl.featured 
                              ? "bg-amber-100 text-amber-900 border border-amber-300" 
                              : "bg-indigo-100 text-indigo-700"
                          }`}>
                            {tmpl.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">{tmpl.tagline}</p>
                    </div>
                    {selectedTemplateId === tmpl.id && <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Palette Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-xs font-semibold text-slate-700 shadow-2xs transition"
            >
              <span 
                className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 shadow-2xs" 
                style={{ backgroundColor: themeColor }}
              />
              <span className="hidden sm:inline">Theme</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showColorPicker && (
              <div className="absolute right-0 mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Select Accent Color
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_THEMES.map((theme) => (
                    <button
                      key={theme.value}
                      type="button"
                      onClick={() => {
                        setThemeColor(theme.value);
                        setShowColorPicker(false);
                      }}
                      className="group flex flex-col items-center gap-1 p-1 rounded-lg hover:bg-slate-100 transition"
                      title={theme.name}
                    >
                      <span 
                        className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center shadow-xs group-hover:scale-110 transition"
                        style={{ backgroundColor: theme.value }}
                      >
                        {themeColor.toLowerCase() === theme.value.toLowerCase() && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </span>
                      <span className="text-[9px] text-slate-600 truncate max-w-full">{theme.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-600 font-medium">Custom Color:</span>
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Font Selector */}
          <div className="hidden md:flex items-center gap-1 border border-slate-300 rounded-lg px-2 py-1 bg-white text-xs">
            <Type className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="text-xs bg-transparent outline-hidden font-medium text-slate-700 cursor-pointer"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>{f.name}</option>
              ))}
            </select>
          </div>

          {/* Actions: Sample Data, Clear, Backup */}
          <div className="hidden lg:flex items-center gap-1 border-l border-slate-200 pl-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-2 py-1 text-xs font-semibold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition"
              title="Fill with high quality sample company resume"
            >
              Sample Data
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Clear all inputs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title="Export Resume JSON backup"
            >
              <Upload className="w-3.5 h-3.5 rotate-180" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
              id="import-json-input"
            />
            <label
              htmlFor="import-json-input"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Import Resume JSON backup"
            >
              <Upload className="w-3.5 h-3.5" />
            </label>
          </div>

          {/* User Account / Profile Button */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 transition"
            title="User Profile & Cloud Sync"
          >
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-slate-500" />
            )}
            <span className="hidden xl:inline">{currentUser ? currentUser.name : "Sign In"}</span>
          </button>

          {/* Primary Direct Download PDF Button */}
          <button
            type="button"
            disabled={isGeneratingPDF}
            onClick={onDirectDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
