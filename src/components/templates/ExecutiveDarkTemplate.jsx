import React from "react";
import { 
  Mail, Phone, MapPin, Globe, 
  ExternalLink, Calendar, Award, BookOpen, Briefcase, Code, Sparkles, Shield 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";
import { normalizeUrl, cleanDisplayUrl, formatDate } from "../../utils/helpers";

export default function ExecutiveDarkTemplate({ data, themeColor, fontFamily, fontSize }) {
  const {
    personalInfo,
    summary,
    experiences,
    education,
    skills,
    projects,
    certifications,
    languages,
    customSections
  } = data;

  const linkedinUrl = normalizeUrl(personalInfo.linkedin, "linkedin");
  const githubUrl = normalizeUrl(personalInfo.github, "github");
  const instagramUrl = normalizeUrl(personalInfo.instagram, "instagram");
  const websiteUrl = normalizeUrl(personalInfo.website, "website");

  return (
    <div 
      className="w-full bg-white text-slate-800 leading-relaxed overflow-hidden"
      style={{ fontFamily, fontSize: `${fontSize}px` }}
    >
      {/* Executive Header Banner */}
      <div 
        className="w-full text-white p-8 sm:p-10 relative"
        style={{ 
          backgroundColor: "#0f172a",
          borderBottom: `4px solid ${themeColor}`
        }}
      >
        {/* Subtle Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "24px 24px"
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-amber-400/30 flex items-center gap-1 font-bold">
                <Shield className="w-3 h-3 text-amber-400" />
                Executive Portfolio
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-300 mt-1">
              {personalInfo.jobTitle || "Executive / Lead Engineer"}
            </p>

            {/* Social & Contact Bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-xs">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 text-slate-300 hover:text-white transition">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5 text-slate-300 hover:text-white transition">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {websiteUrl && (
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-amber-300 hover:underline">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{cleanDisplayUrl(websiteUrl)}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}
            </div>

            {/* Clickable Social Profile Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 text-xs">
              {linkedinUrl && (
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-500/40 transition font-medium"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 fill-blue-300" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition font-medium"
                >
                  <GithubIcon className="w-3.5 h-3.5 fill-white" />
                  <span>GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}
              {instagramUrl && (
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-pink-900/60 hover:bg-pink-800 text-pink-200 border border-pink-500/40 transition font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}
            </div>
          </div>

          {/* Profile Picture */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="shrink-0">
              <img 
                src={personalInfo.photoUrl} 
                alt={personalInfo.fullName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg object-cover border-2 shadow-2xl"
                style={{ borderColor: themeColor }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Body with Clean Executive Style */}
      <div className="p-8 sm:p-10 space-y-6">
        {/* Professional Summary */}
        {summary && (
          <section>
            <div className="flex items-center gap-2 mb-2 pb-1 border-b-2" style={{ borderColor: themeColor }}>
              <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Executive Profile
              </span>
            </div>
            <p className="text-slate-700 text-justify leading-relaxed text-sm">
              {summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
              <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Professional Experience
              </span>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: `${themeColor}60` }}>
                  <div 
                    className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" 
                    style={{ backgroundColor: themeColor }} 
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.role} <span className="font-normal text-slate-500">—</span> <span className="font-bold" style={{ color: themeColor }}>{exp.company}</span>
                    </h3>
                    <div className="text-xs font-mono text-slate-500 font-medium">
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.location && <div className="text-xs text-slate-400">{exp.location}</div>}
                  {exp.description && (
                    <div className="text-slate-700 whitespace-pre-line text-xs sm:text-sm mt-1.5 leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3 pb-1 border-b-2" style={{ borderColor: themeColor }}>
              <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Key Initiatives & Projects
              </span>
            </div>
            <div className="space-y-3">
              {projects.map((proj) => {
                const liveUrl = normalizeUrl(proj.liveUrl, "website");
                const gitUrl = normalizeUrl(proj.githubUrl, "github");
                return (
                  <div key={proj.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-bold text-slate-900 text-sm">
                        {proj.name}
                        {proj.techStack && (
                          <span className="font-normal text-xs text-slate-500 ml-2">
                            ({proj.techStack})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {gitUrl && (
                          <a href={gitUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-800 hover:underline">
                            <GithubIcon className="w-3 h-3" />
                            <span>Code</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {liveUrl && (
                          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-indigo-700 hover:underline">
                            <Globe className="w-3 h-3" />
                            <span>Demo</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <div className="text-slate-600 text-xs sm:text-sm mt-1.5 whitespace-pre-line leading-relaxed">
                        {proj.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2 pb-1 border-b-2" style={{ borderColor: themeColor }}>
              <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Core Competencies & Technical Skills
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              {skills.map((s) => (
                <div key={s.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="font-bold text-slate-900 min-w-36 uppercase tracking-wider text-[11px]">{s.category}:</span>
                  <span className="text-slate-700">
                    {Array.isArray(s.items) ? s.items.join("  •  ") : s.items}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {education && education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2 pb-1 border-b-2" style={{ borderColor: themeColor }}>
                <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  Education
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}</div>
                    <div className="text-slate-600">{edu.institution} {edu.location ? `• ${edu.location}` : ""}</div>
                    <div className="text-slate-500 font-mono mt-0.5">{formatDate(edu.startDate)} - {formatDate(edu.endDate)} {edu.grade ? `(${edu.grade})` : ""}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2 pb-1 border-b-2" style={{ borderColor: themeColor }}>
                <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  Certifications
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                {certifications.map((c) => {
                  const cUrl = normalizeUrl(c.url, "website");
                  return (
                    <div key={c.id} className="flex justify-between items-start">
                      <div>
                        {cUrl ? (
                          <a href={cUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:underline flex items-center gap-1">
                            <span>{c.name}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        ) : (
                          <span className="font-bold text-slate-800">{c.name}</span>
                        )}
                        <div className="text-slate-500">{c.issuer}</div>
                      </div>
                      {c.date && <span className="text-slate-500 font-mono">{c.date}</span>}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Custom / Languages */}
        {languages && languages.length > 0 && (
          <div className="flex items-center gap-2 text-xs border-t pt-3">
            <span className="font-bold text-slate-800">Languages:</span>
            {languages.map((l) => (
              <span key={l.id} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {l.name} ({l.proficiency})
              </span>
            ))}
          </div>
        )}

        {customSections && customSections.length > 0 && (
          <div className="space-y-3 pt-2">
            {customSections.map((sec) => (
              <section key={sec.id}>
                <div className="flex items-center gap-2 mb-1.5 pb-1 border-b-2" style={{ borderColor: themeColor }}>
                  <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                    {sec.title}
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                  {sec.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
