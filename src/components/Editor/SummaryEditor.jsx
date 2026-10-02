import React from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { summaryTemplates } from "../../data/initialData";

export default function SummaryEditor({ summary, onChange }) {
  const handleSelectTemplate = (role) => {
    if (summary && !window.confirm("Replace current summary with this template?")) {
      return;
    }
    onChange(summaryTemplates[role]);
  };

  const wordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-4">
      {/* Suggestions Bar */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          AI & Industry Suggested Summaries:
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(summaryTemplates).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleSelectTemplate(role)}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border border-slate-200 rounded-md transition text-slate-700"
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-xs font-semibold text-slate-700">
            Professional Summary / Objective
          </label>
          <span className="text-[11px] text-slate-400">
            {wordCount} words / recommended: 40-70 words
          </span>
        </div>
        <textarea
          rows={6}
          value={summary || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a concise 3-5 sentence elevator pitch highlighting your top skills, achievements, and career objective..."
          className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white leading-relaxed resize-y"
        />
      </div>

      <div className="flex justify-end">
        {summary && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium"
          >
            Clear summary
          </button>
        )}
      </div>
    </div>
  );
}
