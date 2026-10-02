import React from "react";
import { 
  Mail, Phone, MapPin, Globe, 
  ExternalLink, Calendar 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";
import { normalizeUrl, cleanDisplayUrl, formatDate } from "../../utils/helpers";

export default function MinimalistTemplate({ data, themeColor, fontFamily, fontSize }) {
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
      className="w-full bg-white text-stone-900 p-8 sm:p-12 leading-relaxed"
      style={{ fontFamily, fontSize: `${fontSize}px` }}
    >
      {/* Top Header */}
      <div className="pb-6 border-b border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-stone-900">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-sm font-medium tracking-widest uppercase mt-1" style={{ color: themeColor }}>
              {personalInfo.jobTitle || "Professional Title"}
            </p>
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover border border-stone-300"
            />
          )}
        </div>

        {/* Minimalist Contact Line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-stone-600">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:text-stone-900 transition flex items-center gap-1">
              <Mail className="w-3 h-3 text-stone-400" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="hover:text-stone-900 transition flex items-center gap-1">
              <Phone className="w-3 h-3 text-stone-400" />
              <span>{personalInfo.phone}</span>
            </a>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-stone-800 flex items-center gap-1">
              <Globe className="w-3 h-3 text-stone-400" />
              <span>{cleanDisplayUrl(websiteUrl)}</span>
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-stone-800 flex items-center gap-1">
              <LinkedinIcon className="w-3 h-3 fill-stone-600" />
              <span>LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-stone-800 flex items-center gap-1">
              <GithubIcon className="w-3 h-3 fill-stone-700" />
              <span>GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>
          )}
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-stone-800 flex items-center gap-1">
              <InstagramIcon className="w-3 h-3" />
              <span>Instagram</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mt-5">
          <p className="text-stone-700 text-sm leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-semibold text-stone-900 text-sm">
                    {exp.role}, <span className="font-normal text-stone-600">{exp.company}</span>
                  </div>
                  <div className="text-xs text-stone-400 font-mono">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-stone-600 text-xs sm:text-sm mt-1 whitespace-pre-line leading-relaxed">
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
        <section className="mt-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => {
              const liveUrl = normalizeUrl(proj.liveUrl, "website");
              const gitUrl = normalizeUrl(proj.githubUrl, "github");
              return (
                <div key={proj.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-semibold text-stone-900 text-sm">
                      {proj.name}
                      {proj.techStack && (
                        <span className="font-normal text-stone-500 text-xs ml-2">
                          / {proj.techStack}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      {gitUrl && (
                        <a href={gitUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-stone-700 flex items-center gap-1">
                          <span>Source</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-stone-900 font-medium flex items-center gap-1">
                          <span>Demo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <div className="text-stone-600 text-xs mt-1 whitespace-pre-line leading-relaxed">
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
        <section className="mt-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">
            Skills
          </h2>
          <div className="space-y-1.5 text-xs">
            {skills.map((s) => (
              <div key={s.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <span className="font-semibold text-stone-700 min-w-32">{s.category}:</span>
                <span className="text-stone-600">
                  {Array.isArray(s.items) ? s.items.join(", ") : s.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-semibold text-stone-900">{edu.degree}</div>
                  <div className="text-stone-600">{edu.institution}</div>
                  <div className="text-stone-400">{formatDate(edu.startDate)} - {formatDate(edu.endDate)} {edu.grade ? `(${edu.grade})` : ""}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">
              Certifications
            </h2>
            <div className="space-y-2 text-xs">
              {certifications.map((c) => {
                const certUrl = normalizeUrl(c.url, "website");
                return (
                  <div key={c.id}>
                    {certUrl ? (
                      <a href={certUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 hover:underline flex items-center gap-1">
                        <span>{c.name}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                    ) : (
                      <div className="font-semibold text-stone-900">{c.name}</div>
                    )}
                    <div className="text-stone-500">{c.issuer} {c.date ? `• ${c.date}` : ""}</div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
