"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Promo2 from "@/public/promo2.png";
import Promo3 from "@/public/promo3.png";
import Promo4 from "@/public/promo4.png";
import Promo5 from "@/public/promo5.png";
import "swiper/css";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronLeft, ChevronRight } from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";

const contents = [
  {
    title: "title1",
    desc: "desc1",
    image: Promo2,
  },
  {
    title: "title2",
    desc: "desc2",
    image: Promo3,
  },
  {
    title: "title3",
    desc: "desc3",
    image: Promo4,
  },
  {
    title: "title4",
    desc: "desc4",
    image: Promo5,
  },
];

export default function HeroCarousel() {
  const t = useTranslations("HeroCarousel");
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="w-full">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        slidesPerView={1.2}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 1.3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 1.6,
            spaceBetween: 32,
          },
        }}
        style={{ paddingLeft: 16, paddingRight: 16 }}
        className="w-full"
      >
        {contents.map((c, i) => (
          <SwiperSlide key={i} className="py-4">
            <div className="relative h-[24rem] overflow-hidden rounded-[2rem] border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Image
                src={c.image}
                alt="ABB Chargers"
                fill
                priority={i === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Softer overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              {/* Text aligned beautifully at the bottom with a slight card offset */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="max-w-2xl bg-white/10 dark:bg-black/25 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-md">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {t(c.title)}
                  </h3>
                  <p className="mt-2 text-white/90 text-sm md:text-base leading-relaxed">
                    {t(c.desc)}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation Buttons - Soft UI & Fully Rounded */}
      <div className="mt-4 flex justify-end gap-3 px-6">
        <Button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
          size="icon"
          className="bg-secondary hover:bg-secondary/80 text-foreground disabled:opacity-40 h-11 w-11 rounded-full shadow-sm border border-border/40 transition-all active:scale-95"
        >
          <HugeiconsIcon icon={ChevronLeft} className="h-5 w-5" />
        </Button>

        <Button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
          size="icon"
          className="bg-secondary hover:bg-secondary/80 text-foreground disabled:opacity-40 h-11 w-11 rounded-full shadow-sm border border-border/40 transition-all active:scale-95"
        >
          <HugeiconsIcon icon={ChevronRight} className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
