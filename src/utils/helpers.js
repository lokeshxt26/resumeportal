/**
 * Normalizes user-provided profile links so they always open correctly in a new tab.
 * @param {string} input - user typed string (e.g. "karthik", "github.com/karthik", or "https://github.com/karthik")
 * @param {'github' | 'linkedin' | 'instagram' | 'website'} type
 */
export function normalizeUrl(input, type) {
  if (!input) return "";
  let trimmed = input.trim();
  if (!trimmed) return "";

  // If already starts with http:// or https://
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // If it's a domain like github.com/user
  if (trimmed.startsWith("www.") || trimmed.includes(".com") || trimmed.includes(".org") || trimmed.includes(".dev") || trimmed.includes(".io")) {
    return `https://${trimmed}`;
  }

  // If user just entered their handle / username
  const cleanHandle = trimmed.replace(/^@/, "");
  switch (type) {
    case "github":
      return `https://github.com/${cleanHandle}`;
    case "linkedin":
      if (cleanHandle.includes("/")) {
        return `https://linkedin.com/${cleanHandle}`;
      }
      return `https://linkedin.com/in/${cleanHandle}`;
    case "instagram":
      return `https://instagram.com/${cleanHandle}`;
    case "website":
      return `https://${trimmed}`;
    default:
      return `https://${trimmed}`;
  }
}

/**
 * Display label for social links (clean without https://)
 */
export function cleanDisplayUrl(url, type) {
  if (!url) return "";
  let clean = url.replace(/^https?:\/\/(www\.)?/, "");
  clean = clean.replace(/\/$/, "");
  return clean;
}

/**
 * Formats YYYY-MM to readable "Mon YYYY" (e.g., "2022-04" -> "Apr 2022")
 */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  if (dateStr.toLowerCase() === "present") return "Present";
  
  const parts = dateStr.split("-");
  if (parts.length === 2) {
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (month >= 1 && month <= 12) {
      return `${months[month - 1]} ${year}`;
    }
  }
  return dateStr;
}
