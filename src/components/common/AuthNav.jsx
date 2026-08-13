import React from "react";
import { ChevronDown, Moon } from "lucide-react";
import JetrayLogo from "./JetrayLogo";

export default function AuthNav({ onLogin, onRegister }) {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 lg:px-10 h-24">
      <JetrayLogo small />
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
        <button className="hover:text-white">Features</button>
        <button className="hover:text-white">Pricing</button>
        <button className="hover:text-white">Contact</button>
        <button className="hover:text-white flex items-center gap-1">Pages <ChevronDown size={14} /></button>
      </nav>
      <div className="flex items-center gap-6">
        <button onClick={onRegister} className="text-rose-500 text-sm font-semibold">Register</button>
        <button onClick={onLogin} className="text-slate-200 text-sm font-semibold">Login</button>
        <Moon size={16} className="text-slate-400" />
      </div>
    </header>
  );
}
