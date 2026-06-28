import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/AppHeader";
import { getTranslations, getMessages } from "next-intl/server";
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
  const messages = await getMessages();

  // Schema data for SEO Rich Snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ABB Terra EV Charger Series",
    image: [
      "https://terra.elmecon-mk.store/promo1.png",
      "https://terra.elmecon-mk.store/promo2.png",
    ],
    description:
      locale === "id"
        ? "Distributor resmi charger kendaraan listrik ABB di Indonesia. Dipercaya dengan lebih dari 7.000 instalasi di seluruh Indonesia, instalasi gratis, garansi 2 tahun."
        : "Official ABB EV charger distributor in Indonesia. Trusted with 7,000+ installations nationwide, free installation, 2-year warranty.",
    brand: {
      "@type": "Brand",
      name: "ABB",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: "10000000",
      offerCount: "2",
    },
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PT Elmecon Multikencana - Official ABB Distributor",
    image: "https://terra.elmecon-mk.store/promo1.png",
    url: "https://terra.elmecon-mk.store",
    telephone: "+6281382124551",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
  };

  return (
    <html
      lang={locale}
      className={`${roboto.className} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
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
