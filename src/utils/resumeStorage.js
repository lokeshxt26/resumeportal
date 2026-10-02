import { initialResumeData, emptyResumeData } from "../data/initialData";

const STORAGE_KEY = "resumify_saved_resumes_list";
const ACTIVE_ID_KEY = "resumify_active_resume_id";

export function getStoredResumes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading stored resumes", e);
  }

  // Default initial resume if none exists
  const defaultResume = {
    id: "resume-default",
    title: "Senior Full Stack Resume (FAANG)",
    lastModified: new Date().toISOString(),
    templateId: "luxe-gradient",
    themeColor: "#4f46e5",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    data: initialResumeData
  };

  saveStoredResumes([defaultResume]);
  return [defaultResume];
}

export function saveStoredResumes(resumes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  } catch (e) {
    console.error("Error writing resumes to storage", e);
  }
}

export function getActiveResumeId() {
  return localStorage.getItem(ACTIVE_ID_KEY) || "resume-default";
}

export function setActiveResumeId(id) {
  localStorage.setItem(ACTIVE_ID_KEY, id);
}

export function createNewResumeEntry(title = "My New Resume", useSample = false) {
  const newEntry = {
    id: "resume-" + Date.now(),
    title: title.trim() || "Untitled Resume",
    lastModified: new Date().toISOString(),
    templateId: "luxe-gradient",
    themeColor: "#4f46e5",
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    data: useSample ? JSON.parse(JSON.stringify(initialResumeData)) : JSON.parse(JSON.stringify(emptyResumeData))
  };

  const list = getStoredResumes();
  const updated = [newEntry, ...list];
  saveStoredResumes(updated);
  setActiveResumeId(newEntry.id);
  return newEntry;
}

export function duplicateResumeEntry(id) {
  const list = getStoredResumes();
  const target = list.find((r) => r.id === id);
  if (!target) return null;

  const clone = {
    ...JSON.parse(JSON.stringify(target)),
    id: "resume-" + Date.now(),
    title: `${target.title} (Copy)`,
    lastModified: new Date().toISOString()
  };

  const updated = [clone, ...list];
  saveStoredResumes(updated);
  return clone;
}

export function deleteResumeEntry(id) {
  const list = getStoredResumes();
  const updated = list.filter((r) => r.id !== id);
  saveStoredResumes(updated);
  return updated;
}
