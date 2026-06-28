import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Promo1 from "@/public/promo1.png";
import { ABBCursor } from "@/components/ABBCursor";
import HeroCarousel from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/ScrollAnimate";
import ChargeEstimator from "@/components/ChargeEstimator";
import FaqSection from "@/components/FaqSection";
import StickyCTA from "@/components/StickyCTA";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");

  // Custom WhatsApp helper for the page level
  const promoCode = "SRN26";

  const baseWaMsg = `${t("whatsapp.hello")}\n\n*${t("whatsapp.promo_code")}*: ${promoCode}`;
  const encodedWaMsg = encodeURIComponent(baseWaMsg);
  const mainWaUrl = `https://wa.me/6281382124551?text=${encodedWaMsg}`;

  // Custom WhatsApp helper for AC Wallbox
  const acWaMsg = `${t("whatsapp.hello")}\n\n*${t("whatsapp.interest")}*: ABB Terra AC Wallbox\n*${t("whatsapp.promo_code")}*: ${promoCode}`;
  const acWaUrl = `https://wa.me/6281382124551?text=${encodeURIComponent(acWaMsg)}`;

  // Custom WhatsApp helper for DC Fast Charger
  const dcWaMsg = `${t("whatsapp.hello")}\n\n*${t("whatsapp.interest")}*: ABB Terra DC Fast Charger\n*${t("whatsapp.promo_code")}*: ${promoCode}`;
  const dcWaUrl = `https://wa.me/6281382124551?text=${encodeURIComponent(dcWaMsg)}`;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      {/* 1. Hero Section */}
      <section
        id="home"
        className="relative py-12 md:py-24 lg:py-32 overflow-hidden"
      >
        {/* Soft decorative background glows */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-1/2 right-1/10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <ScrollAnimate
              animation="fade-in"
              duration={500}
              className="w-full"
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {t("hero.badge")}
              </span>
            </ScrollAnimate>

            <ScrollAnimate
              animation="slide-up"
              duration={600}
              delay={100}
              className="w-full"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {t("hero.heading")}
              </h1>
            </ScrollAnimate>

            <ScrollAnimate
              animation="slide-up"
              duration={600}
              delay={200}
              className="w-full"
            >
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("hero.subheading")}
              </p>
            </ScrollAnimate>

            <ScrollAnimate
              animation="slide-up"
              duration={600}
              delay={300}
              className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base px-8 py-7 rounded-full shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                <Link href={mainWaUrl} target="_blank">
                  {t("hero.cta")}
                </Link>
              </Button>
              <div className="text-center sm:text-left">
                <span className="text-xs text-muted-foreground block">
                  {t("hero.promo_hint")}
                </span>
                <span className="text-sm font-bold text-primary tracking-wider">
                  {t("hero.start_price")}
                </span>
              </div>
            </ScrollAnimate>
          </div>

          {/* Hero Right Media / Image */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <ScrollAnimate
              animation="scale-up"
              duration={700}
              delay={200}
              className="relative w-full max-w-[450px]"
            >
              {/* Soft background shape */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-emerald-500/10 rounded-[3rem] rotate-3 scale-102 -z-10 blur-sm" />

              <div className="relative bg-card border border-border/80 p-5 rounded-[3rem] shadow-2xl overflow-hidden group">
                <Image
                  src={Promo1}
                  alt="ABB Terra Charger"
                  width={500}
                  height={500}
                  priority
                  className="rounded-[2.5rem] object-cover w-full h-auto transition-transform duration-500 group-hover:scale-102"
                />

                {/* Overlapping glass card with key trust factors */}
                <div className="absolute bottom-6 left-6 right-6 bg-background/85 backdrop-blur-md border border-border/60 p-5 rounded-2xl shadow-lg flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                      Warranty Period
                    </span>
                    <span className="text-base font-black text-foreground">
                      2-Year Unit Replacement
                    </span>
                  </div>
                  <div className="bg-primary text-primary-foreground font-extrabold px-3 py-1.5 rounded-full text-xs">
                    ACTIVE
                  </div>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar Section */}
      <section className="py-8 bg-secondary/35 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border/60">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                {t("stats.stat1_num")}
              </span>
              <span className="text-sm font-semibold text-muted-foreground mt-1">
                {t("stats.stat1_text")}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                {t("stats.stat2_num")}
              </span>
              <span className="text-sm font-semibold text-muted-foreground mt-1">
                {t("stats.stat2_text")}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                {t("stats.stat3_num")}
              </span>
              <span className="text-sm font-semibold text-muted-foreground mt-1">
                {t("stats.stat3_text")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Products Showcase Section */}
      <section id="products" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <ScrollAnimate animation="fade-in">
            <div className="flex items-center justify-center mb-3">
              <ABBCursor className="text-primary mr-1" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                Product Catalog
              </span>
            </div>
          </ScrollAnimate>

          <ScrollAnimate animation="slide-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {t("products.title")}
            </h2>
          </ScrollAnimate>

          <ScrollAnimate animation="slide-up" delay={200}>
            <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed">
              {t("products.subtitle")}
            </p>
          </ScrollAnimate>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* AC Wallbox Card */}
          <ScrollAnimate animation="slide-up" delay={100} className="h-full">
            <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full hover:shadow-xl hover:border-primary/20 transition-all duration-300 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/5 border border-primary/15 px-3 py-1 rounded-full">
                  {t("products.ac_subtitle")}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-foreground mt-4 tracking-tight">
                  {t("products.ac_title")}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed">
                  {t("products.ac_desc")}
                </p>

                {/* Specs List */}
                <div className="mt-8 flex flex-col gap-3">
                  {[
                    t("products.ac_spec1"),
                    t("products.ac_spec2"),
                    t("products.ac_spec3"),
                    t("products.ac_spec4"),
                  ].map((spec, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-foreground/80">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-border/40">
                <Button
                  asChild
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 rounded-2xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Link href={acWaUrl} target="_blank">
                    {t("products.cta_ac")}
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimate>

          {/* DC Fast Charger Card */}
          <ScrollAnimate animation="slide-up" delay={200} className="h-full">
            <div className="bg-card border border-border/60 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full hover:shadow-xl hover:border-primary/20 transition-all duration-300 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />

              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/5 border border-emerald-500/15 px-3 py-1 rounded-full">
                  {t("products.dc_subtitle")}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-foreground mt-4 tracking-tight">
                  {t("products.dc_title")}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed">
                  {t("products.dc_desc")}
                </p>

                {/* Specs List */}
                <div className="mt-8 flex flex-col gap-3">
                  {[
                    t("products.dc_spec1"),
                    t("products.dc_spec2"),
                    t("products.dc_spec3"),
                    t("products.dc_spec4"),
                  ].map((spec, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-foreground/80">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-border/40">
                <Button
                  asChild
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 rounded-2xl shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Link href={dcWaUrl} target="_blank">
                    {t("products.cta_dc")}
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimate>
        </div>

        {/* Carousel Visuals */}
        <ScrollAnimate animation="fade-in" className="mt-8">
          <HeroCarousel />
        </ScrollAnimate>
      </section>

      {/* 4. Campaign Points / Why Us Section */}
      <section
        id="benefits"
        className="py-20 bg-secondary/15 border-y border-border/30"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <ScrollAnimate animation="fade-in">
              <div className="flex items-center justify-center mb-3">
                <ABBCursor className="text-primary mr-1" />
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  Authorized Standards
                </span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="slide-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {t("benefits.title")}
              </h2>
            </ScrollAnimate>

            <ScrollAnimate animation="slide-up" delay={200}>
              <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed">
                {t("benefits.subtitle")}
              </p>
            </ScrollAnimate>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1: Official Distributor */}
            <ScrollAnimate animation="slide-up" delay={100}>
              <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 flex items-start gap-5 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-2xl shrink-0">
                  {/* Shield icon svg */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {t("benefits.point1_title")}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t("benefits.point1_desc")}
                  </p>
                </div>
              </div>
            </ScrollAnimate>

            {/* Benefit 2: 7,000+ Installed */}
            <ScrollAnimate animation="slide-up" delay={200}>
              <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 flex items-start gap-5 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-2xl shrink-0">
                  {/* Map / Location icon svg */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {t("benefits.point2_title")}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t("benefits.point2_desc")}
                  </p>
                </div>
              </div>
            </ScrollAnimate>

            {/* Benefit 3: Operational Support */}
            <ScrollAnimate animation="slide-up" delay={300}>
              <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 flex items-start gap-5 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-2xl shrink-0">
                  {/* Tools icon svg */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {t("benefits.point3_title")}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t("benefits.point3_desc")}
                  </p>
                </div>
              </div>
            </ScrollAnimate>

            {/* Benefit 4: 2-Year Warranty */}
            <ScrollAnimate animation="slide-up" delay={400}>
              <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 flex items-start gap-5 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 text-primary p-3 rounded-2xl shrink-0">
                  {/* Badge / Award icon svg */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7.463 8.2l.786 3.93a1.996 1.996 0 001.958 1.608h9.438a1.997 1.997 0 001.958-1.608l.786-3.93M3.228 8.847a1.999 1.999 0 00.916 2.302L12 16.5m0 0l7.856-5.351a2 2 0 00.916-2.302l-.786-3.93A1.998 1.998 0 0018.028 4H5.972a1.998 1.998 0 00-1.958 1.608l-.786 3.93z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {t("benefits.point4_title")}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t("benefits.point4_desc")}
                  </p>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* 5. Estimator Section */}
      <section id="estimator" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <ScrollAnimate animation="fade-in">
            <div className="flex items-center justify-center mb-3">
              <ABBCursor className="text-primary mr-1" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                Smart Calculations
              </span>
            </div>
          </ScrollAnimate>

          <ScrollAnimate animation="slide-up" delay={100}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {t("estimator.title")}
            </h2>
          </ScrollAnimate>

          <ScrollAnimate animation="slide-up" delay={200}>
            <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed">
              {t("estimator.subtitle")}
            </p>
          </ScrollAnimate>
        </div>

        <ScrollAnimate animation="slide-up" delay={100}>
          <ChargeEstimator />
        </ScrollAnimate>
      </section>

      {/* 6. FAQ Section */}
      <section
        id="faq"
        className="py-20 bg-secondary/10 border-t border-border/30"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <ScrollAnimate animation="fade-in">
              <div className="flex items-center justify-center mb-3">
                <ABBCursor className="text-primary mr-1" />
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  Got Questions?
                </span>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="slide-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {t("faq.title")}
              </h2>
            </ScrollAnimate>

            <ScrollAnimate animation="slide-up" delay={200}>
              <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed">
                {t("faq.subtitle")}
              </p>
            </ScrollAnimate>
          </div>

          <ScrollAnimate animation="slide-up" delay={100}>
            <FaqSection />
          </ScrollAnimate>
        </div>
      </section>

      {/* 7. Footer Summary/CTA Banner */}
      <footer className="py-20 bg-card border-t border-border/60 relative overflow-hidden">
        {/* Soft background shape */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <ScrollAnimate
            animation="fade-in"
            className="flex flex-col items-center gap-3"
          >
            <div className="bg-primary text-primary-foreground font-black text-sm px-3.5 py-1.5 rounded-full">
              ABB
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">
              Ready to Upgrade Your EV Experience?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
              Get a free technical survey and consultation with our certified
              electrical engineering team. Protect your warranty with authentic
              ABB parts.
            </p>
          </ScrollAnimate>

          <ScrollAnimate
            animation="slide-up"
            className="w-full flex flex-col items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base px-10 py-7 rounded-full shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
              <Link href={mainWaUrl} target="_blank">
                {t("hero.cta")}
              </Link>
            </Button>

            <div className="flex flex-col items-center justify-center gap-1.5 mt-2 text-xs text-muted-foreground">
              <span className="font-bold text-foreground">
                PT Elmecon Multikencana — Authorized Distributor of ABB
              </span>
              <span>
                © 2026. All rights reserved. Original products, certified
                installation, safe and guaranteed.
              </span>
            </div>
          </ScrollAnimate>
        </div>
      </footer>

      {/* Sticky Conversion Booster trigger */}
      <StickyCTA />
    </div>
  );
}
