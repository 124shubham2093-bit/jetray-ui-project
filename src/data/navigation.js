import {
  LayoutDashboard, Users, Share2, Filter, CreditCard,
  FolderOpen, Languages, FileText, Settings
} from "lucide-react";

export const NAV = [
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
