import React, { useState } from "react";
import { Plus, Trash2, Layers, Sparkles } from "lucide-react";

export default function CustomSectionsEditor({ customSections = [], onChange }) {
  const addSection = (defaultTitle = "Achievements & Honors") => {
    const newSection = {
      id: "custom-" + Date.now(),
      title: defaultTitle,
      items: ["Winner of Hackathon 2024", "Published technical research paper in IEEE journal"]
    };
    onChange([...customSections, newSection]);
  };

  const removeSection = (id) => {
    onChange(customSections.filter((s) => s.id !== id));
  };

  const updateSectionTitle = (id, title) => {
    onChange(
      customSections.map((s) => (s.id === id ? { ...s, title } : s))
    );
  };

  const updateItems = (id, rawText) => {
    const lines = rawText.split("\n").filter((line) => line.trim().length > 0);
    onChange(
      customSections.map((s) => (s.id === id ? { ...s, items: lines } : s))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Add custom sections like Achievements, Awards, Volunteer Work, or Publications.
        </p>
        <button
          type="button"
          onClick={() => addSection()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </button>
      </div>

      {customSections.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Layers className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
          <p className="text-xs text-slate-500">No custom sections added</p>
          <button
            type="button"
            onClick={() => addSection("Achievements & Awards")}
            className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
          >
            + Add Achievements Section
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {customSections.map((sec) => (
            <div key={sec.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={sec.title || ""}
                  onChange={(e) => updateSectionTitle(sec.id, e.target.value)}
                  placeholder="Section Title (e.g. Achievements & Honors)"
                  className="font-bold text-sm text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-indigo-500 outline-hidden py-0.5 px-1 bg-transparent flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeSection(sec.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bullet Points (One per line)
                </label>
                <textarea
                  rows={4}
                  value={sec.items ? sec.items.join("\n") : ""}
                  onChange={(e) => updateItems(sec.id, e.target.value)}
                  placeholder="Enter each achievement or item on a new line..."
                  className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
