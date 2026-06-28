import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/AppHeader";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";

const roboto = Roboto({
  variable: "--font-roboto",
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
      className={`${roboto.className} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
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
