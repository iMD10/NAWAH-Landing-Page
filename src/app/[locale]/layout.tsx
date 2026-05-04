import type { Metadata } from "next";
import { Inter, Open_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

export const viewport = {
  themeColor: "#2789D3",
};

export const metadata: Metadata = {
  title: "Nawah | Your Family, Organized in One Place",
  description:
    "Chat, plan events, manage tasks, and save memories — all in one app. Nawah is the all-in-one family platform.",
  metadataBase: new URL("https://nawahfamily.com"),
  openGraph: {
    title: "Nawah — All-In-One Family Platform",
    description:
      "Chat, plan events, manage tasks, and save memories — all in one app.",
    url: "https://nawahfamily.com",
    siteName: "Nawah",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nawah — Your Family, Organized in One Place",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawah — All-In-One Family Platform",
    description:
      "Chat, plan founders, manage tasks, and save memories — all in one app.",
    images: ["/og-image.png"],
    creator: "@nawahapp",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${openSans.variable} ${ibmPlexSansArabic.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
