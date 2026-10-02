import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EditorTabs from "./components/Editor/EditorTabs";
import ResumePreview from "./components/Preview/ResumePreview";
import AuthModal from "./components/AuthModal";
import ResumesManagerModal from "./components/ResumesManagerModal";
import { 
  getStoredResumes, saveStoredResumes, getActiveResumeId, 
  setActiveResumeId, createNewResumeEntry, duplicateResumeEntry, deleteResumeEntry 
} from "./utils/resumeStorage";
import { downloadDirectPDF } from "./utils/pdfGenerator";
import confetti from "canvas-confetti";
import { Edit3, Eye, Download, Info, CheckCircle2 } from "lucide-react";

export default function App() {
  // Saved resumes state
  const [resumesList, setResumesList] = useState(() => getStoredResumes());
  const [activeResumeId, setActiveId] = useState(() => getActiveResumeId());

  // Active resume object
  const activeResume = resumesList.find((r) => r.id === activeResumeId) || resumesList[0] || {};

  // Form & Appearance states
  const [resumeData, setResumeData] = useState(() => activeResume.data || {});
  const [activeTitle, setActiveTitle] = useState(() => activeResume.title || "Primary Tech Resume");
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => activeResume.templateId || "luxe-gradient");
  const [themeColor, setThemeColor] = useState(() => activeResume.themeColor || "#4f46e5");
  const [fontFamily, setFontFamily] = useState(() => activeResume.fontFamily || "'Inter', sans-serif");
  const [fontSize, setFontSize] = useState(() => activeResume.fontSize || 13);

  // Modals state
  const [isResumesModalOpen, setIsResumesModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [mobileView, setMobileView] = useState("editor"); // 'editor' | 'preview'
  const [showPrintHint, setShowPrintHint] = useState(false);

  // User auth state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("resumify_auth_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Switch active resume
  const handleSelectResume = (id) => {
    const target = resumesList.find((r) => r.id === id);
    if (!target) return;

    setActiveId(target.id);
    setActiveResumeId(target.id);
    setActiveTitle(target.title);
    setResumeData(target.data);
    setSelectedTemplateId(target.templateId || "luxe-gradient");
    setThemeColor(target.themeColor || "#4f46e5");
    setFontFamily(target.fontFamily || "'Inter', sans-serif");
    setFontSize(target.fontSize || 13);
  };

  // Create new resume
  const handleCreateNew = (title, useSample) => {
    const created = createNewResumeEntry(title, useSample);
    const updated = getStoredResumes();
    setResumesList(updated);
    handleSelectResume(created.id);
  };

  // Duplicate resume
  const handleDuplicate = (id) => {
    const duplicated = duplicateResumeEntry(id);
    if (duplicated) {
      const updated = getStoredResumes();
      setResumesList(updated);
      handleSelectResume(duplicated.id);
    }
  };

  // Delete resume
  const handleDelete = (id) => {
    const updated = deleteResumeEntry(id);
    setResumesList(updated);
    if (activeResumeId === id && updated.length > 0) {
      handleSelectResume(updated[0].id);
    }
  };

  // Auto-sync current edits into resumesList
  useEffect(() => {
    if (!activeResumeId) return;

    setResumesList((prevList) => {
      const updated = prevList.map((item) => {
        if (item.id === activeResumeId) {
          return {
            ...item,
            title: activeTitle,
            data: resumeData,
            templateId: selectedTemplateId,
            themeColor,
            fontFamily,
            fontSize,
            lastModified: new Date().toISOString()
          };
        }
        return item;
      });
      saveStoredResumes(updated);
      return updated;
    });
  }, [resumeData, activeTitle, selectedTemplateId, themeColor, fontFamily, fontSize, activeResumeId]);

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem("resumify_auth_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("resumify_auth_user");
  };

  // Direct PDF Download (device file download)
  const handleDirectDownload = async () => {
    setIsGeneratingPDF(true);
    const candidateName = resumeData?.personalInfo?.fullName || "Resume";
    const fileName = `${candidateName.replace(/\s+/g, "_")}_Resume.pdf`;

    try {
      await downloadDirectPDF("resume-printable-area", fileName);

      // Celebrate with confetti!
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("Direct download failed, triggering print fallback", err);
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Vector Print trigger
  const handlePrint = () => {
    setShowPrintHint(true);
    setTimeout(() => {
      window.print();
      setShowPrintHint(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/90 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        fontSize={fontSize}
        setFontSize={setFontSize}
        resumeData={resumeData}
        setResumeData={setResumeData}
        activeResumeTitle={activeTitle}
        setActiveResumeTitle={setActiveTitle}
        resumesCount={resumesList.length}
        onOpenResumesManager={() => setIsResumesModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onDirectDownload={handleDirectDownload}
        isGeneratingPDF={isGeneratingPDF}
      />

      {/* Mobile Toggle Bar */}
      <div className="no-print lg:hidden flex border-b border-slate-200 bg-white p-2 justify-center gap-2">
        <button
          type="button"
          onClick={() => setMobileView("editor")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition ${
            mobileView === "editor" 
              ? "bg-indigo-600 text-white shadow-sm" 
              : "bg-slate-100 text-slate-700"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Details</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileView("preview")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition ${
            mobileView === "preview" 
              ? "bg-indigo-600 text-white shadow-sm" 
              : "bg-slate-100 text-slate-700"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-5 overflow-hidden">
        {/* Left Side: Form Editor */}
        <section 
          className={`no-print flex-1 lg:w-[48%] xl:w-[45%] h-full ${
            mobileView === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <EditorTabs 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        </section>

        {/* Right Side: Live Resume Preview */}
        <section 
          className={`flex-1 lg:w-[52%] xl:w-[55%] h-full ${
            mobileView === "editor" ? "hidden lg:block" : "block"
          }`}
        >
          <ResumePreview
            resumeData={resumeData}
            selectedTemplateId={selectedTemplateId}
            themeColor={themeColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
            onPrint={handlePrint}
          />
        </section>
      </main>

      {/* Resumes Storage / Manager Modal */}
      <ResumesManagerModal
        isOpen={isResumesModalOpen}
        onClose={() => setIsResumesModalOpen(false)}
        resumesList={resumesList}
        activeResumeId={activeResumeId}
        onSelectResume={handleSelectResume}
        onCreateNew={handleCreateNew}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />

      {/* User Login & Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Print PDF Hint Toast */}
      {showPrintHint && (
        <div className="no-print fixed bottom-6 right-6 max-w-sm bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-start gap-3 z-50 animate-bounce">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-white">Opening Print Options...</p>
            <p className="text-slate-300 mt-1">
              For standard print, check <b>"Background graphics"</b> to preserve colors.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
