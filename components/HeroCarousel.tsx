"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Promo2 from "@/public/promo2.png";
import Promo3 from "@/public/promo3.png";
import Promo4 from "@/public/promo4.png";
import Promo5 from "@/public/promo5.png";
import "swiper/css";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

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

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1.4}
        spaceBetween={32}
        breakpoints={{
          1024: {
            slidesPerView: 1.6,
          },
        }}
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        {contents.map((c, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-80 overflow-hidden rounded-3xl">
              <Image
                src={c.image}
                alt="ABB Chargers"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 text-center text-white">
                  <h3 className="text-3xl font-semibold">{t(c.title)}</h3>
                  <p className="mt-2">{t(c.desc)}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-6 flex justify-end gap-2 px-4">
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => swiperRef.current?.slidePrev()}
          style={{
            background: "var(--ant-color-fill-content)",
            border: "none",
          }}
        />

        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => swiperRef.current?.slideNext()}
          style={{
            background: "var(--ant-color-fill-content)",
            border: "none",
          }}
        />
      </div>
    </>
  );
}
