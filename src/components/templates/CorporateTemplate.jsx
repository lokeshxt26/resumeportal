import React from "react";
import { 
  Mail, Phone, MapPin, Globe, 
  ExternalLink, Calendar, Award, BookOpen, Briefcase, Code, Sparkles 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";
import { normalizeUrl, cleanDisplayUrl, formatDate } from "../../utils/helpers";

export default function CorporateTemplate({ data, themeColor, fontFamily, fontSize }) {
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
      className="w-full bg-white text-slate-800 p-8 sm:p-12 leading-relaxed"
      style={{ fontFamily, fontSize: `${fontSize}px` }}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b-2" style={{ borderColor: themeColor }}>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: themeColor }}>
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-lg font-semibold text-slate-600 mt-1">
            {personalInfo.jobTitle || "Your Professional Title"}
          </p>

          {/* Contact & Social Links Bar */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm text-slate-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{personalInfo.email}</span>
              </a>
            )}

            {personalInfo.phone && (
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{personalInfo.phone}</span>
              </a>
            )}

            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{personalInfo.location}</span>
              </span>
            )}

            {websiteUrl && (
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-indigo-700 hover:underline font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{cleanDisplayUrl(websiteUrl)}</span>
              </a>
            )}

            {linkedinUrl && (
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-blue-700 hover:underline font-medium bg-blue-50 px-2 py-0.5 rounded"
              >
                <LinkedinIcon className="w-3.5 h-3.5 fill-blue-700" />
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}

            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-slate-900 hover:underline font-medium bg-slate-100 px-2 py-0.5 rounded"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}

            {instagramUrl && (
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-pink-700 hover:underline font-medium bg-pink-50 px-2 py-0.5 rounded"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}
          </div>
        </div>

        {/* Profile Picture (Optional) */}
        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <div className="shrink-0">
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border-2 shadow-sm"
              style={{ borderColor: themeColor }}
            />
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {summary && (
        <section className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b border-slate-200">
            Professional Summary
          </h2>
          <p className="text-slate-700 text-justify leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-3 border-b border-slate-200 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-600" />
            <span>Work Experience</span>
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-slate-900 text-base">
                    {exp.role} <span className="font-medium text-slate-600">at</span> <span style={{ color: themeColor }}>{exp.company}</span>
                  </div>
                  <div className="text-xs font-medium text-slate-500 flex items-center gap-1 sm:text-right">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</span>
                    {exp.location && <span>• {exp.location}</span>}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-slate-700 whitespace-pre-line text-sm mt-1 leading-normal pl-1">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-3 border-b border-slate-200 flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-slate-600" />
            <span>Featured Projects</span>
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => {
              const liveUrl = normalizeUrl(proj.liveUrl, "website");
              const gitUrl = normalizeUrl(proj.githubUrl, "github");
              return (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-bold text-slate-900 text-sm">
                      {proj.name}
                      {proj.techStack && (
                        <span className="font-normal text-xs text-slate-500 ml-2">
                          [{proj.techStack}]
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium">
                      {gitUrl && (
                        <a 
                          href={gitUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-slate-800 hover:underline"
                        >
                          <GithubIcon className="w-3 h-3" />
                          <span>Code</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      )}
                      {liveUrl && (
                        <a 
                          href={liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-indigo-700 hover:underline font-semibold"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Live Demo</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <div className="text-slate-700 whitespace-pre-line text-sm leading-normal">
                      {proj.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b border-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-slate-600" />
            <span>Technical & Professional Skills</span>
          </h2>
          <div className="space-y-1.5 text-sm">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-bold text-slate-800 shrink-0 min-w-36 text-xs uppercase">
                  {skillGroup.category}:
                </span>
                <span className="text-slate-700">
                  {Array.isArray(skillGroup.items) ? skillGroup.items.join(" • ") : skillGroup.items}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b border-slate-200 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            <span>Education</span>
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-sm">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                  <div className="text-slate-600 text-xs">{edu.institution} {edu.location ? `• ${edu.location}` : ""}</div>
                </div>
                <div className="text-xs text-slate-500 sm:text-right mt-1 sm:mt-0">
                  <div>{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</div>
                  {edu.grade && <div className="font-semibold text-slate-700">{edu.grade}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages & Custom Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b border-slate-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-slate-600" />
              <span>Certifications</span>
            </h2>
            <div className="space-y-1.5 text-xs">
              {certifications.map((cert) => {
                const certUrl = normalizeUrl(cert.url, "website");
                return (
                  <div key={cert.id} className="flex items-start justify-between">
                    <div>
                      {certUrl ? (
                        <a href={certUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-800 hover:underline flex items-center gap-1">
                          <span>{cert.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      ) : (
                        <span className="font-bold text-slate-800">{cert.name}</span>
                      )}
                      <div className="text-slate-500">{cert.issuer}</div>
                    </div>
                    {cert.date && <span className="text-slate-500 shrink-0 font-medium">{cert.date}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b border-slate-200 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span>Languages</span>
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {languages.map((lang) => (
                <div key={lang.id} className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">
                  <span className="font-bold">{lang.name}:</span> <span className="text-slate-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Custom Sections (e.g. Achievements) */}
      {customSections && customSections.length > 0 && (
        <div className="mt-5 space-y-4">
          {customSections.map((sec) => (
            <section key={sec.id}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b border-slate-200">
                {sec.title}
              </h2>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {sec.items.map((item, idx) => (
                  <li key={idx} className="leading-normal">{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
