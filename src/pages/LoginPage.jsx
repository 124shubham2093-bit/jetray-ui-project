import React from "react";
import { Lock, User as UserIcon } from "lucide-react";
import { JetrayLogo, StarBg, AuthField, AuthNav } from "../components/common";
import AuthPromoBanner from "../components/auth/AuthPromoBanner";

export default function LoginPage({ onSubmit, onGoRegister }) {
  return (
    <div className="min-h-screen bg-[#0b0f1e] relative">
      <StarBg />
      <AuthNav onLogin={() => {}} onRegister={onGoRegister} />
      <div className="relative z-10 flex justify-center px-4 pb-16">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-[#141a2e] p-8 sm:p-10 flex flex-col items-center">
            <JetrayLogo />
            <h2 className="text-white font-bold text-lg mt-4">Jetray International Pvt Ltd</h2>
            <h3 className="text-white font-extrabold text-2xl mt-3">Welcome Back</h3>
            <p className="text-slate-500 text-xs mt-1 mb-6">Sign in to your account</p>
            <div className="w-full space-y-3">
              <AuthField icon={UserIcon} defaultValue="admin@atozmarketing.shop" />
              <AuthField icon={Lock} type="password" defaultValue="••••••••" />
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-400">
                  <input type="checkbox" className="accent-emerald-500" /> Remember me
                </label>
                <button className="text-emerald-400 font-medium">Forgot password?</button>
              </div>
              <button onClick={onSubmit} className="w-full bg-emerald-500 hover:bg-emerald-400 transition-colors text-slate-900 text-sm font-bold py-3 rounded-lg mt-2">
                Sign In
              </button>
            </div>
          </div>
          <AuthPromoBanner
            icon={UserIcon}
            title="Jetray International Pvt Ltd"
            description="Empower your business with next-gen WhatsApp marketing solutions."
            features={["Bulk WhatsApp Campaigns", "Smart Chat Bots & Auto Replies", "Real-time Team Inbox & Analytics"]}
            buttonText="Sign Up Free"
            onButtonClick={onGoRegister}
          />
        </div>
      </div>
    </div>
  );
}
