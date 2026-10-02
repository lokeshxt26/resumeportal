import React from "react";
import { 
  Mail, Phone, MapPin, Globe, 
  ExternalLink, Calendar, Award, BookOpen, Briefcase, Code, Sparkles, Terminal 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";
import { normalizeUrl, cleanDisplayUrl, formatDate } from "../../utils/helpers";

export default function LuxeGradientTemplate({ data, themeColor, fontFamily, fontSize }) {
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
      className="w-full bg-slate-50 text-slate-800 leading-relaxed overflow-hidden relative"
      style={{ fontFamily, fontSize: `${fontSize}px` }}
    >
      {/* Background Decorative Header Banner with Gradient & Geometric Pattern */}
      <div 
        className="w-full text-white p-8 sm:p-10 relative overflow-hidden shadow-md"
        style={{ 
          background: `linear-gradient(135deg, ${themeColor} 0%, #1e1b4b 100%)` 
        }}
      >
        {/* Decorative Background Shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-indigo-500/20 blur-xl pointer-events-none" />
        <div className="absolute right-12 bottom-4 opacity-10 pointer-events-none">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="50" cy="50" r="30" strokeWidth="1"/>
            <circle cx="50" cy="50" r="20" strokeWidth="1" strokeDasharray="2 2"/>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/15 text-indigo-100 border border-white/20 mb-2.5 backdrop-blur-xs">
              ✦ Verified Professional Resume
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-xs">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-base sm:text-lg font-semibold text-indigo-200 mt-1 tracking-wide">
              {personalInfo.jobTitle || "Your Title"}
            </p>

            {/* Social & Contact Badges on Gradient */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4 text-xs">
              {personalInfo.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 hover:bg-black/40 text-white/95 border border-white/15 transition backdrop-blur-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{personalInfo.email}</span>
                </a>
              )}

              {personalInfo.phone && (
                <a 
                  href={`tel:${personalInfo.phone}`} 
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 hover:bg-black/40 text-white/95 border border-white/15 transition backdrop-blur-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{personalInfo.phone}</span>
                </a>
              )}

              {personalInfo.location && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 text-white/90 border border-white/15 backdrop-blur-xs">
                  <MapPin className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{personalInfo.location}</span>
                </span>
              )}

              {websiteUrl && (
                <a 
                  href={websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/40 hover:bg-indigo-500/60 text-white font-medium border border-indigo-300/30 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-200" />
                  <span>{cleanDisplayUrl(websiteUrl)}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              )}

              {linkedinUrl && (
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-medium border border-blue-400/40 shadow-xs transition"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 fill-white" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-2.5 h-2.5 text-blue-200" />
                </a>
              )}

              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-black text-white font-medium border border-slate-700 shadow-xs transition"
                >
                  <GithubIcon className="w-3.5 h-3.5 fill-white" />
                  <span>GitHub</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-300" />
                </a>
              )}

              {instagramUrl && (
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink-600/80 hover:bg-pink-600 text-white font-medium border border-pink-400/40 shadow-xs transition"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5 text-pink-200" />
                </a>
              )}
            </div>
          </div>

          {/* Profile Picture with Gradient Ring */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="shrink-0 relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-400 shadow-xl">
                <img 
                  src={personalInfo.photoUrl} 
                  alt={personalInfo.fullName}
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area with Crisp White Cards */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Summary Card with Left Accent Ribbon */}
        {summary && (
          <div className="bg-white rounded-xl p-5 shadow-xs border-l-4 border border-slate-200/80" style={{ borderLeftColor: themeColor }}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: themeColor }} />
              <span>Executive Summary</span>
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b-2" style={{ borderColor: `${themeColor}30` }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs" style={{ backgroundColor: themeColor }}>
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Work Experience
              </h2>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-200 hover:border-slate-300 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {exp.role} <span className="text-slate-400">/</span> <span className="font-extrabold" style={{ color: themeColor }}>{exp.company}</span>
                      </h3>
                      {exp.location && <div className="text-xs text-slate-400 mt-0.5">{exp.location}</div>}
                    </div>
                    <div className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto border border-slate-200">
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>

                  {exp.description && (
                    <div className="text-slate-600 whitespace-pre-line text-xs sm:text-sm mt-2.5 leading-relaxed border-t border-slate-100 pt-2">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects with Colored Badges & Links */}
        {projects && projects.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b-2" style={{ borderColor: `${themeColor}30` }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs" style={{ backgroundColor: themeColor }}>
                <Code className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Key Projects & Repositories
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => {
                const liveUrl = normalizeUrl(proj.liveUrl, "website");
                const gitUrl = normalizeUrl(proj.githubUrl, "github");
                return (
                  <div key={proj.id} className="bg-white rounded-xl p-4 shadow-xs border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{proj.name}</span>
                        {proj.techStack && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                            {proj.techStack}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {gitUrl && (
                          <a 
                            href={gitUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 font-bold text-slate-800 hover:text-black bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Code</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {liveUrl && (
                          <a 
                            href={liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1 font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1 rounded-md shadow-xs transition"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <div className="text-slate-600 text-xs sm:text-sm mt-2 whitespace-pre-line leading-relaxed">
                        {proj.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Skills with Vibrant Tag Cloud */}
        {skills && skills.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b-2" style={{ borderColor: `${themeColor}30` }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs" style={{ backgroundColor: themeColor }}>
                <Terminal className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Skills & Technologies
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((grp) => (
                <div key={grp.id} className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: themeColor }}>
                    {grp.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(grp.items) ? grp.items : [grp.items]).map((item, idx) => (
                      <span 
                        key={idx}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education && education.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 pb-1 border-b">
                <BookOpen className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <span>Education</span>
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  {edu.fieldOfStudy && <div className="text-slate-600">{edu.fieldOfStudy}</div>}
                  <div className="text-slate-500 font-medium">{edu.institution} {edu.location ? `• ${edu.location}` : ""}</div>
                  <div className="text-slate-400 font-mono mt-0.5 flex justify-between">
                    <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    {edu.grade && <span className="font-bold text-slate-700">{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 pb-1 border-b">
                <Award className="w-3.5 h-3.5" style={{ color: themeColor }} />
                <span>Certifications</span>
              </h3>
              {certifications.map((c) => {
                const cUrl = normalizeUrl(c.url, "website");
                return (
                  <div key={c.id} className="flex justify-between items-start text-xs">
                    <div>
                      {cUrl ? (
                        <a href={cUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-700 hover:underline flex items-center gap-1">
                          <span>{c.name}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="font-bold text-slate-800">{c.name}</span>
                      )}
                      <div className="text-slate-500">{c.issuer}</div>
                    </div>
                    {c.date && <span className="text-slate-400 font-mono shrink-0">{c.date}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Languages & Custom Sections */}
        <div className="flex flex-wrap gap-4 text-xs">
          {languages && languages.length > 0 && (
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-700">Languages:</span>
              {languages.map((l) => (
                <span key={l.id} className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                  {l.name} ({l.proficiency})
                </span>
              ))}
            </div>
          )}
        </div>

        {customSections && customSections.length > 0 && (
          <div className="space-y-3">
            {customSections.map((sec) => (
              <div key={sec.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {sec.title}
                </h3>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                  {sec.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
