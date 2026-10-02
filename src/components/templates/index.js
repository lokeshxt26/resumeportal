import CorporateTemplate from "./CorporateTemplate";
import ModernTechTemplate from "./ModernTechTemplate";
import CreativeSplitTemplate from "./CreativeSplitTemplate";
import MinimalistTemplate from "./MinimalistTemplate";
import CompactTemplate from "./CompactTemplate";
import LuxeGradientTemplate from "./LuxeGradientTemplate";
import ExecutiveDarkTemplate from "./ExecutiveDarkTemplate";

export const RESUME_TEMPLATES = [
  {
    id: "luxe-gradient",
    name: "Luxe Gradient Pro",
    tagline: "Impressive visual gradient banner with geometric backdrop & cards",
    component: LuxeGradientTemplate,
    badge: "Impressive Design",
    featured: true
  },
  {
    id: "executive-dark",
    name: "Executive Midnight",
    tagline: "High-contrast midnight banner with gold/sapphire accents & badge",
    component: ExecutiveDarkTemplate,
    badge: "Executive Luxe",
    featured: true
  },
  {
    id: "corporate",
    name: "Corporate Executive",
    tagline: "Top-choice ATS standard for FAANG, Fortune 500, Consulting",
    component: CorporateTemplate,
    badge: "ATS Optimal"
  },
  {
    id: "modern-tech",
    name: "Modern Tech / Dev",
    tagline: "Sleek software engineering style with badge chips & repo links",
    component: ModernTechTemplate,
    badge: "Tech Favorite"
  },
  {
    id: "creative-split",
    name: "Creative 2-Column",
    tagline: "High impact two-column layout with photo & dark sidebar",
    component: CreativeSplitTemplate,
    badge: "Creative"
  },
  {
    id: "minimalist",
    name: "Minimalist Elite",
    tagline: "Ultra-clean typography, generous whitespace & crisp lines",
    component: MinimalistTemplate,
    badge: "Clean"
  },
  {
    id: "compact",
    name: "Compact 1-Pager",
    tagline: "Maximized content density for comprehensive 1-page resumes",
    component: CompactTemplate,
    badge: "1-Page Fit"
  }
];

export const COLOR_THEMES = [
  { name: "Tech Indigo", value: "#4f46e5", bg: "bg-indigo-600" },
  { name: "Navy Blue", value: "#1e3a8a", bg: "bg-blue-900" },
  { name: "Emerald Green", value: "#059669", bg: "bg-emerald-600" },
  { name: "Slate Charcoal", value: "#334155", bg: "bg-slate-700" },
  { name: "Ruby Crimson", value: "#b91c1c", bg: "bg-red-700" },
  { name: "Royal Purple", value: "#7c3aed", bg: "bg-purple-600" },
  { name: "Modern Teal", value: "#0d9488", bg: "bg-teal-600" },
  { name: "Amber Gold", value: "#d97706", bg: "bg-amber-600" },
  { name: "Jet Black", value: "#09090b", bg: "bg-zinc-950" }
];

export const FONT_OPTIONS = [
  { name: "Inter (Modern Sans)", value: "'Inter', sans-serif" },
  { name: "Poppins (Display Tech)", value: "'Poppins', sans-serif" },
  { name: "Merriweather (Executive Serif)", value: "'Merriweather', serif" },
  { name: "JetBrains (Code Mono)", value: "'JetBrains Mono', monospace" }
];
