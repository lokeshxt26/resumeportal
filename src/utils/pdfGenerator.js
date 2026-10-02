import html2pdf from "html2pdf.js";

/**
 * Generates and downloads a direct .pdf file to the user's device.
 * @param {string} elementId - ID of DOM element to render as PDF
 * @param {string} fileName - Target output file name (e.g., "Karthik_Verma_Resume.pdf")
 * @returns {Promise<void>}
 */
export async function downloadDirectPDF(elementId, fileName = "Resume.pdf") {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id #${elementId} not found.`);
  }

  // Ensure clean filename with .pdf extension
  const safeFileName = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;

  const opt = {
    margin: [0, 0, 0, 0],
    filename: safeFileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      scrollY: 0,
      windowWidth: 794 // 210mm in standard 96dpi pixels
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }
  };

  return html2pdf().set(opt).from(element).save();
}
