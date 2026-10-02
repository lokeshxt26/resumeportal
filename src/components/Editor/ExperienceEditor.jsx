import React, { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";

export default function ExperienceEditor({ experiences = [], onChange }) {
  const [expandedId, setExpandedId] = useState(experiences[0]?.id || null);

  const addExperience = () => {
    const newExp = {
      id: "exp-" + Date.now(),
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange([newExp, ...experiences]);
    setExpandedId(newExp.id);
  };

  const removeExperience = (id) => {
    if (window.confirm("Remove this experience?")) {
      onChange(experiences.filter((e) => e.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === id) {
          const updated = { ...exp, [field]: value };
          if (field === "current" && value === true) {
            updated.endDate = "";
          }
          return updated;
        }
        return exp;
      })
    );
  };

  const insertSampleBullets = (id) => {
    const sample = 
`• Engineered scalable microservices handling 100k+ daily transactions with 99.9% uptime.
• Led cross-functional team of 5 engineers to deliver features 2 weeks ahead of target schedule.
• Decreased database query latency by 40% through indexing and caching optimizations.`;
    const exp = experiences.find((e) => e.id === id);
    const existing = exp?.description?.trim();
    updateItem(id, "description", existing ? `${existing}\n${sample}` : sample);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          List your work history starting with your most recent position.
        </p>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Job
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No work experiences added yet</p>
          <p className="text-xs text-slate-400 mt-1">Click "Add Job" to add your work history.</p>
          <button
            type="button"
            onClick={addExperience}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Your First Job
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div 
                key={exp.id} 
                className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden transition"
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-100/80 cursor-pointer select-none border-b border-slate-100"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <div className="text-sm font-bold text-slate-900 truncate">
                        {exp.role || "Untitled Role"}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {exp.company || "Company Name"} {exp.startDate ? `• ${exp.startDate}` : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Job Title / Role *
                        </label>
                        <input
                          type="text"
                          value={exp.role || ""}
                          onChange={(e) => updateItem(exp.id, "role", e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={exp.company || ""}
                          onChange={(e) => updateItem(exp.id, "company", e.target.value)}
                          placeholder="e.g. Google / Microsoft"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location || ""}
                          onChange={(e) => updateItem(exp.id, "location", e.target.value)}
                          placeholder="e.g. Hyderabad, India (or Remote)"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Start Date (e.g. 2022-04 or Apr 2022)
                        </label>
                        <input
                          type="text"
                          value={exp.startDate || ""}
                          onChange={(e) => updateItem(exp.id, "startDate", e.target.value)}
                          placeholder="YYYY-MM (e.g. 2022-04)"
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          disabled={exp.current}
                          value={exp.current ? "Present" : exp.endDate || ""}
                          onChange={(e) => updateItem(exp.id, "endDate", e.target.value)}
                          placeholder="YYYY-MM (or leave blank if current)"
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden ${
                            exp.current ? "bg-slate-100 text-slate-400 border-slate-200" : "border-slate-300"
                          }`}
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-700">
                          <input
                            type="checkbox"
                            checked={!!exp.current}
                            onChange={(e) => updateItem(exp.id, "current", e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                          />
                          <span>I currently work in this role</span>
                        </label>
                      </div>
                    </div>

                    {/* Bullet Points / Description */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Key Achievements & Responsibilities (Bullet Points)
                        </label>
                        <button
                          type="button"
                          onClick={() => insertSampleBullets(exp.id)}
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          Insert Sample Bullets
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        value={exp.description || ""}
                        onChange={(e) => updateItem(exp.id, "description", e.target.value)}
                        placeholder="• Spearheaded development of...&#10;• Increased revenue or reduced costs by...&#10;• Led team of engineers to deliver..."
                        className="w-full p-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden leading-relaxed"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Tip: Use strong action verbs (Architected, Engineered, Optimized, Spearheaded) with metrics (% or $).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
