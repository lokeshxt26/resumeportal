import React from "react";
import { 
  Mail, Phone, MapPin, Globe, 
  ExternalLink, Calendar, Award, BookOpen, Briefcase, Code, Terminal, Sparkles 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";
import { normalizeUrl, cleanDisplayUrl, formatDate } from "../../utils/helpers";

export default function ModernTechTemplate({ data, themeColor, fontFamily, fontSize }) {
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
      className="w-full bg-white text-slate-800 p-8 sm:p-10 leading-relaxed"
      style={{ fontFamily, fontSize: `${fontSize}px` }}
    >
      {/* Top Accent Strip */}
      <div 
        className="w-full h-2 rounded-t-lg -mt-8 sm:-mt-10 -mx-8 sm:-mx-10 mb-6" 
        style={{ backgroundColor: themeColor, width: 'calc(100% + 4rem)' }} 
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-block text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full mb-2 bg-slate-100 text-slate-600">
            ENGINEERING RESUME
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-base sm:text-lg font-semibold mt-1" style={{ color: themeColor }}>
            {personalInfo.jobTitle || "Software Engineer / Tech Lead"}
          </p>

          {/* Social Links & Contact Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4 text-xs">
            {personalInfo.email && (
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{personalInfo.email}</span>
              </a>
            )}

            {personalInfo.phone && (
              <a 
                href={`tel:${personalInfo.phone}`} 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{personalInfo.phone}</span>
              </a>
            )}

            {personalInfo.location && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                <MapPin className="w-3.5 h-3.5" />
                <span>{personalInfo.location}</span>
              </span>
            )}

            {websiteUrl && (
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{cleanDisplayUrl(websiteUrl)}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}

            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-black text-white font-medium transition"
              >
                <GithubIcon className="w-3.5 h-3.5 fill-white" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-300" />
              </a>
            )}

            {linkedinUrl && (
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                <LinkedinIcon className="w-3.5 h-3.5 fill-white" />
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5 text-blue-200" />
              </a>
            )}

            {instagramUrl && (
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-medium transition"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
                <ExternalLink className="w-2.5 h-2.5 text-pink-200" />
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
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-offset-2 shadow-md"
              style={{ ringColor: themeColor }}
            />
          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <section className="mt-5 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-700" />
            <span>Overview & Profile</span>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-3 border-b-2 flex items-center gap-2" style={{ borderColor: themeColor, color: themeColor }}>
            <Sparkles className="w-4 h-4" />
            <span>Tech Stack & Competencies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <div className="text-xs font-bold text-slate-800 mb-2 uppercase">
                  {skillGroup.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(skillGroup.items) ? skillGroup.items : [skillGroup.items]).map((item, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-0.5 rounded bg-white text-slate-800 font-medium border border-slate-300 shadow-2xs"
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

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-3 border-b-2 flex items-center gap-2" style={{ borderColor: themeColor, color: themeColor }}>
            <Briefcase className="w-4 h-4" />
            <span>Professional Experience</span>
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                <div 
                  className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" 
                  style={{ backgroundColor: themeColor }} 
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {exp.role} <span className="font-normal text-slate-500">@</span> <span className="font-bold" style={{ color: themeColor }}>{exp.company}</span>
                  </h3>
                  <div className="text-xs font-mono font-medium text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                    {exp.location && <span>({exp.location})</span>}
                  </div>
                </div>
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-3 border-b-2 flex items-center gap-2" style={{ borderColor: themeColor, color: themeColor }}>
            <Code className="w-4 h-4" />
            <span>Key Projects & Repositories</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {projects.map((proj) => {
              const liveUrl = normalizeUrl(proj.liveUrl, "website");
              const gitUrl = normalizeUrl(proj.githubUrl, "github");
              return (
                <div key={proj.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>{proj.name}</span>
                      {proj.techStack && (
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700">
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
                          className="flex items-center gap-1 font-semibold text-slate-800 hover:text-black hover:underline"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Repo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {liveUrl && (
                        <a 
                          href={liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 font-semibold text-indigo-700 hover:underline bg-indigo-50 px-2 py-0.5 rounded"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <div className="text-slate-600 text-xs mt-2 whitespace-pre-line leading-relaxed">
                      {proj.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Education & Certifications Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-2 border-b-2 flex items-center gap-1.5" style={{ borderColor: themeColor, color: themeColor }}>
              <BookOpen className="w-3.5 h-3.5" />
              <span>Education</span>
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-slate-900">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}</div>
                  <div className="text-slate-600 font-medium">{edu.institution}</div>
                  <div className="text-slate-500 font-mono mt-0.5 flex justify-between">
                    <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    {edu.grade && <span className="font-bold text-slate-700">{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-2 border-b-2 flex items-center gap-1.5" style={{ borderColor: themeColor, color: themeColor }}>
              <Award className="w-3.5 h-3.5" />
              <span>Certifications</span>
            </h2>
            <div className="space-y-1.5 text-xs">
              {certifications.map((cert) => {
                const certUrl = normalizeUrl(cert.url, "website");
                return (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      {certUrl ? (
                        <a href={certUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:underline flex items-center gap-1">
                          <span>{cert.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      ) : (
                        <span className="font-bold text-slate-800">{cert.name}</span>
                      )}
                      <div className="text-slate-500">{cert.issuer}</div>
                    </div>
                    {cert.date && <span className="text-slate-500 font-mono">{cert.date}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Languages & Custom Sections */}
      <div className="mt-5 flex flex-wrap gap-4 text-xs">
        {languages && languages.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Languages:</span>
            {languages.map((l) => (
              <span key={l.id} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {l.name} ({l.proficiency})
              </span>
            ))}
          </div>
        )}
      </div>

      {customSections && customSections.length > 0 && (
        <div className="mt-5 space-y-3">
          {customSections.map((sec) => (
            <section key={sec.id}>
              <h2 className="text-xs font-black uppercase tracking-wider pb-1 mb-2 border-b border-slate-200 text-slate-700">
                {sec.title}
              </h2>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                {sec.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
