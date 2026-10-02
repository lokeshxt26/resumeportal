import React, { useState } from "react";
import { X, Lock, Mail, User, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function AuthModal({ isOpen, onClose, currentUser, onLogin, onLogout }) {
  const [tab, setTab] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    if (tab === "signup" && !name) {
      setError("Please enter your full name.");
      return;
    }

    const userObj = {
      name: tab === "signup" ? name : (name || email.split("@")[0]),
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      createdAt: new Date().toLocaleDateString()
    };

    onLogin(userObj);
    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: "Karthik Verma",
      email: "karthik.verma@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      role: "Senior Software Engineer",
      createdAt: "Oct 2026"
    };
    onLogin(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Resumify Cloud Sync</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {currentUser ? "User Profile & Account" : tab === "login" ? "Welcome Back!" : "Create Free Account"}
          </h2>
          <p className="text-xs text-indigo-100 mt-1">
            {currentUser 
              ? "All your created resumes are securely saved to your account."
              : "Save multiple resumes, download PDFs directly, and access them anytime."}
          </p>
        </div>

        {currentUser ? (
          /* Profile Details if Already Logged In */
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <img 
                src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} 
                alt={currentUser.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-indigo-600 shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-extrabold text-base text-slate-900">{currentUser.name}</h3>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pro Member Active</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onLogout}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition border border-red-200"
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-sm"
              >
                Continue Editing
              </button>
            </div>
          </div>
        ) : (
          /* Login / Signup Form */
          <div className="p-6 space-y-4">
            {/* Tab switch */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => { setTab("login"); setError(""); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  tab === "login" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setTab("signup"); setError(""); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  tab === "signup" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {tab === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Karthik Verma"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-sm rounded-xl shadow-md transition active:scale-95"
              >
                {tab === "login" ? "Sign In & Access Resumes" : "Create Account & Save Resumes"}
              </button>
            </form>

            {/* Quick Demo Login Option */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>One-Click Instant Demo Login</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
              <p className="text-[11px] text-slate-400 mt-1.5">
                No password needed for instant testing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
