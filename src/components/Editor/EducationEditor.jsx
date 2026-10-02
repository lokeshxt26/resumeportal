import React from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export default function EducationEditor({ education = [], onChange }) {
  const addEducation = () => {
    const newEdu = {
      id: "edu-" + Date.now(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: ""
    };
    onChange([...education, newEdu]);
  };

  const removeEducation = (id) => {
    onChange(education.filter((e) => e.id !== id));
  };

  const updateEdu = (id, field, value) => {
    onChange(
      education.map((e) => {
        if (e.id === id) {
          return { ...e, [field]: value };
        }
        return e;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Add your academic degrees, certifications, or high school info.
        </p>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No education entries added yet</p>
          <button
            type="button"
            onClick={addEducation}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Degree
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div key={edu.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs relative group">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  Degree / Program #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                  title="Remove education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree / Certificate *
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) => updateEdu(edu.id, "degree", e.target.value)}
                    placeholder="e.g. Bachelor of Technology (B.Tech)"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Field of Study / Major
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ""}
                    onChange={(e) => updateEdu(edu.id, "fieldOfStudy", e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    School / University *
                  </label>
                  <input
                    type="text"
                    value={edu.institution || ""}
                    onChange={(e) => updateEdu(edu.id, "institution", e.target.value)}
                    placeholder="e.g. Stanford University / NIT Warangal"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location || ""}
                    onChange={(e) => updateEdu(edu.id, "location", e.target.value)}
                    placeholder="e.g. Hyderabad, India"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date & End Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.startDate || ""}
                      onChange={(e) => updateEdu(edu.id, "startDate", e.target.value)}
                      placeholder="Start (2018)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    />
                    <input
                      type="text"
                      value={edu.endDate || ""}
                      onChange={(e) => updateEdu(edu.id, "endDate", e.target.value)}
                      placeholder="End (2022)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grade / CGPA / Percentage
                  </label>
                  <input
                    type="text"
                    value={edu.grade || ""}
                    onChange={(e) => updateEdu(edu.id, "grade", e.target.value)}
                    placeholder="e.g. 8.8 / 10 CGPA or First Class with Distinction"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
