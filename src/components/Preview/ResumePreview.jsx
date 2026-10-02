import React, { useRef, useState } from "react";
import { 
  ZoomIn, ZoomOut, RotateCcw, Download, Printer, 
  ExternalLink, CheckCircle2, AlertCircle, Sparkles, Eye, Loader2 
} from "lucide-react";
import confetti from "canvas-confetti";
import { RESUME_TEMPLATES } from "../templates";
import { downloadDirectPDF } from "../../utils/pdfGenerator";

export default function ResumePreview({ 
  resumeData, 
  selectedTemplateId, 
  themeColor, 
  fontFamily, 
  fontSize,
  onPrint
}) {
  const [zoom, setZoom] = useState(100);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const previewRef = useRef(null);

  const selectedTemplate = RESUME_TEMPLATES.find((t) => t.id === selectedTemplateId) || RESUME_TEMPLATES[0];
  const TemplateComponent = selectedTemplate.component;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
  const handleZoomReset = () => setZoom(100);

  // Direct PDF Download to device
  const handleDirectDownload = async () => {
    setIsGeneratingPDF(true);
    const candidateName = resumeData?.personalInfo?.fullName || "Resume";
    const fileName = `${candidateName.replace(/\s+/g, "_")}_Resume.pdf`;

    try {
      await downloadDirectPDF("resume-printable-area", fileName);

      // Fire celebratory confetti!
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("Direct PDF download failed, falling back to print", err);
      // Fallback to print
      if (onPrint) onPrint();
      else window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 rounded-2xl border border-slate-300/80 overflow-hidden shadow-inner">
      {/* Preview Action Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-indigo-600" />
            Live Preview
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
            {selectedTemplate.name}
          </span>
          {selectedTemplate.badge && (
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold hidden sm:inline">
              {selectedTemplate.badge}
            </span>
          )}
        </div>

        {/* Zoom & PDF Actions */}
        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-mono font-medium text-slate-600 select-none min-w-[42px] text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleZoomReset}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition border-l border-slate-200"
              title="Reset zoom to 100%"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Alternative Vector Print */}
          <button
            type="button"
            onClick={onPrint || (() => window.print())}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
            title="Open Browser Print Dialog"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Primary Direct Download PDF Button */}
          <button
            type="button"
            disabled={isGeneratingPDF}
            onClick={handleDirectDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg text-xs font-extrabold shadow-sm hover:shadow transition active:scale-95 disabled:opacity-60"
            title="Download .PDF directly into your device"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Downloading PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (Direct)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helper Banner */}
      <div className="no-print bg-indigo-50/90 border-b border-indigo-100 px-4 py-1.5 flex items-center justify-between text-[11px] text-indigo-900">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />
          <span><b>Direct Download:</b> Clicking "Download PDF" directly saves the <b>.pdf file</b> to your device with background designs intact!</span>
        </span>
        <span className="font-mono text-indigo-600 hidden md:inline">A4 Standard Format</span>
      </div>

      {/* Scrollable Container with centered A4 Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
        <div 
          style={{ 
            transform: `scale(${zoom / 100})`, 
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out"
          }}
          className="transition-transform duration-100"
        >
          {/* Printable A4 Paper Sheet */}
          <div 
            ref={previewRef}
            id="resume-printable-area"
            className="resume-sheet bg-white shadow-2xl rounded-sm mx-auto overflow-hidden print:shadow-none print:m-0"
            style={{ 
              width: "210mm", 
              minHeight: "297mm",
              boxSizing: "border-box"
            }}
          >
            <TemplateComponent 
              data={resumeData} 
              themeColor={themeColor} 
              fontFamily={fontFamily}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
