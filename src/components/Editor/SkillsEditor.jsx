import React, { useState } from "react";
import { Plus, Trash2, X, Sparkles, Tag } from "lucide-react";

export default function SkillsEditor({ skills = [], onChange }) {
  const [newSkillText, setNewSkillText] = useState({});

  const popularSkills = [
    "React.js", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express.js",
    "Python", "Django", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker",
    "Kubernetes", "Tailwind CSS", "Git", "REST APIs", "GraphQL", "Agile/Scrum", "Jest"
  ];

  const addCategory = () => {
    const newCat = {
      id: "skill-" + Date.now(),
      category: "New Skills Category",
      items: []
    };
    onChange([...skills, newCat]);
  };

  const removeCategory = (id) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  const updateCategoryName = (id, name) => {
    onChange(
      skills.map((s) => (s.id === id ? { ...s, category: name } : s))
    );
  };

  const addSkillItem = (catId, skill) => {
    if (!skill || !skill.trim()) return;
    const trimmed = skill.trim();
    onChange(
      skills.map((s) => {
        if (s.id === catId) {
          const currentItems = Array.isArray(s.items) ? s.items : [];
          if (!currentItems.includes(trimmed)) {
            return { ...s, items: [...currentItems, trimmed] };
          }
        }
        return s;
      })
    );
    setNewSkillText((prev) => ({ ...prev, [catId]: "" }));
  };

  const removeSkillItem = (catId, indexToRemove) => {
    onChange(
      skills.map((s) => {
        if (s.id === catId) {
          const currentItems = Array.isArray(s.items) ? s.items : [];
          return {
            ...s,
            items: currentItems.filter((_, i) => i !== indexToRemove)
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Group your skills into categories (e.g., Frontend, Backend, Cloud & Tools).
        </p>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Tag className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No skill categories yet</p>
          <button
            type="button"
            onClick={addCategory}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Skill Category
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((cat) => {
            const items = Array.isArray(cat.items) ? cat.items : [];
            const inputVal = newSkillText[cat.id] || "";

            return (
              <div key={cat.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                    placeholder="Category Name (e.g. Programming Languages)"
                    className="font-bold text-sm text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-indigo-500 outline-hidden py-0.5 px-1 bg-transparent flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(cat.id)}
                    className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Chips Container */}
                <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-slate-50 rounded-lg border border-slate-200">
                  {items.map((item, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-800 border border-slate-300 shadow-2xs"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => removeSkillItem(cat.id, idx)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {items.length === 0 && (
                    <span className="text-xs text-slate-400 italic py-1">
                      No skills added to this category yet. Type below and press Enter.
                    </span>
                  )}
                </div>

                {/* Input to add tag */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setNewSkillText({ ...newSkillText, [cat.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addSkillItem(cat.id, inputVal);
                      }
                    }}
                    placeholder="Type skill & press Enter (e.g. React, Python)..."
                    className="flex-1 px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => addSkillItem(cat.id, inputVal)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-black text-white text-xs font-semibold rounded-lg transition"
                  >
                    Add
                  </button>
                </div>

                {/* Quick Add Suggestions */}
                <div className="pt-1">
                  <span className="text-[11px] text-slate-400 mr-1.5 flex items-center gap-1 inline-flex">
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    Quick Add:
                  </span>
                  <div className="inline-flex flex-wrap gap-1">
                    {popularSkills.slice(0, 8).map((pskill) => (
                      <button
                        key={pskill}
                        type="button"
                        onClick={() => addSkillItem(cat.id, pskill)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200"
                      >
                        +{pskill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
