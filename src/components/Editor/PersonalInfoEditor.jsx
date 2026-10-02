import React, { useRef } from "react";
import { 
  User, Mail, Phone, MapPin, Globe, 
  Upload, Trash2, Image as ImageIcon, Eye, EyeOff, Sparkles 
} from "lucide-react";
import { LinkedinIcon, GithubIcon, InstagramIcon } from "../icons/SocialIcons";

export default function PersonalInfoEditor({ personalInfo, onChange }) {
  const fileInputRef = useRef(null);

  const updateField = (field, value) => {
    onChange({
      ...personalInfo,
      [field]: value
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Please select an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...personalInfo,
        photoUrl: event.target?.result,
        showPhoto: true
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange({
      ...personalInfo,
      photoUrl: "",
      showPhoto: false
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sampleAvatars = [
    { name: "Executive 1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" },
    { name: "Executive 2", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
    { name: "Executive 3", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Photo Upload & Options */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            Profile Picture
          </span>
          <span className="text-[11px] font-normal text-slate-500">Optional for resumes</span>
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {personalInfo.photoUrl ? (
            <div className="relative group shrink-0">
              <img 
                src={personalInfo.photoUrl} 
                alt="Profile Preview" 
                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
              />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-md transition"
                title="Remove photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 shrink-0">
              <User className="w-8 h-8" />
            </div>
          )}

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="hidden" 
              id="photo-upload"
            />
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <label 
                htmlFor="photo-upload"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload Photo
              </label>

              {personalInfo.photoUrl && (
                <button
                  type="button"
                  onClick={() => updateField("showPhoto", !personalInfo.showPhoto)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    personalInfo.showPhoto 
                      ? "bg-slate-100 border-slate-300 text-slate-800" 
                      : "bg-amber-50 border-amber-300 text-amber-800"
                  }`}
                >
                  {personalInfo.showPhoto ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {personalInfo.showPhoto ? "Visible on Resume" : "Hidden from Resume"}
                </button>
              )}
            </div>

            {/* Quick avatar choices */}
            {!personalInfo.photoUrl && (
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                <span>Or use sample:</span>
                {sampleAvatars.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChange({ ...personalInfo, photoUrl: item.url, showPhoto: true })}
                    className="underline hover:text-indigo-600 font-medium"
                  >
                    Avatar {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={personalInfo.fullName || ""}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="e.g. Karthik Verma"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Professional Title *
          </label>
          <input 
            type="text" 
            value={personalInfo.jobTitle || ""}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="email" 
              value={personalInfo.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="e.g. karthik.verma@example.com"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="tel" 
              value={personalInfo.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Location (City, Country)
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={personalInfo.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="e.g. Hyderabad, India"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Personal Website / Portfolio
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={personalInfo.website || ""}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="e.g. https://karthikverma.dev"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
            />
          </div>
        </div>
      </div>

      {/* Social & Professional Links (LinkedIn, GitHub, Instagram) */}
      <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Social & Developer Links (Clickable in PDF)
          </h3>
          <span className="text-[11px] text-indigo-600 font-medium">Auto-formatted for live links</span>
        </div>

        {/* LinkedIn Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <LinkedinIcon className="w-4 h-4 text-blue-600 fill-blue-600" />
            LinkedIn Profile
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={personalInfo.linkedin || ""}
              onChange={(e) => updateField("linkedin", e.target.value)}
              placeholder="e.g. linkedin.com/in/karthik-verma or username"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden bg-white"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Clicking this in your PDF will directly open your LinkedIn profile.</p>
        </div>

        {/* GitHub Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <GithubIcon className="w-4 h-4 text-slate-900 fill-slate-900" />
            GitHub Profile
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={personalInfo.github || ""}
              onChange={(e) => updateField("github", e.target.value)}
              placeholder="e.g. github.com/karthik-verma or username"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-hidden bg-white"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Clicking this in your PDF will directly open your GitHub repositories.</p>
        </div>

        {/* Instagram Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <InstagramIcon className="w-4 h-4 text-pink-600" />
            Instagram Profile
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={personalInfo.instagram || ""}
              onChange={(e) => updateField("instagram", e.target.value)}
              placeholder="e.g. instagram.com/karthik_tech or username"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-hidden bg-white"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Clicking this in your PDF will directly open your Instagram account.</p>
        </div>
      </div>
    </div>
  );
}
