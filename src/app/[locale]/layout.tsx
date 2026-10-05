import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Readex_Pro } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PostHogProvider } from "@/components/PostHogProvider";
import "../globals.css";

// English body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// English headings: warm grotesque with a handmade feel
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// Arabic (headings and body); includes Latin so mixed text stays consistent
const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-readex",
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
      "Chat, plan events, manage tasks, and save memories — all in one app.",
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
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${bricolage.variable} ${readex.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);}}catch(e){}`,
          }}
        />
      </head>
      <body
        className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <PostHogProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <main className="flex-1 flex flex-col w-full relative overflow-x-hidden">{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
