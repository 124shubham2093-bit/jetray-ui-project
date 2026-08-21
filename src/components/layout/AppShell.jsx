import React, { useState } from "react";
import { NAV } from "../../data/navigation";
import SidebarNav from "./SidebarNav";
import Topbar from "./Topbar";
import StubPage from "./StubPage";
import {
  DashboardPage,
  VendorsPage,
  LeadsPage,
  LeadDashboardPage,
  LeadIntegrationsPage,
  RecurringStripeSubscriptionsPage,
  ManualPrepaidSubscriptionsPage,
  LocalFilesMediaPage,
  TranslationsPage,
  PagesPage,
  GeneralConfigurationPage,
  UserVendorConfigurationPage,
  CurrencyConfigurationPage,
  PaymentGatewaysConfigurationPage,
  SubscriptionPlansConfigurationPage,
  EmailConfigurationPage,
  SocialLoginConfigurationPage,
  SetupIntegrationsConfigurationPage,
  MiscConfigurationPage,
  WhatsAppOnboardingPage,
  PlatformModulesPage,
  CreditSystemPage,
  PlanAddonControlPage,
  LicenseInformationPage,
} from "../../pages";

export default function AppShell() {
  const [active, setActive] = useState("dashboard");

  const getActiveLabel = () => {
    const parent = NAV.find(
      (item) => item.key === active
    );

    if (parent) {
      return parent.label;
    }

    for (const item of NAV) {
      if (item.children) {
        for (const child of item.children) {
          const childKey =
            typeof child === "object"
              ? child.key
              : typeof child === "string"
              ? child
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "-")
              : child;

          const childLabel =
            typeof child === "object"
              ? child.label
              : String(child);

          if (
            childKey === active ||
            child === active
          ) {
            return `${item.label} / ${childLabel}`;
          }
        }
      }
    }

    return "Dashboard";
  };

  const currentLabel = getActiveLabel();

  return (
    <div className="h-screen w-full bg-[#0b0f1e] flex overflow-hidden">
      <SidebarNav
        active={active}
        setActive={setActive}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title={
            active === "dashboard"
              ? "Dashboard"
              : currentLabel
          }
        />

        <main className="flex-1 overflow-y-auto">
          {/* Dashboard */}
          {active === "dashboard" && (
            <DashboardPage />
          )}

          {/* Vendors */}
          {active === "vendors" && (
            <VendorsPage />
          )}

          {/* Leads */}
          {active === "leads" && (
            <LeadsPage />
          )}

          {/* Lead CRM Dashboard */}
          {active === "lead-dashboard" && (
            <LeadDashboardPage />
          )}

          {/* Lead CRM Global Integrations */}
          {active === "integrations" && (
            <LeadIntegrationsPage />
          )}

          {/* Recurring Stripe Subscriptions */}
          {active === "recurring-stripe" && (
            <RecurringStripeSubscriptionsPage />
          )}

          {/* Manual / Prepaid Subscriptions */}
          {active === "manual-prepaid" && (
            <ManualPrepaidSubscriptionsPage />
          )}
          {/* Local Files & Media */}
          {active === "files" && (
            <LocalFilesMediaPage />
          )}

          {/* Translations */}
          {active === "translations" && (
            <TranslationsPage />
          )}

          {/* Pages */}
          {active === "pages" && (
            <PagesPage />
          )}
          {/* General Configuration */}
          {active === "general" && (
            <GeneralConfigurationPage />
          )}

          {/* User & Vendor Configuration */}
          {active === "user-vendor" && (
            <UserVendorConfigurationPage />
          )}

          {/* Currency Configuration */}
          {active === "currency" && (
            <CurrencyConfigurationPage />
          )}

          {/* Payment Gateways Configuration */}
          {active === "payment-gateways" && (
            <PaymentGatewaysConfigurationPage />
          )}

          {/* Subscription Plans Configuration */}
          {active === "subscription-plans" && (
            <SubscriptionPlansConfigurationPage />
          )}

          {/* Email Configuration */}
          {active === "email" && (
            <EmailConfigurationPage />
          )}

          {/* Social Login Configuration */}
          {active === "social-login" && (
            <SocialLoginConfigurationPage />
          )}

          {/* Setup & Integrations Configuration */}
          {active === "setup-integrations" && (
            <SetupIntegrationsConfigurationPage />
          )}

          {/* Misc Configuration */}
          {active === "misc" && (
            <MiscConfigurationPage />
          )}

          {/* WhatsApp Onboarding Configuration */}
          {active === "whatsapp-onboarding" && (
            <WhatsAppOnboardingPage />
          )}

          {/* Platform Modules */}
          {(active === "modules" || active === "platform-modules") && (
            <PlatformModulesPage initialTab="modules" />
          )}

          {/* Credit System */}
          {active === "credit-system" && (
            <CreditSystemPage />
          )}

          {/* Plan Addon Control */}
          {active === "plan-addons" && (
            <PlanAddonControlPage />
          )}

          {/* License Information */}
          {active === "license-info" && (
            <LicenseInformationPage />
          )}

          {/* Fallback */}
          {active !== "dashboard" &&
            active !== "vendors" &&
            active !== "leads" &&
            active !== "lead-dashboard" &&
            active !== "integrations" &&
            active !== "recurring-stripe" &&
            active !== "manual-prepaid" &&
            active !== "files" &&
            active !== "translations" &&
            active !== "pages" &&
            active !== "modules" &&
            active !== "platform-modules" &&
            active !== "credit-system" &&
            active !== "plan-addons" &&
            active !== "license-info" &&
            active !== "general" &&
            active !== "user-vendor" &&
            active !== "currency" &&
            active !== "payment-gateways" &&
            active !== "subscription-plans" &&
            active !== "email" &&
            active !== "social-login" &&
            active !== "setup-integrations" &&
            active !== "misc" &&
            active !== "whatsapp-onboarding" && (
              <StubPage label={active} />
            )}
        </main>
      </div>
    </div>
  );
}