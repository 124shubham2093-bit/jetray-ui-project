import React, { useState } from "react";
import {
  LayoutDashboard, Users, Share2, Filter, CreditCard, FolderOpen,
  Languages, FileText, Settings, ChevronDown, ChevronRight, Moon,
  UserPlus, FileStack, Smartphone, MessageSquare, Bot, Plug,
  Check, Lock, Mail, Building2, Phone, User as UserIcon,
  Eye, MoreHorizontal, Search
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

/* ============================================================
   TOKENS (matched to source video, not invented)
   Landing:  bg white, heading navy #1e2a4a, icon badge mint #0f9d78 on #e8f7f1
   Auth/App: bg near-black navy #0b0f1e, panel #141a2e, sidebar #0a0e1a
   Accents:  violet pill #7c5cff (nav/primary), teal->emerald gradient (auth art panel)
   Table:    mint-green header bar #34d399/#10b981, teal name links #2dd4bf
   Status:   emerald ACTIVE pill
   ============================================================ */

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "vendors", label: "Vendors", icon: Users },
  { key: "resellers", label: "Reseller Management", icon: Share2 },
  { key: "leads", label: "Leads CRM", icon: Filter, expandable: true },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard, expandable: true,
    children: ["Recurring Stripe", "Manual/Prepaid"] },
  { key: "files", label: "Local Files & Media", icon: FolderOpen },
  { key: "translations", label: "Translations", icon: Languages },
  { key: "pages", label: "Pages", icon: FileText },
  { key: "configurations", label: "Configurations", icon: Settings, expandable: true,
    children: ["General", "User & Vendor", "Currency", "Payment Gateways", "Subscription Plans", "Email"] },
];

const growthData = [
  { m: "Aug 2025", v: 0 }, { m: "Sep 2025", v: 0 }, { m: "Oct 2025", v: 0 },
  { m: "Nov 2025", v: 0 }, { m: "Dec 2025", v: 0 }, { m: "Jan 2026", v: 0 },
  { m: "Feb 2026", v: 0 }, { m: "Mar 2026", v: 0 }, { m: "Apr 2026", v: 0 },
  { m: "May 2026", v: 0 }, { m: "Jun 2026", v: 6 }, { m: "Jul 2026", v: 2 },
];

const vendors = [
  { name: "sanwariya", admin: "krish choudhary", user: "krishchoudhary001", email: "sanwariy001gads@gmail.com", status: "Active", mobile: "8955001456", adminStatus: "Active", created: "Saturday 4th July 2026" },
  { name: "heroooo", admin: "JDNSDIJISJD ADJH", user: "kduhsuihiusc", email: "asd@gmail.com", status: "Active", mobile: "1234578690", adminStatus: "Active", created: "Friday 3rd July 2026" },
  { name: "abc", admin: "rohitt rohitt", user: "rohitt", email: "rohitt@gmail.com", status: "Active", mobile: "911234567890", adminStatus: "Active", created: "Saturday 27th June 2026" },
  { name: "mohini", admin: "ANKUSH DOTRE", user: "mohinin", email: "ANKUSHDHOTRE1@GMAIL.COM", status: "Active", mobile: "9999999999", adminStatus: "Active", created: "Friday 26th June 2026" },
];

const newVendors = [
  { i: "S", name: "SANWARIYA", date: "Saturday 4th July 2026", color: "bg-rose-500" },
  { i: "H", name: "HEROOOO", date: "Friday 3rd July 2026", color: "bg-amber-500" },
  { i: "A", name: "ABC", date: "Saturday 27th June 2026", color: "bg-sky-500" },
  { i: "M", name: "MOHINI", date: "Friday 26th June 2026", color: "bg-orange-500" },
  { i: "U", name: "UPGRADE INDIA", date: "Tuesday 23rd June 2026", color: "bg-teal-500" },
  { i: "H", name: "HERO", date: "Friday 19th June 2026", color: "bg-indigo-500" },
];

/* --------------------------- Shared bits --------------------------- */

function JetrayLogo({ small }) {
  return (
    <div className={`${small ? "w-14 h-14" : "w-16 h-16"} rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0`}>
      <span className="text-slate-800 font-serif italic font-bold text-[10px] leading-none">JR</span>
      <span className="text-[6px] tracking-widest text-slate-500 mt-0.5">JETRAY</span>
    </div>
  );
}

/* ============================== LANDING ============================== */

const LANDING_FEATURES = [
  { icon: UserPlus, title: "Embedded Signup", desc: "Onboard customers with ease with our integrated Embedded Signup system, reducing friction and increasing conversion." },
  { icon: FileStack, title: "Template Management", desc: "Handle templates directly within the application without Meta visits." },
  { icon: Smartphone, title: "Multiple Numbers", desc: "Supports multiple phone numbers for the same account." },
  { icon: MessageSquare, title: "WhatsApp Chat", desc: "Native WhatsApp interface for a familiar messaging experience." },
  { icon: Bot, title: "Bot Replies / Chat Bot", desc: "Automate responses and engage customers 24/7 with intelligent bot replies." },
  { icon: Plug, title: "APIs", desc: "Seamless connection between different services and data sharing." },
];

function LandingPage({ onLogin, onRegister }) {
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

/* ============================== AUTH ============================== */

function StarBg() {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    top: Math.random() * 100, left: Math.random() * 100, size: Math.random() * 2 + 1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <div key={i} className="absolute rounded-full bg-slate-600"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size, opacity: 0.6 }} />
      ))}
    </div>
  );
}

function AuthNav({ onLogin, onRegister }) {
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

function AuthField({ icon: Icon, ...props }) {
  return (
    <div className="flex items-center gap-2.5 bg-slate-900/70 border border-slate-700/60 rounded-lg px-3.5 py-3">
      <Icon size={15} className="text-emerald-400 shrink-0" />
      <input
        {...props}
        className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 w-full"
      />
    </div>
  );
}

function LoginPage({ onSubmit, onGoRegister }) {
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
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
            <div className="w-40 h-32 rounded-xl bg-white/10 border border-white/20 mb-6 flex items-center justify-center">
              <UserIcon size={44} className="text-white/80" />
            </div>
            <h3 className="text-white font-extrabold text-xl">Jetray International Pvt Ltd</h3>
            <p className="text-emerald-50 text-xs mt-2 max-w-[220px]">Empower your business with next-gen WhatsApp marketing solutions.</p>
            <div className="space-y-1.5 mt-4 text-left">
              {["Bulk WhatsApp Campaigns", "Smart Chat Bots & Auto Replies", "Real-time Team Inbox & Analytics"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-white text-xs">
                  <Check size={13} /> {t}
                </div>
              ))}
            </div>
            <button onClick={onGoRegister} className="mt-6 border border-white/60 text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-white/10">
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ onSubmit, onGoLogin }) {
  return (
    <div className="min-h-screen bg-[#0b0f1e] relative">
      <StarBg />
      <AuthNav onLogin={onGoLogin} onRegister={() => {}} />
      <div className="relative z-10 flex justify-center px-4 pb-16">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 sm:p-10 flex flex-col items-center justify-center text-center order-2 md:order-1">
            <div className="w-40 h-32 rounded-xl bg-white/10 border border-white/20 mb-6 flex items-center justify-center">
              <Building2 size={44} className="text-white/80" />
            </div>
            <h3 className="text-white font-extrabold text-xl">Welcome Back!</h3>
            <p className="text-emerald-50 text-xs mt-2 max-w-[220px]">Already registered? Sign in to access your dashboard and manage your WhatsApp campaigns.</p>
            <button onClick={onGoLogin} className="mt-6 border border-white/60 text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-white/10">
              Sign In
            </button>
          </div>
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

/* ============================== APP SHELL ============================== */

function SidebarNav({ active, setActive }) {
  return (
    <aside className="w-52 bg-[#0a0e1a] border-r border-slate-800/60 flex flex-col shrink-0">
      <div className="h-20 flex items-center justify-center border-b border-slate-800/60">
        <JetrayLogo small />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <div key={item.key}>
              <button
                onClick={() => setActive(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  isActive ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon size={15} strokeWidth={2} className="shrink-0" />
                <span className="truncate flex-1 text-left">{item.label}</span>
                {item.expandable && <ChevronRight size={13} className="opacity-60" />}
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function Topbar({ title }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60">
      <h1 className="text-white font-semibold text-base">{title}</h1>
      <div className="flex items-center gap-4">
        <Moon size={16} className="text-slate-400" />
        <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
          <UserIcon size={15} /> Super Administrator <ChevronDown size={13} />
        </div>
      </div>
    </header>
  );
}

const STAT_CARDS = [
  { label: "TOTAL", sub: "Total Vendors", value: 8, icon: FolderOpen, iconBg: "bg-[#2b3350]", iconColor: "text-slate-300" },
  { label: "ACTIVE", sub: "Active Vendors", value: 8, icon: Check, iconBg: "bg-emerald-600", iconColor: "text-white" },
  { label: "SOCIAL", sub: "Total Contacts", value: 7, icon: Users, iconBg: "bg-indigo-500", iconColor: "text-white" },
  { label: "LIVE", sub: "Total Campaigns", value: 0, icon: MessageSquare, iconBg: "bg-amber-600", iconColor: "text-white" },
  { label: "WAITLIST", sub: "Messages In Queue", value: 0, icon: FileText, iconBg: "bg-slate-600", iconColor: "text-white" },
  { label: "SUCCESS", sub: "Messages Processed", value: 9, icon: FileStack, iconBg: "bg-rose-900", iconColor: "text-rose-200" },
];

function DashboardPage() {
  const [range, setRange] = useState("MONTHLY");
  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CARDS.map((c) => (
          <div key={c.label} className="bg-[#131a2e] border border-slate-800/60 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center`}>
                <c.icon size={16} className={c.iconColor} />
              </div>
              <span className="text-slate-500 text-[10px] font-semibold tracking-wide">{c.label}</span>
            </div>
            <p className="text-white text-2xl font-bold">{c.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5">
        <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-white font-semibold text-sm">Vendor Growth</p>
              <p className="text-slate-500 text-[10px] tracking-wide font-medium">ANALYTICS OVERVIEW (LAST 12 MONTHS)</p>
            </div>
            <div className="flex items-center gap-1 bg-[#0b0f1e] rounded-full p-1">
              {["MONTHLY", "QUARTERLY"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`text-[10px] font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    range === r ? "bg-emerald-500 text-slate-900" : "text-slate-400"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="h-56 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <XAxis dataKey="m" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} interval={1} />
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#94a3b8" }}
                  cursor={{ fill: "rgba(139,92,246,0.08)" }}
                />
                <Bar dataKey="v" fill="#8b5cf6" radius={[3, 3, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">New Vendors</p>
            <button className="bg-violet-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">See all</button>
          </div>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-[10px] text-slate-500 font-semibold tracking-wide pb-2 border-b border-slate-800/60">
            <span>VENDOR TITLE</span><span>REGISTERED ON</span><span>STATUS</span>
          </div>
          <div className="divide-y divide-slate-800/60">
            {newVendors.map((v) => (
              <div key={v.name} className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-6 h-6 rounded-full ${v.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                    {v.i}
                  </div>
                  <span className="text-teal-400 text-xs font-semibold truncate">{v.name}</span>
                </div>
                <span className="text-slate-400 text-[11px] whitespace-nowrap">{v.date}</span>
                <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full text-center">ACTIVE</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VendorsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-xl font-bold">Vendors</h2>
        <button className="bg-violet-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">Add New Vendor</button>
      </div>
      <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            Show <select className="bg-[#0b0f1e] border border-slate-800 rounded px-2 py-1 text-slate-300"><option>100</option></select> entries
          </div>
          <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-800 rounded-lg px-3 py-1.5">
            <Search size={13} className="text-slate-500" />
            <input placeholder="Search" className="bg-transparent text-xs text-slate-300 outline-none" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-emerald-500 text-[#0b0f1e] text-[10px] font-bold tracking-wide uppercase">
                <th className="px-4 py-2.5">Vendor Title</th>
                <th className="px-4 py-2.5">Quick Actions</th>
                <th className="px-4 py-2.5">Admin User Name</th>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.name} className="border-t border-slate-800/60 text-xs align-top">
                  <td className="px-4 py-3 text-teal-400 font-semibold">{v.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <button className="bg-violet-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-full">Login</button>
                      <button className="bg-violet-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-full">Details and Subscription</button>
                      <button className="bg-violet-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 justify-center"><Eye size={10} /> Quick View</button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{v.admin}<br /><span className="text-slate-500">{v.user}</span></td>
                  <td className="px-4 py-3 text-slate-400">{v.email}</td>
                  <td className="px-4 py-3"><span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">{v.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5 max-w-[160px]">
                      <button className="bg-sky-600/20 text-sky-400 text-[10px] font-medium px-2 py-1 rounded">Edit</button>
                      <button className="bg-amber-500 text-slate-900 text-[10px] font-medium px-2 py-1 rounded">Soft Delete</button>
                      <button className="bg-rose-600 text-white text-[10px] font-medium px-2 py-1 rounded">Delete</button>
                      <button className="bg-violet-600 text-white text-[10px] font-medium px-2 py-1 rounded">Media &amp; Files</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-500">
          <span>Showing 1 to {vendors.length} of {vendors.length} entries</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded bg-[#0b0f1e] border border-slate-800">Previous</button>
            <button className="px-2.5 py-1 rounded bg-emerald-500 text-slate-900 font-semibold">1</button>
            <button className="px-2.5 py-1 rounded bg-[#0b0f1e] border border-slate-800">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StubPage({ label }) {
  const item = NAV.find((n) => n.key === label);
  const Icon = item?.icon || Settings;
  return (
    <div className="p-6">
      <div className="bg-[#131a2e] border border-dashed border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
        <div className="w-11 h-11 rounded-lg bg-violet-600/15 border border-violet-600/30 flex items-center justify-center mb-3">
          <Icon size={20} className="text-violet-400" />
        </div>
        <p className="text-slate-200 font-medium text-sm">{item?.label} — built in the next phase</p>
        <p className="text-slate-500 text-xs mt-1 max-w-xs">This section ships in Phase 2–5.</p>
      </div>
    </div>
  );
}

function AppShell() {
  const [active, setActive] = useState("dashboard");
  const currentLabel = NAV.find((n) => n.key === active)?.label || "Dashboard";
  return (
    <div className="h-screen w-full bg-[#0b0f1e] flex overflow-hidden">
      <SidebarNav active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={active === "dashboard" ? "Dashboard" : currentLabel} />
        <main className="flex-1 overflow-y-auto">
          {active === "dashboard" && <DashboardPage />}
          {active === "vendors" && <VendorsPage />}
          {active !== "dashboard" && active !== "vendors" && <StubPage label={active} />}
        </main>
      </div>
    </div>
  );
}

/* ============================== ROOT ============================== */

export default function App() {
  const [view, setView] = useState("landing");
  if (view === "app") return <AppShell />;
  if (view === "login") return <LoginPage onSubmit={() => setView("app")} onGoRegister={() => setView("register")} />;
  if (view === "register") return <RegisterPage onSubmit={() => setView("app")} onGoLogin={() => setView("login")} />;
  return <LandingPage onLogin={() => setView("login")} onRegister={() => setView("register")} />;
}
