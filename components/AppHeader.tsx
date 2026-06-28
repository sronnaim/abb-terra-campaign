"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu, Cancel } from "@hugeicons/core-free-icons";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("HomePage.nav");
  const currentLocale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (locale: "en" | "id") => {
    if (typeof window === "undefined") return;
    
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    
    // Preserve URL query parameters (important for Ads tracking)
    const searchParams = window.location.search;
    
    const cleanPath = pathname.replace(/^\/(en|id)(?=\/|$)/, "");
    const newPath = `/${locale}${cleanPath}${searchParams}`;
    
    router.push(newPath);
  };

  const navItems = [
    { href: "#home", label: t("home") },
    { href: "#products", label: t("products") },
    { href: "#benefits", label: t("benefits") },
    { href: "#estimator", label: t("estimator") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground font-extrabold text-sm px-3 py-1.5 rounded-full transition-transform group-hover:scale-105 duration-300">
            ABB
          </div>
          <span className="font-extrabold text-lg tracking-wider text-foreground group-hover:opacity-80 transition-opacity">
            TERRA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Controls & Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex bg-secondary/80 p-1 rounded-full border border-border/40">
            <button
              onClick={() => switchLanguage("id")}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                currentLocale === "id"
                  ? "bg-background text-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                currentLocale === "en"
                  ? "bg-background text-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full"
          >
            <HugeiconsIcon
              icon={mobileMenuOpen ? Cancel : Menu}
              className="h-6 w-6 text-foreground"
            />
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/60 py-6 px-6 flex flex-col gap-6 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="h-px bg-border/60 w-full" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Language</span>
            <div className="flex bg-secondary p-1 rounded-full border border-border/40">
              <button
                onClick={() => {
                  switchLanguage("id");
                  setMobileMenuOpen(false);
                }}
                className={`text-xs px-4 py-2 rounded-full transition-all ${
                  currentLocale === "id" ? "bg-background text-foreground font-bold shadow-sm" : "text-muted-foreground"
                }`}
              >
                Bahasa Indonesia
              </button>
              <button
                onClick={() => {
                  switchLanguage("en");
                  setMobileMenuOpen(false);
                }}
                className={`text-xs px-4 py-2 rounded-full transition-all ${
                  currentLocale === "en" ? "bg-background text-foreground font-bold shadow-sm" : "text-muted-foreground"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
