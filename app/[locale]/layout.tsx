import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/AppHeader";
import AppThemeProvider from "@/components/AntdProvider";
import { Layout } from "antd";
import { getTranslations } from "next-intl/server";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html
      lang={locale}
      className={`${roboto.variable} ${robotoMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <AntdRegistry>
          <AppThemeProvider>
            <NextIntlClientProvider>
              <Layout>
                <Header />
                {children}
              </Layout>
            </NextIntlClientProvider>
          </AppThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://terra.elmecon-mk.store/${locale}`,
      languages: {
        en: "https://terra.elmecon-mk.store/en",
        id: "https://terra.elmecon-mk.store/id",
      },
    },
  };
}
