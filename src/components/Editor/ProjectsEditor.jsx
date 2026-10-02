import React from "react";
import { Plus, Trash2, Code, Globe, Sparkles } from "lucide-react";
import { GithubIcon } from "../icons/SocialIcons";

export default function ProjectsEditor({ projects = [], onChange }) {
  const addProject = () => {
    const newProj = {
      id: "proj-" + Date.now(),
      name: "",
      techStack: "",
      liveUrl: "",
      githubUrl: "",
      description: ""
    };
    onChange([...projects, newProj]);
  };

  const removeProject = (id) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const updateProj = (id, field, value) => {
    onChange(
      projects.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  const insertSampleBullets = (id) => {
    const sample = 
`• Built full-stack application with real-time syncing and responsive design.
• Integrated OAuth 2.0 authentication and automated CI/CD pipeline with GitHub Actions.
• Deployed on cloud platform handling 5,000+ daily page views.`;
    const proj = projects.find((p) => p.id === id);
    const existing = proj?.description?.trim();
    updateProj(id, "description", existing ? `${existing}\n${sample}` : sample);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Highlight projects with live deployment links and GitHub code repos.
        </p>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Code className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No projects added yet</p>
          <button
            type="button"
            onClick={addProject}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div key={proj.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-indigo-600" />
                  Project #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                  title="Remove project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={proj.name || ""}
                    onChange={(e) => updateProj(proj.id, "name", e.target.value)}
                    placeholder="e.g. CloudPulse Dashboard"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tech Stack / Technologies
                  </label>
                  <input
                    type="text"
                    value={proj.techStack || ""}
                    onChange={(e) => updateProj(proj.id, "techStack", e.target.value)}
                    placeholder="e.g. React, Node.js, Tailwind, PostgreSQL"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    Live Demo URL (Clickable in PDF)
                  </label>
                  <input
                    type="text"
                    value={proj.liveUrl || ""}
                    onChange={(e) => updateProj(proj.id, "liveUrl", e.target.value)}
                    placeholder="e.g. https://myproject.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5 text-slate-800" />
                    GitHub Repo URL (Clickable in PDF)
                  </label>
                  <input
                    type="text"
                    value={proj.githubUrl || ""}
                    onChange={(e) => updateProj(proj.id, "githubUrl", e.target.value)}
                    placeholder="e.g. https://github.com/user/project"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Project Highlights / Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={() => insertSampleBullets(proj.id)}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Insert Sample Bullets
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={proj.description || ""}
                  onChange={(e) => updateProj(proj.id, "description", e.target.value)}
                  placeholder="• Developed features including...&#10;• Reduced latency by...&#10;• Implemented user authentication and..."
                  className="w-full p-2.5 text-xs sm:text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
