"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";

export default function StickyCTA() {
  const t = useTranslations("HomePage.whatsapp");
  const [isVisible, setIsVisible] = useState(false);
  const [promoCode, setPromoCode] = useState<string>("SRN26");

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling down 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Read promo code and UTM params if available
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("promo") || params.get("utm_campaign") || "SRN26";
      setPromoCode(code);
    }
  }, []);

  const triggerWhatsApp = () => {
    if (typeof window === "undefined") return;

    // Get current page URL query parameters
    const params = new URLSearchParams(window.location.search);
    // Construct message template
    const baseMsg = `${t("hello")}\n\n*${t("promo_code")}*: ${promoCode}`;

    const encoded = encodeURIComponent(baseMsg);
    window.open(`https://wa.me/6281382124551?text=${encoded}`, "_blank");
  };

  return (
    <>
      {/* Desktop Floating Button */}
      <div
        className={`hidden md:block fixed bottom-8 right-8 z-40 transition-all duration-500 transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        }`}
      >
        <button
          onClick={triggerWhatsApp}
          className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-4 pl-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative"
          aria-label="WhatsApp consultation"
        >
          {/* Pulsing notification badge */}
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-primary border border-white dark:border-background"></span>
          </span>

          <span className="text-sm font-semibold tracking-wide pr-1">
            {t("cta_floating")}
          </span>
          <div className="bg-white/20 p-1.5 rounded-full">
            <HugeiconsIcon icon={WhatsappIcon} className="h-5 w-5 text-white" />
          </div>
        </button>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-t border-border/50 p-4 pb-6 transition-all duration-500 transform shadow-[0_-8px_30px_rgb(0,0,0,0.06)] ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={triggerWhatsApp}
          className="w-full flex items-center justify-center gap-3 bg-emerald-500 active:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <HugeiconsIcon icon={WhatsappIcon} className="h-5 w-5 text-white" />
          <span className="text-sm font-bold tracking-wide">
            {t("cta_floating")}
          </span>
        </button>
      </div>
    </>
  );
}
