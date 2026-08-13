import React, { useState } from "react";
import AppShell from "./components/layout/AppShell";
import { LandingPage, LoginPage, RegisterPage } from "./pages";

/* ============================== ROOT ============================== */

export default function App() {
  const [view, setView] = useState("landing");
  if (view === "app") return <AppShell />;
  if (view === "login") return <LoginPage onSubmit={() => setView("app")} onGoRegister={() => setView("register")} />;
  if (view === "register") return <RegisterPage onSubmit={() => setView("app")} onGoLogin={() => setView("login")} />;
  return <LandingPage onLogin={() => setView("login")} onRegister={() => setView("register")} />;
}
