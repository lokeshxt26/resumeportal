import React, { useState } from "react";
import { 
  User, FileText, Briefcase, GraduationCap, 
  Sparkles, Code, Award, Globe, Layers, Settings, ChevronRight 
} from "lucide-react";
import PersonalInfoEditor from "./PersonalInfoEditor";
import SummaryEditor from "./SummaryEditor";
import ExperienceEditor from "./ExperienceEditor";
import EducationEditor from "./EducationEditor";
import SkillsEditor from "./SkillsEditor";
import ProjectsEditor from "./ProjectsEditor";
import CertificationsEditor from "./CertificationsEditor";
import LanguagesEditor from "./LanguagesEditor";
import CustomSectionsEditor from "./CustomSectionsEditor";

export default function EditorTabs({ resumeData, setResumeData }) {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User, badge: resumeData.personalInfo.fullName ? "Done" : "Required" },
    { id: "summary", label: "Summary", icon: FileText, badge: resumeData.summary ? "Done" : "" },
    { id: "experience", label: "Experience", icon: Briefcase, count: resumeData.experiences?.length || 0 },
    { id: "skills", label: "Skills", icon: Sparkles, count: resumeData.skills?.length || 0 },
    { id: "projects", label: "Projects", icon: Code, count: resumeData.projects?.length || 0 },
    { id: "education", label: "Education", icon: GraduationCap, count: resumeData.education?.length || 0 },
    { id: "certifications", label: "Certifications", icon: Award, count: resumeData.certifications?.length || 0 },
    { id: "languages", label: "Languages", icon: Globe, count: resumeData.languages?.length || 0 },
    { id: "custom", label: "Custom / Awards", icon: Layers, count: resumeData.customSections?.length || 0 }
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Horizontal Scrollable Tabs Header */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isActive
                  ? "bg-white text-indigo-600 shadow-sm border border-slate-200/80 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive ? "bg-indigo-100 text-indigo-700" : "bg-slate-200 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Editor Content Area with Smooth Scrolling */}
      <div className="flex-1 p-5 sm:p-6 overflow-y-auto max-h-[calc(100vh-180px)]">
        {activeTab === "personal" && (
          <PersonalInfoEditor 
            personalInfo={resumeData.personalInfo}
            onChange={(val) => setResumeData({ ...resumeData, personalInfo: val })}
          />
        )}

        {activeTab === "summary" && (
          <SummaryEditor 
            summary={resumeData.summary}
            onChange={(val) => setResumeData({ ...resumeData, summary: val })}
          />
        )}

        {activeTab === "experience" && (
          <ExperienceEditor 
            experiences={resumeData.experiences}
            onChange={(val) => setResumeData({ ...resumeData, experiences: val })}
          />
        )}

        {activeTab === "skills" && (
          <SkillsEditor 
            skills={resumeData.skills}
            onChange={(val) => setResumeData({ ...resumeData, skills: val })}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsEditor 
            projects={resumeData.projects}
            onChange={(val) => setResumeData({ ...resumeData, projects: val })}
          />
        )}

        {activeTab === "education" && (
          <EducationEditor 
            education={resumeData.education}
            onChange={(val) => setResumeData({ ...resumeData, education: val })}
          />
        )}

        {activeTab === "certifications" && (
          <CertificationsEditor 
            certifications={resumeData.certifications}
            onChange={(val) => setResumeData({ ...resumeData, certifications: val })}
          />
        )}

        {activeTab === "languages" && (
          <LanguagesEditor 
            languages={resumeData.languages}
            onChange={(val) => setResumeData({ ...resumeData, languages: val })}
          />
        )}

        {activeTab === "custom" && (
          <CustomSectionsEditor 
            customSections={resumeData.customSections}
            onChange={(val) => setResumeData({ ...resumeData, customSections: val })}
          />
        )}
      </div>
    </div>
  );
}
