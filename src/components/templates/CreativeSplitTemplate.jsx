import React from "react";
import { 
  Mail, Phone, MapPin, Globe, 
  ExternalLink, Calendar, Award, BookOpen, Briefcase, Code, Sparkles, User 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";
import { normalizeUrl, cleanDisplayUrl, formatDate } from "../../utils/helpers";

export default function CreativeSplitTemplate({ data, themeColor, fontFamily, fontSize }) {
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
      className="w-full bg-white text-slate-800 flex flex-col md:flex-row min-h-full"
      style={{ fontFamily, fontSize: `${fontSize}px` }}
    >
      {/* Left Sidebar (35% width) */}
      <div 
        className="w-full md:w-[35%] p-6 sm:p-8 text-white flex flex-col space-y-6 shrink-0"
        style={{ backgroundColor: themeColor }}
      >
        {/* Photo & Name */}
        <div className="text-center">
          {personalInfo.showPhoto && personalInfo.photoUrl ? (
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white/30 shadow-lg mb-4"
            />
          ) : (
            <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-white/80" />
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-sm font-medium text-white/80 mt-1 uppercase tracking-wider">
            {personalInfo.jobTitle || "Your Title"}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 pt-4 border-t border-white/20 text-xs text-white/90">
          <h3 className="font-bold uppercase tracking-wider text-white text-xs opacity-75">
            Contact & Profiles
          </h3>

          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition">
              <Mail className="w-4 h-4 shrink-0 text-white/70" />
              <span className="truncate">{personalInfo.email}</span>
            </a>
          )}

          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-4 h-4 shrink-0 text-white/70" />
              <span>{personalInfo.phone}</span>
            </a>
          )}

          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0 text-white/70" />
              <span>{personalInfo.location}</span>
            </div>
          )}

          {websiteUrl && (
            <a 
              href={websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:underline font-medium text-white"
            >
              <Globe className="w-4 h-4 shrink-0 text-white/70" />
              <span className="truncate">{cleanDisplayUrl(websiteUrl)}</span>
              <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
            </a>
          )}

          {linkedinUrl && (
            <a 
              href={linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition text-white font-medium"
            >
              <LinkedinIcon className="w-4 h-4 shrink-0 fill-white" />
              <span className="truncate">LinkedIn Profile</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
            </a>
          )}

          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition text-white font-medium"
            >
              <GithubIcon className="w-4 h-4 shrink-0 fill-white" />
              <span className="truncate">GitHub Profile</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
            </a>
          )}

          {instagramUrl && (
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-lg transition text-white font-medium"
            >
              <InstagramIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">Instagram</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
            </a>
          )}
        </div>

        {/* Education */}
        {education && education.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/20 text-xs text-white/90">
            <h3 className="font-bold uppercase tracking-wider text-white text-xs opacity-75 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Education</span>
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="space-y-0.5">
                <div className="font-bold text-white">{edu.degree}</div>
                {edu.fieldOfStudy && <div>{edu.fieldOfStudy}</div>}
                <div className="text-white/80">{edu.institution}</div>
                <div className="text-[11px] text-white/70">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)} {edu.grade ? `(${edu.grade})` : ""}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-white/20 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-white text-xs opacity-75 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skills & Expertise</span>
            </h3>
            {skills.map((skillGroup) => (
              <div key={skillGroup.id} className="space-y-1">
                <div className="font-semibold text-white/90 text-[11px] uppercase">{skillGroup.category}</div>
                <div className="flex flex-wrap gap-1">
                  {(Array.isArray(skillGroup.items) ? skillGroup.items : [skillGroup.items]).map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/20 text-white text-[11px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-white/20 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-white text-xs opacity-75">
              Languages
            </h3>
            {languages.map((l) => (
              <div key={l.id} className="flex justify-between text-white/90">
                <span>{l.name}</span>
                <span className="text-white/70 text-[11px]">{l.proficiency}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content Area (65% width) */}
      <div className="w-full md:w-[65%] p-6 sm:p-8 space-y-6">
        {/* Profile / Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b-2" style={{ borderColor: themeColor }}>
              About Me
            </h2>
            <p className="text-slate-700 leading-relaxed text-justify text-sm">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-3 border-b-2 flex items-center gap-1.5" style={{ borderColor: themeColor }}>
              <Briefcase className="w-4 h-4 text-slate-600" />
              <span>Experience</span>
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {exp.role} <span className="font-normal text-slate-500">at</span> <span className="font-bold" style={{ color: themeColor }}>{exp.company}</span>
                    </h3>
                    <span className="text-xs font-medium text-slate-500">
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.location && <div className="text-xs text-slate-400">{exp.location}</div>}
                  {exp.description && (
                    <div className="text-slate-700 whitespace-pre-line text-xs sm:text-sm mt-1 leading-relaxed">
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
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-3 border-b-2 flex items-center gap-1.5" style={{ borderColor: themeColor }}>
              <Code className="w-4 h-4 text-slate-600" />
              <span>Projects</span>
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => {
                const liveUrl = normalizeUrl(proj.liveUrl, "website");
                const gitUrl = normalizeUrl(proj.githubUrl, "github");
                return (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-bold text-slate-900 text-sm">
                        {proj.name}
                        {proj.techStack && (
                          <span className="font-normal text-xs text-slate-500 ml-1.5">
                            ({proj.techStack})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {gitUrl && (
                          <a href={gitUrl} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline flex items-center gap-1 font-medium">
                            <GithubIcon className="w-3 h-3" />
                            <span>GitHub</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {liveUrl && (
                          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline flex items-center gap-1 font-semibold">
                            <Globe className="w-3 h-3" />
                            <span>Live</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <div className="text-slate-600 whitespace-pre-line text-xs leading-relaxed">
                        {proj.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b-2 flex items-center gap-1.5" style={{ borderColor: themeColor }}>
              <Award className="w-4 h-4 text-slate-600" />
              <span>Certifications</span>
            </h2>
            <div className="space-y-2 text-xs">
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
                    {cert.date && <span className="text-slate-500">{cert.date}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <div className="space-y-3">
            {customSections.map((sec) => (
              <section key={sec.id}>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 mb-2 border-b-2" style={{ borderColor: themeColor }}>
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
    </div>
  );
}
