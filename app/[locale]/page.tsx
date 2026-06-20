import { Button, Flex, Layout } from "antd";
import { getTranslations } from "next-intl/server";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Image from "next/image";
import Promo1 from "@/public/promo1.png";
import { ABBCursor } from "@/components/ABBCursor";
import HeroCarousel from "@/components/HeroCarousel";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <Layout>
      <Content
        style={{
          background: "var(--ant-color-bg-base)",
        }}
      >
        <section className="h-screen">
          <Flex
            vertical
            align="center"
            justify="center"
            style={{ height: "100%" }}
          >
            <div className="text-3xl">
              <ABBCursor />
              <Title style={{ fontSize: "1rem", margin: 0 }}>
                {t("title")}
              </Title>
              <Paragraph
                style={{ fontSize: "2rem", fontWeight: 600, margin: 0 }}
              >
                {t("tag1")}
              </Paragraph>
            </div>
            <Image src={Promo1} alt="Product promo image" height={500} />
            <Paragraph style={{ fontWeight: 600, marginBottom: 14 }}>
              {t("tag2")}
            </Paragraph>
            <Button type="primary" style={{ color: "AccentColorText" }}>
              {t("cta1")}
            </Button>
          </Flex>
        </section>
        <section>
          <div className="text-3xl mx-4">
            <ABBCursor />
            <Title style={{ fontSize: "2rem", fontWeight: 600 }}>
              Why choose us.
            </Title>
          </div>
          <HeroCarousel />
        </section>
      </Content>
    </Layout>
  );
}
