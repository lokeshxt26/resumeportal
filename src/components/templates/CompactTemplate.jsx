import React from "react";
import { 
  Mail, Phone, MapPin, Globe, 
  ExternalLink, Calendar 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";
import { normalizeUrl, cleanDisplayUrl, formatDate } from "../../utils/helpers";

export default function CompactTemplate({ data, themeColor, fontFamily, fontSize }) {
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
      className="w-full bg-white text-slate-900 p-6 sm:p-8 leading-snug"
      style={{ fontFamily, fontSize: `${fontSize - 1}px` }}
    >
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 border-b-2 pb-3 mb-3" style={{ borderColor: themeColor }}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-sm font-semibold mt-0.5" style={{ color: themeColor }}>
            {personalInfo.jobTitle || "Your Title"}
          </p>
        </div>

        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt={personalInfo.fullName}
            className="w-16 h-16 rounded-md object-cover border"
          />
        )}
      </div>

      {/* Contact Line */}
      <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-[11px] text-slate-600 mb-3 bg-slate-50 p-2 rounded border border-slate-200">
        {personalInfo.email && (
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-slate-900">
            <Mail className="w-3 h-3 text-slate-500" />
            <span>{personalInfo.email}</span>
          </a>
        )}
        {personalInfo.phone && (
          <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 hover:text-slate-900">
            <Phone className="w-3 h-3 text-slate-500" />
            <span>{personalInfo.phone}</span>
          </a>
        )}
        {personalInfo.location && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span>{personalInfo.location}</span>
          </span>
        )}
        {websiteUrl && (
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-700 hover:underline">
            <Globe className="w-3 h-3" />
            <span>{cleanDisplayUrl(websiteUrl)}</span>
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-700 hover:underline font-medium">
            <LinkedinIcon className="w-3 h-3 fill-blue-700" />
            <span>LinkedIn</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-900 hover:underline font-medium">
            <GithubIcon className="w-3 h-3 fill-black" />
            <span>GitHub</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        )}
        {instagramUrl && (
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-pink-700 hover:underline font-medium">
            <InstagramIcon className="w-3 h-3" />
            <span>Instagram</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-3 text-xs text-slate-700 leading-normal">
          <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mr-1">Summary:</span>
          {summary}
        </div>
      )}

      {/* Skills Bar */}
      {skills && skills.length > 0 && (
        <div className="mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b pb-0.5 mb-1" style={{ borderColor: themeColor }}>
            Skills
          </div>
          <div className="text-xs space-y-0.5">
            {skills.map((s) => (
              <div key={s.id} className="flex gap-2">
                <span className="font-bold text-slate-800 text-[11px] min-w-28">{s.category}:</span>
                <span className="text-slate-700">{Array.isArray(s.items) ? s.items.join(", ") : s.items}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b pb-0.5 mb-2" style={{ borderColor: themeColor }}>
            Experience
          </div>
          <div className="space-y-2">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-slate-500"> — </span>
                    <span className="font-semibold" style={{ color: themeColor }}>{exp.company}</span>
                    {exp.location && <span className="text-slate-400 text-[10px]"> ({exp.location})</span>}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed mt-0.5 pl-2">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b pb-0.5 mb-2" style={{ borderColor: themeColor }}>
            Projects
          </div>
          <div className="space-y-2">
            {projects.map((proj) => {
              const liveUrl = normalizeUrl(proj.liveUrl, "website");
              const gitUrl = normalizeUrl(proj.githubUrl, "github");
              return (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-slate-900">{proj.name}</span>
                      {proj.techStack && <span className="text-[10px] text-slate-500 ml-1.5">[{proj.techStack}]</span>}
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      {gitUrl && (
                        <a href={gitUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-700 flex items-center gap-0.5 font-medium">
                          <span>Git</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-indigo-700 flex items-center gap-0.5 font-semibold">
                          <span>Demo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <div className="text-[11px] text-slate-600 whitespace-pre-line mt-0.5 pl-2 leading-relaxed">
                      {proj.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Education & Certifications Row */}
      <div className="grid grid-cols-2 gap-4">
        {education && education.length > 0 && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b pb-0.5 mb-1" style={{ borderColor: themeColor }}>
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="text-[11px]">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-600">{edu.institution}</div>
                <div className="text-slate-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)} {edu.grade ? `(${edu.grade})` : ""}</div>
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b pb-0.5 mb-1" style={{ borderColor: themeColor }}>
              Certifications
            </div>
            {certifications.map((c) => {
              const cUrl = normalizeUrl(c.url, "website");
              return (
                <div key={c.id} className="text-[11px]">
                  {cUrl ? (
                    <a href={cUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:underline flex items-center gap-1">
                      <span>{c.name}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                    </a>
                  ) : (
                    <div className="font-bold text-slate-800">{c.name}</div>
                  )}
                  <div className="text-slate-500">{c.issuer} ({c.date})</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
