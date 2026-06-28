import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Promo1 from "@/public/promo1.png";
import { ABBCursor } from "@/components/ABBCursor";
import HeroCarousel from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <div>
      <section className="h-screen">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="text-4xl font-semibold mx-4">
            <ABBCursor />
            <h1 className="text-lg">{t("title")}</h1>
            <p>{t("tag1")}</p>
          </div>
          <Image src={Promo1} alt="Product promo image" height={500} />
          <p>{t("tag2")}</p>
          <Button className="my-4">{t("cta1")}</Button>
        </div>
      </section>
      <section>
        <div className="text-4xl font-semibold m-4">
          <ABBCursor />
          <h2>{t("headline1")}</h2>
        </div>
        <HeroCarousel />
      </section>
      <section className="py-40">
        <div className="text-4xl font-semibold m-4">
          <ABBCursor />
          <h2>{t("headline2")}</h2>
        </div>
      </section>
    </div>
  );
}
