import {
  LayoutDashboard, Users, Share2, Filter, CreditCard,
  FolderOpen, Languages, FileText, Settings
} from "lucide-react";

export const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "vendors", label: "Vendors", icon: Users },
  { key: "resellers", label: "Reseller Management", icon: Share2 },
  {
    key: "leads-crm",
    label: "Leads CRM",
    icon: Filter,
    expandable: true,
    children: [
      { key: "lead-dashboard", label: "Dashboard" },
      { key: "leads", label: "Leads" },
      { key: "integrations", label: "Integrations" },
    ],
  },
  {
    key: "subscriptions",
    label: "Subscriptions",
    icon: CreditCard,
    expandable: true,
    children: [
      { key: "recurring-stripe", label: "Recurring Stripe" },
      { key: "manual-prepaid", label: "Manual/Prepaid" },
    ],
  },
  { key: "files", label: "Local Files & Media", icon: FolderOpen },
  { key: "translations", label: "Translations", icon: Languages },
  { key: "pages", label: "Pages", icon: FileText },
  {
    key: "configurations",
    label: "Configurations",
    icon: Settings,
    expandable: true,
    children: [
      { key: "general", label: "General" },
      { key: "user-vendor", label: "User & Vendor" },
      { key: "currency", label: "Currency" },
      { key: "payment-gateways", label: "Payment Gateways" },
      { key: "subscription-plans", label: "Subscription Plans" },
      { key: "email", label: "Email" },
      { key: "social-login", label: "Social Login" },
      { key: "setup-integrations", label: "Setup & Integrations" },
      { key: "misc", label: "Misc" },
      { key: "whatsapp-onboarding", label: "WhatsApp Onboarding" },
    ],
  },
];
