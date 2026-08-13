import {
  FolderOpen, Check, Users, MessageSquare, FileText, FileStack
} from "lucide-react";

export const growthData = [
  { m: "Aug 2025", v: 0 }, { m: "Sep 2025", v: 0 }, { m: "Oct 2025", v: 0 },
  { m: "Nov 2025", v: 0 }, { m: "Dec 2025", v: 0 }, { m: "Jan 2026", v: 0 },
  { m: "Feb 2026", v: 0 }, { m: "Mar 2026", v: 0 }, { m: "Apr 2026", v: 0 },
  { m: "May 2026", v: 0 }, { m: "Jun 2026", v: 6 }, { m: "Jul 2026", v: 2 },
];

export const newVendors = [
  { i: "S", name: "SANWARIYA", date: "Saturday 4th July 2026", color: "bg-rose-500" },
  { i: "H", name: "HEROOOO", date: "Friday 3rd July 2026", color: "bg-amber-500" },
  { i: "A", name: "ABC", date: "Saturday 27th June 2026", color: "bg-sky-500" },
  { i: "M", name: "MOHINI", date: "Friday 26th June 2026", color: "bg-orange-500" },
  { i: "U", name: "UPGRADE INDIA", date: "Tuesday 23rd June 2026", color: "bg-teal-500" },
  { i: "H", name: "HERO", date: "Friday 19th June 2026", color: "bg-indigo-500" },
];

export const STAT_CARDS = [
  { label: "TOTAL", sub: "Total Vendors", value: 8, icon: FolderOpen, iconBg: "bg-[#2b3350]", iconColor: "text-slate-300" },
  { label: "ACTIVE", sub: "Active Vendors", value: 8, icon: Check, iconBg: "bg-emerald-600", iconColor: "text-white" },
  { label: "SOCIAL", sub: "Total Contacts", value: 7, icon: Users, iconBg: "bg-indigo-500", iconColor: "text-white" },
  { label: "LIVE", sub: "Total Campaigns", value: 0, icon: MessageSquare, iconBg: "bg-amber-600", iconColor: "text-white" },
  { label: "WAITLIST", sub: "Messages In Queue", value: 0, icon: FileText, iconBg: "bg-slate-600", iconColor: "text-white" },
  { label: "SUCCESS", sub: "Messages Processed", value: 9, icon: FileStack, iconBg: "bg-rose-900", iconColor: "text-rose-200" },
];
