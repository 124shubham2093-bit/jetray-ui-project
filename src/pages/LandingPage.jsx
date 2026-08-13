import React from "react";
import { ChevronDown } from "lucide-react";
import JetrayLogo from "../components/common/JetrayLogo";
import { LANDING_FEATURES } from "../data/landing";

export default function LandingPage({ onLogin, onRegister }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 lg:px-10 h-20 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <JetrayLogo small />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button className="hover:text-slate-900">Features</button>
          <button className="hover:text-slate-900">Pricing</button>
          <button className="hover:text-slate-900">Contact</button>
          <button className="hover:text-slate-900 flex items-center gap-1">Pages <ChevronDown size={14} /></button>
        </nav>
        <div className="flex items-center gap-6">
          <button onClick={onRegister} className="text-rose-500 text-sm font-semibold">Register</button>
          <button onClick={onLogin} className="text-slate-700 text-sm font-semibold">Login</button>
        </div>
      </header>

      <section className="px-6 pt-16 pb-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">Tech Empowerment</h1>
        <p className="text-slate-500 text-base mt-3">Features that would make your life easier with WhatsApp Marketing</p>
      </section>

      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LANDING_FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <f.icon size={19} className="text-emerald-600" strokeWidth={2} />
              </div>
              <p className="text-slate-800 font-bold text-base mb-1.5">{f.title}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
