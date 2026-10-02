import React from "react";
import { Plus, Trash2, Globe } from "lucide-react";

export default function LanguagesEditor({ languages = [], onChange }) {
  const addLanguage = () => {
    const newLang = {
      id: "lang-" + Date.now(),
      name: "",
      proficiency: "Fluent / Professional"
    };
    onChange([...languages, newLang]);
  };

  const removeLanguage = (id) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  const updateLang = (id, field, value) => {
    onChange(
      languages.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const proficiencyLevels = [
    "Native / Bilingual",
    "Fluent / Professional",
    "Professional Working",
    "Conversational",
    "Elementary / Basic"
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Specify languages you speak and your proficiency level.
        </p>
        <button
          type="button"
          onClick={addLanguage}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Globe className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
          <p className="text-xs text-slate-500">No languages added</p>
          <button
            type="button"
            onClick={addLanguage}
            className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
          >
            + Add Language
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              <input
                type="text"
                value={lang.name || ""}
                onChange={(e) => updateLang(lang.id, "name", e.target.value)}
                placeholder="e.g. English, Telugu, Hindi, Spanish"
                className="flex-1 px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={lang.proficiency || ""}
                onChange={(e) => updateLang(lang.id, "proficiency", e.target.value)}
                className="px-2.5 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {proficiencyLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeLanguage(lang.id)}
                className="text-slate-400 hover:text-red-600 p-1 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
