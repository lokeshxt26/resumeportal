import React from "react";
import { Plus, Trash2, Award, ExternalLink } from "lucide-react";

export default function CertificationsEditor({ certifications = [], onChange }) {
  const addCert = () => {
    const newCert = {
      id: "cert-" + Date.now(),
      name: "",
      issuer: "",
      date: "",
      url: ""
    };
    onChange([...certifications, newCert]);
  };

  const removeCert = (id) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  const updateCert = (id, field, value) => {
    onChange(
      certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Add professional certifications, licenses, and credential links.
        </p>
        <button
          type="button"
          onClick={addCert}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No certifications added yet</p>
          <button
            type="button"
            onClick={addCert}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Certification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="border border-slate-200 rounded-xl p-3.5 bg-white shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  Certificate Details
                </span>
                <button
                  type="button"
                  onClick={() => removeCert(cert.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={cert.name || ""}
                    onChange={(e) => updateCert(cert.id, "name", e.target.value)}
                    placeholder="e.g. AWS Solutions Architect Associate"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={cert.issuer || ""}
                    onChange={(e) => updateCert(cert.id, "issuer", e.target.value)}
                    placeholder="e.g. Amazon Web Services (AWS)"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Issue Date / Year
                  </label>
                  <input
                    type="text"
                    value={cert.date || ""}
                    onChange={(e) => updateCert(cert.id, "date", e.target.value)}
                    placeholder="e.g. 2023 or Nov 2023"
                    className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Credential Verification URL
                  </label>
                  <input
                    type="text"
                    value={cert.url || ""}
                    onChange={(e) => updateCert(cert.id, "url", e.target.value)}
                    placeholder="https://credly.com/..."
                    className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
