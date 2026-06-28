"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

interface EVModel {
  name: string;
  batteryKwh: number;
}

const EV_PRESETS: EVModel[] = [
  { name: "Wuling Air EV Lite/Standard", batteryKwh: 17.3 },
  { name: "Wuling Air EV Long Range", batteryKwh: 26.7 },
  { name: "Wuling Binguo EV 333km", batteryKwh: 31.9 },
  { name: "Wuling Binguo EV 410km", batteryKwh: 37.9 },
  { name: "Hyundai Ioniq 5 Standard", batteryKwh: 58.0 },
  { name: "Hyundai Ioniq 5 Long Range", batteryKwh: 72.6 },
  { name: "BYD Atto 3 Extended", batteryKwh: 60.5 },
  { name: "BYD Seal Premium/Performance", batteryKwh: 82.5 },
  { name: "Omoda E5", batteryKwh: 61.0 },
  { name: "Tesla Model 3 / Y RWD", batteryKwh: 60.0 },
];

export default function ChargeEstimator() {
  const t = useTranslations("HomePage.estimator");
  const wt = useTranslations("HomePage.whatsapp");

  const [selectedPreset, setSelectedPreset] = useState<string>(
    "Wuling Air EV Long Range",
  );
  const [batterySize, setBatterySize] = useState<number>(26.7);
  const [targetPercent, setTargetPercent] = useState<number>(80);
  const [promoCode, setPromoCode] = useState<string>("TERRAPROMO");

  useEffect(() => {
    // Read promo code and UTM params if available
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("promo") || params.get("utm_campaign") || "SRN26";
      setPromoCode(code);
    }
  }, []);

  // Update battery size when preset changes
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPreset(val);
    if (val !== "custom") {
      const found = EV_PRESETS.find((ev) => ev.name === val);
      if (found) {
        setBatterySize(found.batteryKwh);
      }
    }
  };

  const energyNeeded = (batterySize * (targetPercent - 10)) / 100; // Charging from 10% to target%

  // Charger speeds in kW
  const chargers = [
    { name: t("standard_plug"), speed: 2.2, type: "Standard Plug" },
    { name: t("terra_ac_7"), speed: 7.4, type: "AC Fast" },
    { name: t("terra_ac_11"), speed: 11.0, type: "AC Fast" },
    { name: t("terra_ac_22"), speed: 22.0, type: "AC Fast" },
  ];

  const calculateHours = (speed: number) => {
    // In reality, charging slows down after 80%, but for estimator we do a simplified linear calculation
    // with 10% efficiency loss for AC, 5% for DC
    const efficiency = speed > 22 ? 0.95 : 0.9;
    const hours = energyNeeded / (speed * efficiency);
    return hours;
  };

  const formatTime = (totalHours: number) => {
    const hrs = Math.floor(totalHours);
    const mins = Math.round((totalHours - hrs) * 60);

    if (hrs === 0) {
      return `${mins} ${t("minutes")}`;
    }
    return `${hrs} ${t("hours")} ${mins} ${t("minutes")}`;
  };

  // Savings math:
  // Petrol car: 1,500 km @ 10 km/liter = 150 liters fuel. 150 liters * Rp14,500/liter = Rp2,175,000/month
  // EV car: 1,500 km @ 6.5 km/kWh = 230 kWh. 230 kWh * Rp2,467/kWh (PLN dynamic rate) = Rp567,410/month
  // Net savings: ~Rp1,600,000/month
  const petrolCost = 2175000;
  const evCost = Math.round((1500 / 6.5) * 2467);
  const netSavings = petrolCost - evCost;

  const handleWhatsAppConsult = (chargerName: string) => {
    if (typeof window === "undefined") return;

    const baseMsg = `${wt("hello")} \n\n*${wt("interest")}*: ${chargerName}`;

    const trackingMsg = `${baseMsg}\n*${wt("promo_code")}*: ${promoCode}`;

    const encoded = encodeURIComponent(trackingMsg);
    window.open(`https://wa.me/6281382124551?text=${encoded}`, "_blank");
  };

  return (
    <div className="bg-card/50 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-border/60 shadow-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Side: Inputs */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground/80">
              {t("select_ev")}
            </label>
            <select
              value={selectedPreset}
              onChange={handlePresetChange}
              className="bg-secondary/70 border border-border/80 text-foreground text-sm rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {EV_PRESETS.map((ev) => (
                <option key={ev.name} value={ev.name}>
                  {ev.name} ({ev.batteryKwh} kWh)
                </option>
              ))}
              <option value="custom">-- Custom Battery Capacity --</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-semibold text-foreground/80">
              <span>{t("custom_battery")}</span>
              <span className="text-primary font-bold">
                {batterySize.toFixed(1)} kWh
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="0.5"
              value={batterySize}
              onChange={(e) => {
                setSelectedPreset("custom");
                setBatterySize(parseFloat(e.target.value));
              }}
              className="w-full accent-primary bg-secondary/80 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-semibold text-foreground/80">
              <span>
                {t("target_charge")} ({t("from_text")} {targetPercent}%)
              </span>
              <span className="text-primary font-bold">{targetPercent}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={targetPercent}
              onChange={(e) => setTargetPercent(parseInt(e.target.value))}
              className="w-full accent-primary bg-secondary/80 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Savings Highlight */}
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-5 mt-2 flex flex-col gap-1.5 transition-colors">
            <h4 className="text-primary font-bold text-sm uppercase tracking-wider">
              {t("savings_title")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("savings_desc")}
            </p>
            <span className="text-lg md:text-xl font-black text-foreground mt-1">
              Rp {netSavings.toLocaleString("id-ID")} /{" "}
              {t("hours").replace("jam", "bulan").replace("hours", "month")}!
            </span>
          </div>
        </div>

        {/* Right Side: Charging speeds list */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
            {t("time_to_charge")}
          </h4>

          <div className="flex flex-col gap-3">
            {chargers.map((c, idx) => {
              const time = calculateHours(c.speed);
              const isFast = c.speed > 2.2;

              return (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                    isFast
                      ? "bg-secondary/40 border-primary/10 hover:border-primary/30"
                      : "bg-secondary/10 border-border/40 opacity-75"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">
                      {c.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isFast
                        ? `⚡ AC/DC Fast - Output ${c.speed} kW`
                        : `🔌 Standard Socket - Output ${c.speed} kW`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                    <span className="text-sm font-extrabold text-primary">
                      {formatTime(time)}
                    </span>
                    {isFast && (
                      <Button
                        size="sm"
                        onClick={() => handleWhatsAppConsult(c.name)}
                        className="rounded-full text-xs font-semibold px-4 hover:scale-105 transition-transform duration-200"
                      >
                        {wt("cta_floating")
                          .replace("WhatsApp Chat", "Consult")
                          .replace("Konsultasi WhatsApp", "Pilih")}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
