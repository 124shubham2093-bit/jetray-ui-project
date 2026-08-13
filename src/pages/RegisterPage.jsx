import React from "react";
import { Building2, User as UserIcon, Mail, Phone, Lock, Check } from "lucide-react";
import { JetrayLogo, StarBg, AuthField, AuthNav } from "../components/common";
import AuthPromoBanner from "../components/auth/AuthPromoBanner";

export default function RegisterPage({ onSubmit, onGoLogin }) {
  return (
    <div className="min-h-screen bg-[#0b0f1e] relative">
      <StarBg />
      <AuthNav onLogin={onGoLogin} onRegister={() => {}} />
      <div className="relative z-10 flex justify-center px-4 pb-16">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
          <AuthPromoBanner
            icon={Building2}
            title="Welcome Back!"
            description="Already registered? Sign in to access your dashboard and manage your WhatsApp campaigns."
            buttonText="Sign In"
            onButtonClick={onGoLogin}
            className="order-2 md:order-1"
          />
          <div className="bg-[#141a2e] p-8 sm:p-10 flex flex-col items-center order-1 md:order-2">
            <JetrayLogo />
            <h2 className="text-white font-bold text-base mt-4 text-center">Jetray International Pvt Ltd</h2>
            <h3 className="text-white font-extrabold text-xl mt-2">Create Account</h3>
            <p className="text-slate-500 text-xs mt-1 mb-5">Register your business today</p>
            <div className="w-full space-y-2.5">
              <AuthField icon={Building2} placeholder="Company/Vendor Name" />
              <div className="grid grid-cols-2 gap-2.5">
                <AuthField icon={UserIcon} placeholder="First name" />
                <AuthField icon={UserIcon} placeholder="Last name" />
              </div>
              <AuthField icon={Mail} defaultValue="admin@atozmarketing.shop" />
              <AuthField icon={Phone} placeholder="Mobile (with country code)" />
              <AuthField icon={Mail} placeholder="Email address" />
              <div className="grid grid-cols-2 gap-2.5">
                <AuthField icon={Lock} type="password" defaultValue="••••••••" />
                <AuthField icon={Check} placeholder="Confirm password" />
              </div>
              <button onClick={onSubmit} className="w-full bg-emerald-500 hover:bg-emerald-400 transition-colors text-slate-900 text-sm font-bold py-3 rounded-lg mt-2">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
