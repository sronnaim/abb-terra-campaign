"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01 } from "@hugeicons/core-free-icons";

export default function FaqSection() {
  const t = useTranslations("HomePage.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen
                ? "bg-card border-primary/20 shadow-md"
                : "bg-card/40 border-border/60 hover:border-border"
            }`}
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-foreground focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base md:text-lg tracking-tight leading-snug">
                {faq.q}
              </span>
              <span
                className={`bg-secondary p-1.5 rounded-full text-foreground/70 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-primary bg-primary/10" : ""
                }`}
              >
                <HugeiconsIcon icon={ArrowDown01} className="h-4 w-4" />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-1 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/10">
                {faq.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
